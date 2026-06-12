---
name: resume-tailor
description: Tailor a resume to a specific job description, producing a polished 2-page PDF + DOCX optimized for both ATS parsing and human reviewers. Use this skill whenever the user provides a job description and wants a customized resume — even if they don't explicitly say "use the skill". Also use when the user says "tailor my resume", "another role to review", "let's apply to X", references roles at specific companies, or wants to update/iterate on a previously-tailored version.
---

# Resume Tailor

This skill produces tailored resumes against specific job descriptions. It encodes the workflow, formatting, and ATS strategy for producing clean, honest, professionally formatted resumes.

**Before anything else: read `references/candidate-context.md`** to understand the candidate's actual experience and defensible claims. If this file doesn't exist yet, direct the user to copy `references/candidate-context-template.md`, fill it in, and save it locally as `candidate-context.md`.

The baseline resume builder lives at `assets/baseline_resume_template.js` — copy it to a working directory and fill in the candidate's content before building anything.

## The non-negotiable first step: honest fit assessment

Before writing a single bullet, assess fit against the JD candidly. Candidates value honest assessment over cheerleading at senior levels. Read the JD carefully and produce a brief mixed-fit verdict covering:

- **Where the candidate aligns well** — years of experience, specific technologies, leadership patterns
- **Where the gap is real** — title mismatches, missing languages, missing specific tech
- **Stretch vs. fit verdict** — give a rough %-shot estimate. "2-3 out of 10" is acceptable language if it's true.

Then ask how the candidate wants to position before drafting. Don't draft until they've decided on title strategy.

## Core workflow

1. **Read the JD** completely. Identify exact phrases the JD repeats. These are the words to weave naturally — not stuff.
2. **Read `references/candidate-context.md`** to understand what the candidate can actually defend in interview.
3. **Honest fit assessment** (see above). Get the candidate's positioning decision.
4. **Copy `assets/baseline_resume.js`** to a working file, fill in the candidate's content, then iterate per `references/workflow.md`.
5. **Build → preview → trim → rebuild** until it fits cleanly on 2 pages.
6. **Generate both DOCX and PDF**, present both.
7. **Surface ATS considerations** per `references/ats.md`.

## Iteration patterns

- **Ask before assuming.** When uncertain about how deep the candidate's experience goes on a specific tech, ask via `ask_user_input_v0` with concrete options. Don't fabricate depth.
- **Defend every claim.** Senior-level roles require that every bullet survive a "tell me more about that" follow-up. If it can't, cut or soften it.
- **Honest framing, not bluffing.** Specific honest framing in an interview ("I worked at the Transit Gateway / Direct Connect layer, not service-provider BGP") builds more trust at senior levels than vague keyword claims.
- **Bullets follow this shape:** `**Bold action lead-in** — context, technical specifics, quantified outcome.` Verbs: *Architected, Built, Led, Drove, Authored, Designed, Cut, Delivered*.
- **Trim by JD relevance.** Older roles (>15 years) get less space. Bullets that don't map to the JD are candidates for removal even if they describe real work.
- **2-page hard target.** Visual balance matters.

## File outputs

Always produce both formats:
- `<CandidateName>-Resume-<Company>-<Role>.docx`
- `<CandidateName>-Resume-<Company>-<Role>.pdf`

Save to `/mnt/user-data/outputs/` and present via `present_files`. PDF first (default submission preference unless candidate specifies otherwise).

## Where things live

- `assets/baseline_resume_template.js` — Node.js resume builder template. **Copy to a working location, rename, and fill in the candidate's content. Never edit the template in place.**
- `assets/build_helpers.md` — How to run the builder, validate, preview, generate PDF
- `references/workflow.md` — Detailed iteration loop, bullet patterns, gap-handling
- `references/ats.md` — ATS/PDF strategy and formatting tradeoffs
- `references/jd-mapping.md` — How to read a JD and identify what to surface
- `references/candidate-context.md` — *(User-created, local-only)* What the candidate has actually done — consult before claiming anything
- `references/candidate-context-template.md` — Template for the above

## Critical guardrails

- **Never inflate.** Bias toward removing weak claims rather than adding shaky ones. A claim that gets exposed in an interview damages more than it helps.
- **Don't conflate jobs.** Each role has its own scope; do not move bullets between roles unless the candidate explicitly says they belong elsewhere.
- **Don't add depth the candidate doesn't have.** If a JD requires a technology the candidate has only evaluated, frame it honestly: "Evaluation/PoC exposure; would ramp in role."
- **Certifications:** Only list certs the candidate currently holds. Expired or not-yet-obtained certs must be omitted or flagged as in-progress.
- **Patents vs. publications:** Never call a defensive publication a "patent." Use the accurate term.

## When the user says "another role"

Treat as a new tailoring task. Acknowledge the prior baseline, ask for the JD, and run the standard workflow. Do not auto-apply changes from the prior tailoring — each JD gets a fresh read.
