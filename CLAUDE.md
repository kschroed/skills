# CLAUDE.md — Skills Repo Development Guide

This file governs how work is done in this repository.

## Intent

This repo stores and shares reusable Claude Desktop skills. Skills encode proven workflows as generic, installable instruction sets. The target audience is any Claude Desktop user — skills must be useful to strangers, not just the author.

## Documentation-first policy

**Every commit that changes a skill must include a documentation update.**

- Adding a new skill → `README.md` is required; see [Adding a new skill](#adding-a-new-skill) for the required content
- Changing a skill's behavior, trigger, or workflow → update the relevant `SKILL.md` or reference doc in the same commit, and update `README.md` if the change affects installation, usage, or setup
- Changing project-level conventions → update this file (`CLAUDE.md`)

The pre-commit hook in `.githooks/pre-commit` enforces this. Set it up once:
```bash
git config core.hooksPath .githooks
```

## Security requirements

Before committing any skill, verify:

1. **No personal information.** Names, email addresses, phone numbers, physical addresses, employment history, LinkedIn handles, compensation figures, or any other PII must not appear in committed files. Use generic placeholders (`Candidate Name`, `email@example.com`, `Company Name`).

2. **No credentials or secrets.** API keys, tokens, passwords, and private URLs are never committed — not even in comments or examples.

3. **Commands are documented and justified.** If a skill runs shell commands (e.g., `node`, `npm install`, `pdftotext`, `soffice`), the `assets/build_helpers.md` must list every command, explain what it does, and note any network access.

4. **No exfiltration.** Skills must not send the candidate's data to external services. Output goes to local files only (`/mnt/user-data/outputs/` or similar local paths).

5. **No system-level changes.** Skills must not modify shell profiles, system config, or global npm/pip packages without explicit user instruction.

## Personal context files — never commit these

Each skill has a template context file (e.g., `references/candidate-context-template.md`) that users copy and fill in locally. The filled-in versions are gitignored:

| Gitignored file | What it contains |
|---|---|
| `**/candidate-context.md` | User's actual work history and defensible scope |
| `**/baseline_resume.js` (user's copy) | User's filled-in resume content |
| `**/*.pdf`, `**/*.docx` | Generated resume outputs |

Do not rename these files to something that bypasses `.gitignore`.

## Skill design principles

- **Generic methodology, not person-specific rules.** Anything that varies by user (technical skills, title level, personal preferences) belongs in the local context file, not in `SKILL.md`.
- **Honest framing over inflation.** Skills that help users produce professional documents must include anti-inflation guardrails — every claim should be defensible.
- **Reference files over inline knowledge.** Keep `SKILL.md` as a workflow orchestrator; put methodology depth in `references/` files that can be updated independently.
- **Template assets, not real data.** `assets/` should contain templates with clear placeholders, not filled-in personal content.

## Adding a new skill

1. Create `<skill-name>/SKILL.md` with frontmatter (`name`, `description`, `trigger`).
2. Add supporting references in `<skill-name>/references/`.
3. Add asset templates (if any) in `<skill-name>/assets/`.
4. Ensure any personal-context files are covered by `.gitignore`.
5. **Update `README.md` in the same commit.** The pre-commit hook requires `README.md` to be staged and to contain a `## <skill-name>` section. That section must include all of the following:

   | Required element | What to write |
   |---|---|
   | `## <skill-name>` heading | Matches the directory name exactly (lowercase, hyphenated) |
   | Description paragraph | What the skill does in 2-4 sentences |
   | **Trigger** subsection | The exact conditions or phrases that activate the skill |
   | **Setup** subsection | Step-by-step install instructions for this specific skill |
   | **Usage** subsection | What to say/do to invoke it; what Claude will do in return |
   | **Key files** table | Each file, one line description of its purpose |
   | **Commands this skill runs** | Every shell command the skill executes, with network-access note |

   Also add a row to the catalog table at the top of `README.md`.

6. Run the security checklist above before committing.
7. After committing, build and smoke-test the `.skill` package:
   ```bash
   ./scripts/package.sh <skill-name>
   # Install the generated .skill in Claude Desktop and verify the skill loads correctly
   ```
   The `.skill` file is gitignored — do not commit it.

## Commit style

Commits are short, factual, and past-tense. Lead with the change type:
- `add: resume-tailor skill (initial version)`
- `update: genericize resume-tailor SKILL.md trigger`
- `fix: remove stale Ken-specific references from workflow.md`
- `docs: update README skill catalog`
