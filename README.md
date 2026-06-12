# skills

A curated collection of Claude Code skills — reusable agent behaviors that encode proven workflows, methodologies, and automation patterns.

## What are skills?

Skills are instruction sets that teach Claude how to perform a complex, repeatable task with consistency. Each skill lives in its own directory with a `SKILL.md` file plus supporting reference documents and asset templates. Install a skill once; Claude applies the methodology automatically when the trigger conditions are met.

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

1. Copy the skill to your Claude skills folder:
   ```bash
   cp -r resume-tailor ~/.claude/skills/
   ```

2. Fill in your personal context file (stays local — never committed):
   ```bash
   cp ~/.claude/skills/resume-tailor/references/candidate-context-template.md \
      ~/.claude/skills/resume-tailor/references/candidate-context.md
   # Edit candidate-context.md with your actual work history and defensible claims
   ```

3. Copy the resume builder template and fill it in with your content:
   ```bash
   cp ~/.claude/skills/resume-tailor/assets/baseline_resume_template.js \
      ~/.claude/skills/resume-tailor/assets/baseline_resume.js
   # Edit baseline_resume.js with your actual resume content
   ```
   > Both `candidate-context.md` and `baseline_resume.js` are gitignored — they won't be committed if you fork this repo.

4. Ensure build dependencies are available (one-time):
   ```bash
   npm install -g docx
   # LibreOffice (soffice) and poppler (pdftotext, pdftoppm) are also required for PDF steps
   ```

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

`node`, `npm install -g docx`, `soffice --headless --convert-to pdf`, `pdftoppm`, `pdftotext` — all local, no network after the one-time npm install. See `assets/build_helpers.md` for details.

---

## Installation

### Install all skills

```bash
cp -r . ~/.claude/skills/
```

Then follow each skill's **Setup** section above.

## Security

- **No personal data in this repo.** Skills are generic templates. Your resume content, work history, and contact details belong in local-only files excluded by `.gitignore`.
- **Review before installing.** Skills run shell commands inside your agent session. Review a skill's `assets/build_helpers.md` to understand what commands it executes.
- **Context files stay local.** `candidate-context.md`, `baseline_resume.js` (your filled-in version), and all `*.pdf`/`*.docx` outputs are gitignored.

## Contributing

See [CLAUDE.md](./CLAUDE.md) for development conventions, the security checklist, and exactly what README content is required when adding a new skill.
