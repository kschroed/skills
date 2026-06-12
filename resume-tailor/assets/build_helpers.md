# Build Pipeline

Session setup (Node.js check, npm install, system tool detection) is handled automatically by the Session setup block in `SKILL.md`. This file covers the build commands Claude runs after setup is complete.

## Build → preview cycle

Working directory: `/home/claude/resume/` (created during session setup).

```bash
cd /home/claude/resume

# 1. Build the DOCX
node build_resume.js

# 2. Convert to PDF (skip if soffice unavailable — DOCX-only mode)
soffice --headless --convert-to pdf <Candidate>-Resume-<Company>-<Role>.docx

# 3. Render preview images (skip if pdftoppm unavailable)
rm -f preview-*.jpg
pdftoppm -jpeg -r 110 <Candidate>-Resume-<Company>-<Role>.pdf preview
```

View each preview JPG to confirm the layout fits on 2 pages. If 3 pages appear, trim.

## Trimming priorities when overflowing 2 pages

1. **Oldest role bullets first.** Roles 15+ years old earn the least space.
2. **Combine adjacent bullets** if closely related.
3. **Cert layout** — try inline list instead of table to save vertical space.
4. **Bullet line trims** — remove parenthetical asides.
5. **Last resort**: drop one of the weakest certifications.

Never trim the active-role bullets (current role, most recent key role) — those carry the JD signal.

## ATS verification

```bash
pdftotext <Candidate>-Resume-<Company>-<Role>.pdf - | grep -A 2 -E "<keyword-1>|<keyword-2>"
```

Skip if pdftotext is unavailable. If key bullets show garbled text or wrong order, the layout has a parsing problem.

## Delivery

```bash
cp /home/claude/resume/<Candidate>-Resume-<Company>-<Role>.docx /mnt/user-data/outputs/
cp /home/claude/resume/<Candidate>-Resume-<Company>-<Role>.pdf /mnt/user-data/outputs/
```

Present with `present_files` — PDF first when available, DOCX second.
