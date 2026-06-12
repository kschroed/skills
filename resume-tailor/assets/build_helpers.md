# Build Pipeline

## Setup

The `docx` npm package is needed. Check first:

```bash
npm list -g docx 2>/dev/null
```

If missing, install:
```bash
npm install -g docx
```

## Standard build → preview cycle

Working directory: `/home/claude/resume/` (create if needed). **Never edit `assets/baseline_resume.js` in place** — always copy to a working location first.

```bash
# 1. Copy the template to a working file and fill in your content
mkdir -p /home/claude/resume
cp /mnt/skills/<skill-path>/resume-tailor/assets/baseline_resume_template.js /home/claude/resume/build_resume.js
# Now edit build_resume.js with the candidate's actual content

# 2. Build the DOCX
cd /home/claude/resume
NODE_PATH=$(npm root -g) node build_resume.js

# 3. Convert to PDF (requires LibreOffice)
soffice --headless --convert-to pdf <Candidate>-Resume-<Company>-<Role>.docx

# 4. Render preview images for visual review
rm -f preview-*.jpg
pdftoppm -jpeg -r 110 <Candidate>-Resume-<Company>-<Role>.pdf preview
ls preview-*.jpg
```

View each preview JPG to confirm the layout fits on 2 pages. If 3 pages appear, trim.

## Trimming priorities when overflowing 2 pages

1. **Oldest role bullets first.** Roles 15+ years old earn the least space.
2. **Combine adjacent bullets** if related.
3. **Cert layout** — try inline list instead of table to save vertical space.
4. **Bullet line trims** — remove parenthetical asides.
5. **Last resort**: drop one of the weakest certifications.

Never trim by reducing the active-role bullets (current role, recent key role) — those carry the JD signal.

## Validation

```bash
# Verify PDF text extracts cleanly — run against key JD keywords
pdftotext <Candidate>-Resume-<Company>-<Role>.pdf - | grep -A 2 -E "<keyword-1>|<keyword-2>"
```

If key bullets show garbled text or wrong order, the layout has a parsing problem.

## Final delivery

```bash
cp /home/claude/resume/<Candidate>-Resume-<Company>-<Role>.docx /mnt/user-data/outputs/
cp /home/claude/resume/<Candidate>-Resume-<Company>-<Role>.pdf /mnt/user-data/outputs/
```

Present with `present_files` — PDF first (default submission preference), DOCX second.

## Commands used by this skill

| Command | Purpose | Network access |
|---|---|---|
| `node build_resume.js` | Builds DOCX from the JS builder | None — local only |
| `npm install -g docx` | Installs docx npm package | npm registry only |
| `soffice --headless --convert-to pdf` | Converts DOCX to PDF via LibreOffice | None |
| `pdftoppm` | Renders PDF pages as JPG for preview | None |
| `pdftotext` | Extracts text from PDF for ATS verification | None |
