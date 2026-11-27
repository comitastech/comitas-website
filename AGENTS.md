# Contributing guidelines (humans and AI agents)

## Language
- Commit messages, branch names, PR titles and PR descriptions: **English**.
- Code (identifiers, comments): **English**.
- User-facing site content (copy, UI text): **Brazilian Portuguese (pt-BR)**.
- Business docs in `docs/` (e.g. `docs/copy.md`) may stay in pt-BR.

## Commits
- Follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`.
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`.
- Summary in imperative mood, lowercase, no trailing period, max ~72 chars.
  - Good: `feat(hero): add whatsapp call to action`
  - Bad: `Added the WhatsApp button.`

## Branches
- `type/short-description` in kebab-case, e.g. `feat/hero-section`, `fix/footer-links`.

## Pull requests
- `main` is protected: every change goes through a PR with one approval.
- Code owners (see `.github/CODEOWNERS`) are requested for review automatically.
- One topic per PR. Describe what changed and how to check it.

## Secrets
- Never commit keys, tokens or passwords. This repository is public.
