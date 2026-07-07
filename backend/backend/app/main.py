import io
import json
import os
import zipfile
from dotenv import load_dotenv
load_dotenv(override=True)

if not os.getenv("GEMINI_API_KEY"):
    print("\n" + "="*80)
    print("WARNING: GEMINI_API_KEY is not set!")
    print("Please set it in your environment or add it to a .env file in the project root.")
    print("="*80 + "\n")


from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from google.adk import Workflow, Runner
from google.adk.sessions import InMemorySessionService
from google.adk.workflow import JoinNode, START
from google.genai import types

from backend.app.agents.pipeline_agents import (
    resume_agent,
    jd_agent,
    qualification_agent,
    optimizer_agent
)
from backend.app.schemas import OptimizationOutput

app = FastAPI(title="CareerPilot AI - Process API")

# Configure CORS Middleware to allow requests from the frontend origin
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize in-memory session service (volatile storage, no filesystem footprint)
session_service = InMemorySessionService()

# Build the execution graph:
# - resume_agent and jd_agent run from START in parallel.
# - Pipe their schemas into qualification_agent (via qualification_join).
# - qualification_agent sequentially feeds optimizer_agent (via optimizer_join, fanning in all needed outputs).
qualification_join = JoinNode(name="qualification_join")
optimizer_join = JoinNode(name="optimizer_join")

workflow = Workflow(
    name="careerpilot_workflow",
    description="Graph-based workflow that parses candidate details, runs qualification analysis, and generates optimized documents.",
    edges=[
        (START, resume_agent),
        (START, jd_agent),
        ((resume_agent, jd_agent), qualification_join),
        (qualification_join, qualification_agent),
        ((resume_agent, jd_agent, qualification_agent), optimizer_join),
        (optimizer_join, optimizer_agent)
    ]
)

# Initialize Runner
runner = Runner(
    agent=workflow,
    session_service=session_service,
    app_name="careerpilot_ai"
)

@app.post("/api/v1/process")
async def process_candidate(
    resume_file: UploadFile = File(...),
    jd_file: UploadFile = File(...)
):
    """
    POST endpoint to process a candidate's resume and job description.
    Accepts resume_file and jd_file as uploaded files.
    Reads files asynchronously, runs the ADK workflow in-memory,
    bundles the tailored resume and cover letter markdowns in a ZIP,
    and streams it back.
    """
    # 1. Asynchronously read resume file
    try:
        resume_bytes = await resume_file.read()
        resume_text = resume_bytes.decode("utf-8", errors="ignore")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read resume file: {str(e)}")

    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume content is empty.")

    # 2. Asynchronously read job description file
    try:
        jd_bytes = await jd_file.read()
        jd_text = jd_bytes.decode("utf-8", errors="ignore")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read job description file: {str(e)}")

    if not jd_text.strip():
        raise HTTPException(status_code=400, detail="Job description content is empty.")

    # Create transient, volatile session for zero-retention (Zero-Retention Paradigm)
    session = await session_service.create_session(app_name="careerpilot_ai", user_id="system")

    # Serialize input payload to pass to fanned-out start nodes
    input_payload = {
        "resume": resume_text,
        "jd": jd_text
    }
    input_json = json.dumps(input_payload)
    new_message = types.Content(
        role="user",
        parts=[types.Part(text=input_json)]
    )

    final_output = None
    try:
        # Volatile in-memory execution loop (Zero-Retention)
        async for event in runner.run_async(
            user_id="system",
            session_id=session.id,
            new_message=new_message
        ):
            if event.is_final_response() and hasattr(event, "output") and event.output:
                final_output = event.output
    except Exception as e:
        # Clean catch of execution errors, never crashing the server or logging PII
        raise HTTPException(status_code=500, detail=f"Workflow execution failed: {type(e).__name__}")
    finally:
        # Zero-Retention cleanup: Delete the session from memory immediately
        try:
            await session_service.delete_session(app_name="careerpilot_ai", session_id=session.id)
        except Exception:
            pass

    if not final_output:
        raise HTTPException(status_code=500, detail="Workflow failed to yield an output.")

    # Parse and validate the final OptimizationOutput schema
    try:
        if isinstance(final_output, dict):
            opt_output = OptimizationOutput(**final_output)
        else:
            opt_output = final_output
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse optimization output: {str(e)}")

    # Intercept string fields and bundle into a ZIP archive in-memory
    zip_buffer = io.BytesIO()
    try:
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
            # Bundle tailored resume and cover letter
            zip_file.writestr("tailored_resume.md", opt_output.tailored_resume_markdown)
            zip_file.writestr("cover_letter.md", opt_output.cover_letter_markdown)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to bundle optimized documents: {str(e)}")

    # Seek back to starting point for streaming
    zip_buffer.seek(0)

    # Return immediate StreamingResponse with application/zip media type
    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=tailored_documents.zip"}
    )
