# skills

A curated collection of Claude Code skills — reusable agent behaviors that encode proven workflows, methodologies, and automation patterns.

## What are skills?

Skills are instruction sets that teach Claude how to perform a complex, repeatable task with consistency. Each skill lives in its own directory with a `SKILL.md` file plus any supporting reference documents or asset templates. Install a skill once; Claude applies the methodology automatically whenever the trigger conditions are met.

## Available skills

| Skill | Description |
|---|---|
| [resume-tailor](./resume-tailor/) | Tailor your resume to a specific job description, producing a polished 2-page PDF + DOCX optimized for both ATS parsing and human reviewers. Includes an honest fit assessment framework, ATS strategy, bullet methodology, and a Node.js resume builder template. |

## Installation

### Install a single skill

1. Copy the skill directory to your local Claude skills folder:
   ```bash
   cp -r resume-tailor ~/.claude/skills/
   ```

2. Fill in your personal context file (each skill has a template in `references/`):
   ```bash
   cp ~/.claude/skills/resume-tailor/references/candidate-context-template.md \
      ~/.claude/skills/resume-tailor/references/candidate-context.md
   # Edit candidate-context.md with your actual experience — do not commit this file
   ```

3. Restart Claude Code or reload skills. The skill activates automatically when its trigger conditions are met.

### Install all skills

```bash
cp -r . ~/.claude/skills/
```

Then fill in the personal context files for any skills you plan to use.

## Security

- **No personal data in this repo.** Skills are generic methodology templates. Personal information (your resume content, contact details, work history) belongs in local-only context files that are excluded by `.gitignore`.
- **Review before installing.** Skills run shell commands inside your agent session (e.g., `node`, `npm`, `pdftotext`). Review a skill's `assets/build_helpers.md` to understand what commands it executes before installing.
- **Context files stay local.** Files named `candidate-context.md`, `baseline_resume.js` (your filled-in version), and `*.pdf`/`*.docx` outputs are gitignored and should never be committed.

## Contributing

See [CLAUDE.md](./CLAUDE.md) for development conventions, the security checklist, and the documentation policy that applies to every commit.
