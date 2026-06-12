# skills

A curated collection of Claude Desktop skills — reusable agent behaviors that encode proven workflows, methodologies, and automation patterns.

## What are skills?

Skills are instruction sets that teach Claude how to perform a complex, repeatable task with consistency. Each skill lives in its own directory with a `SKILL.md` file plus supporting reference documents and asset templates. Package a skill as a `.skill` file, install it in Claude Desktop, and Claude applies the methodology automatically when the trigger conditions are met.

## Skill catalog

| Skill | Summary |
|---|---|
| [resume-tailor](#resume-tailor) | Tailor your resume to any job description with honest fit assessment, ATS-safe formatting, and a built-in DOCX/PDF builder |

---

## resume-tailor

**Tailors your resume to a specific job description**, producing a polished 2-page PDF + DOCX optimized for both ATS parsing and human reviewers.

### What it does

- Reads the job description and produces an honest fit assessment before writing anything — including a candid %-shot estimate of your candidacy
- Maps JD keywords to your actual experience (no fabrication, no keyword stuffing)
- Applies a proven bullet methodology: bold action lead-in, technical specifics, quantified outcome
- Builds a formatted DOCX using a Node.js + `docx` pipeline, then converts to PDF
- Flags ATS formatting risks and can produce a flat single-column variant for cold applications

### Trigger

This skill activates automatically when you provide a job description and want a customized resume — even if you don't say "use the skill." It also activates when you say things like:
- "Tailor my resume for this role"
- "Another role to review"
- "Let's apply to [Company]"
- Paste or link a job posting

### Setup

**Step 1 — Fill in your personal files (optional but recommended)**

These files stay local and are never committed. Filling them in before packaging means Claude has your context from the first session rather than asking for it.

```bash
# Your defensible work history — what you can back up in an interview
cp resume-tailor/references/candidate-context-template.md \
   resume-tailor/references/candidate-context.md
# Edit candidate-context.md with your actual experience

# Your baseline resume as a Node.js builder
cp resume-tailor/assets/baseline_resume_template.js \
   resume-tailor/assets/baseline_resume.js
# Edit baseline_resume.js with your actual resume content
```

**Step 2 — Package and install**

```bash
# With your personal files (for your own use — do not share this package)
./scripts/package.sh resume-tailor --personal

# Without personal files (safe to share publicly)
./scripts/package.sh resume-tailor
```

Open Claude Desktop → Skills → import the generated `resume-tailor.skill`.

> **Claude handles the rest.** On first use, the skill automatically installs its npm dependency (`docx ^9.0.0`), detects whether LibreOffice and PDF tools are available, and tells you if anything is missing. No manual dependency setup required.

### Usage

Once installed, just paste a job description into Claude and it will:
1. Run the fit assessment and share it with you before writing anything
2. Ask your positioning preference (title strategy, how to handle gaps)
3. Build a tailored resume as both `.docx` and `.pdf`
4. Verify ATS parsing and flag any issues

To iterate: "tighten the summary", "drop the oldest role", "add more cloud emphasis" — Claude applies the change, rebuilds, and re-previews.

### Key files

| File | Purpose |
|---|---|
| `SKILL.md` | Skill definition and workflow orchestration |
| `references/candidate-context-template.md` | Template for your defensible work history (fill in locally) |
| `references/workflow.md` | Phase-by-phase build workflow and bullet patterns |
| `references/jd-mapping.md` | How to extract and place JD signals |
| `references/ats.md` | ATS formatting strategy and verification steps |
| `assets/baseline_resume_template.js` | Node.js DOCX builder template (fill in with your content) |
| `assets/build_helpers.md` | Build commands, trim priorities, and delivery steps |

### Commands this skill runs

`node`, `npm install` (local, pins `docx ^9.0.0`), `soffice --headless --convert-to pdf`, `pdftoppm`, `pdftotext` — all local. The only network call is the one-time `npm install` to the npm registry. LibreOffice and PDF tools are used if available; the skill degrades gracefully to DOCX-only if they're not. See `assets/build_helpers.md` for details.

---

## Installation

Skills are distributed as `.skill` files and installed via the Claude Desktop UI. Each skill's **Setup** section above covers the full install flow for that skill.

To build all skills at once:
```bash
for skill in */SKILL.md; do
  ./scripts/package.sh "$(dirname "$skill")"
done
```

## Security

- **No personal data in this repo.** Skills are generic templates. Your resume content, work history, and contact details belong in local-only files excluded by `.gitignore`.
- **Review before installing.** Skills run shell commands inside your agent session. Review a skill's `assets/build_helpers.md` to understand what commands it executes.
- **Context files stay local.** `candidate-context.md`, `baseline_resume.js` (your filled-in version), and all `*.pdf`/`*.docx` outputs are gitignored.

## Contributing

See [CLAUDE.md](./CLAUDE.md) for development conventions, the security checklist, and exactly what README content is required when adding a new skill.
