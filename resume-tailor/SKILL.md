---
name: resume-tailor
description: Tailor a resume to a specific job description, producing a polished 2-page PDF + DOCX optimized for both ATS parsing and human reviewers. Use this skill whenever the user provides a job description and wants a customized resume — even if they don't explicitly say "use the skill". Also use when the user says "tailor my resume", "another role to review", "let's apply to X", references roles at specific companies, or wants to update/iterate on a previously-tailored version.
---

# Resume Tailor

This skill produces tailored resumes against specific job descriptions. It encodes the workflow, formatting, and ATS strategy for producing clean, honest, professionally formatted resumes.

## Session setup (run automatically on every first use)

Run this block at the start of each session before any other work. Do not ask the user to do any of this manually.

**Step 1 — Locate the skill directory**

```bash
SKILL_DIR=$(find /mnt/skills -name "SKILL.md" -path "*/resume-tailor/*" -exec dirname {} \; 2>/dev/null | head -1)
echo "Skill dir: $SKILL_DIR"
```

**Step 2 — Check Node.js**

```bash
node --version 2>/dev/null || echo "MISSING"
```

If Node.js is not found: stop and tell the user — "This skill requires Node.js (≥18) to build resumes, but it's not available in this environment. Please ensure Node.js is installed and try again." Do not proceed.

**Step 3 — Install the pinned npm dependency**

```bash
mkdir -p /home/claude/resume
cp "$SKILL_DIR/package.json" /home/claude/resume/
cd /home/claude/resume && npm install --silent
```

This installs `docx ^9.0.0` locally. No global installs, no version drift. If `npm install` fails, report the error and stop.

**Step 4 — Check optional system tools and set output mode**

```bash
soffice --version 2>/dev/null && echo "soffice:ok" || echo "soffice:missing"
pdftoppm -v 2>&1 | head -1 && echo "pdftoppm:ok" || echo "pdftoppm:missing"
pdftotext -v 2>&1 | head -1 && echo "pdftotext:ok" || echo "pdftotext:missing"
```

Set the session output mode based on results:

| soffice | pdftoppm | Output mode |
|---|---|---|
| ✓ | ✓ | Full — DOCX + PDF with visual preview and ATS verification |
| ✓ | ✗ | DOCX + PDF, no visual preview; describe layout changes in text |
| ✗ | any | DOCX only — tell the user PDF conversion is unavailable and they can convert the DOCX manually |

**Step 5 — Check for candidate context**

```bash
ls "$SKILL_DIR/references/candidate-context.md" 2>/dev/null && echo "context:ok" || echo "context:missing"
```

If missing: ask the user to describe their work history and the roles they've held before proceeding. Capture this in the session as a substitute for the context file.

**Step 6 — Report and proceed**

Tell the user the output mode in one line (e.g., "Ready — full PDF output available" or "Ready — DOCX only, no LibreOffice in this environment") and ask for the job description.

---

## The non-negotiable first step: honest fit assessment

Before writing a single bullet, assess fit against the JD candidly. Candidates value honest assessment over cheerleading at senior levels. Read the JD carefully and produce a brief mixed-fit verdict covering:

- **Where the candidate aligns well** — years of experience, specific technologies, leadership patterns
- **Where the gap is real** — title mismatches, missing languages, missing specific tech
- **Stretch vs. fit verdict** — give a rough %-shot estimate. "2-3 out of 10" is acceptable language if it's true.

Then ask how the candidate wants to position before drafting. Don't draft until they've decided on title strategy.

## Core workflow

1. **Read the JD** completely. Identify exact phrases the JD repeats. These are the words to weave naturally — not stuff.
2. **Read `references/candidate-context.md`** (or session-captured context) to understand what the candidate can actually defend in interview.
3. **Honest fit assessment** (see above). Get the candidate's positioning decision.
4. **Copy `assets/baseline_resume_template.js`** to `/home/claude/resume/build_resume.js`, fill in the candidate's content, then iterate per `references/workflow.md`.
5. **Build → preview → trim → rebuild** until it fits cleanly on 2 pages.
6. **Generate outputs** per the session output mode established in setup.
7. **Surface ATS considerations** per `references/ats.md`.

## Iteration patterns

- **Ask before assuming.** When uncertain about how deep the candidate's experience goes on a specific tech, ask with concrete options (e.g., "Was your Kubernetes work managing clusters, or writing workloads on top of managed K8s?"). Don't fabricate depth.
- **Defend every claim.** Senior-level roles require that every bullet survive a "tell me more about that" follow-up. If it can't, cut or soften it.
- **Honest framing, not bluffing.** Specific honest framing in an interview ("I worked at the Transit Gateway / Direct Connect layer, not service-provider BGP") builds more trust at senior levels than vague keyword claims.
- **Bullets follow this shape:** `**Bold action lead-in** — context, technical specifics, quantified outcome.` Verbs: *Architected, Built, Led, Drove, Authored, Designed, Cut, Delivered*.
- **Trim by JD relevance.** Older roles (>15 years) get less space. Bullets that don't map to the JD are candidates for removal even if they describe real work.
- **2-page hard target.** Visual balance matters.

## File outputs

Per the output mode set during setup:
- **Full mode:** `<CandidateName>-Resume-<Company>-<Role>.docx` + `.pdf`
- **DOCX-only mode:** `<CandidateName>-Resume-<Company>-<Role>.docx` only; tell the user to convert to PDF themselves

Save to `/mnt/user-data/outputs/` and present via `present_files`. PDF first when available.

## Where things live

- `assets/baseline_resume_template.js` — Node.js resume builder template. Copy to `/home/claude/resume/build_resume.js` and fill in the candidate's content. Never edit the template in place.
- `assets/build_helpers.md` — Build commands, trim priorities, delivery steps
- `package.json` — Pins `docx ^9.0.0`; copied to working dir and installed during session setup
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
