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

Skills are installed in Claude Desktop as `.skill` files (a zip of the skill directory). Build one from this repo, then import it via the Claude Desktop UI.

**Step 1 — Fill in your personal files (recommended before packaging)**

These files stay local and are never committed. Fill them in once, then every tailoring session has access to your baseline.

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

System dependencies (needed at runtime inside Claude Desktop's agent environment):

| Dependency | Min version | Notes |
|---|---|---|
| Node.js | 18.0.0 | |
| docx (npm) | 9.0.0 | Installed locally via `package.json` — no global install needed |
| LibreOffice | any recent | Required for PDF conversion |
| poppler | any recent | Required for preview images and ATS text verification |

The `docx` version is pinned in `resume-tailor/package.json`. When Claude runs `npm install` in the working directory it gets exactly `^9.0.0` — no manual version management needed.

**Step 2 — Package the skill**

```bash
# With your personal files included (for your own installation only — do not share)
./scripts/package.sh resume-tailor --personal

# Without personal files (safe to share publicly)
./scripts/package.sh resume-tailor
```

This produces `resume-tailor.skill` in the repo root.

**Step 3 — Install in Claude Desktop**

Open Claude Desktop → navigate to the Skills section → import `resume-tailor.skill`.

> If you skipped Step 1, the skill will still work — it will ask for your context during the first session instead of reading it from file.

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
