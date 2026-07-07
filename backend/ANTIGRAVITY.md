# Antigravity Workflow & Engineering Standards

## 1. Architectural Style
- **Frameworks**: Python FastAPI (Backend), Next.js (Frontend).
- **Agent Layer**: Google ADK (Agent Development Kit).
- **Communication Protocol**: Model Context Protocol (MCP) for tool binding.
- **Asynchrony**: Use native `async` and `await` for all FastAPI routers, external API connections, and Google ADK agent calls.

## 2. Coding Patterns
- **No Boilerplate**: Rely heavily on inline comments explaining the *why*, not the *how*.
- **Validation**: Enforce typing strictly via Pydantic v2 schemas for all inputs, outputs, and cross-agent communication.
- **Dependency Management**: Standardize on a lean `requirements.txt` environment.

## 3. Error Handling
- Fail fast. Use explicit try-except blocks wrapping model calls.
- Catch execution errors inside agent steps and bubble them back to the orchestrator cleanly.
- Never crash the server runtime over data parsing or model timeout exceptions; yield clean HTTP 400 or 500 error payloads.