from google.adk import Agent
from backend.app.schemas import (
    CandidateProfile,
    JobRequirements,
    AnalysisReport,
    OptimizationOutput
)

# ---------------------------------------------------------
# Resume Agent
# ---------------------------------------------------------
resume_agent = Agent(
    name="resume_agent",
    model="gemini-2.5-flash",
    description="Structural Extractor (ATS Parser) that maps resume content to CandidateProfile.",
    instruction=(
        "You are a highly accurate parsing engine. Read the incoming text or layout structure from "
        "the candidate's resume. Isolate and map out their engineering/professional skills, timeline history, "
        "and academic criteria. Do NOT assume, extrapolate, or fabricate details. If data is omitted, "
        "leave the field null."
    ),
    output_schema=CandidateProfile
)

# ---------------------------------------------------------
# JD Agent
# ---------------------------------------------------------
jd_agent = Agent(
    name="jd_agent",
    model="gemini-2.5-flash",
    description="Job Description Requirement Assessor that extracts key requirements from JDs.",
    instruction=(
        "Parse the provided corporate job description. Extract core mandatory proficiencies, preferred "
        "target experiences, soft requirements, and implied seniority brackets."
    ),
    output_schema=JobRequirements
)

# ---------------------------------------------------------
# Qualification Agent
# ---------------------------------------------------------
qualification_agent = Agent(
    name="qualification_agent",
    model="gemini-2.5-pro",
    description="Comparative Reasoning Engine that matches candidate profiles against job requirements.",
    instruction=(
        "Execute a deliberate comparative analysis across the structural candidate JSON profile and target JD criteria. "
        "Reason step-by-step using a sequential thinking paradigm. Generate an accurate match score (0-100) and "
        "pinpoint precise, non-subjective skill gaps."
    ),
    output_schema=AnalysisReport
)

# ---------------------------------------------------------
# Optimizer Agent
# ---------------------------------------------------------
optimizer_agent = Agent(
    name="optimizer_agent",
    model="gemini-2.5-flash",
    description="Optimizer Agent that generates a tailored resume and cover letter in Markdown.",
    instruction=(
        "You are a professional resume and cover letter optimizer. Analyze the candidate's profile "
        "against the job description and identified qualification gaps. Generate a tailored resume in "
        "Markdown format (`tailored_resume_markdown`) and a tailored cover letter in Markdown format "
        "(`cover_letter_markdown`) designed for this job. Do NOT fabricate any professional experiences or "
        "credentials. Focus on restructuring and emphasizing existing skills and achievements that map "
        "well to the role. List the skills added and experience improvements made."
    ),
    output_schema=OptimizationOutput
)

__all__ = [
    "resume_agent",
    "jd_agent",
    "qualification_agent",
    "optimizer_agent"
]
