# GitHub Pages deployment

Public repository: https://github.com/maninka123/my-phd-from-sensing-to-safety

Website: https://maninka123.github.io/my-phd-from-sensing-to-safety/

## Build and validate

From the repository root, with Node 20 or newer:

```powershell
npm run build
npm run check
```

No dependencies need installing. The build produces `dist/` using relative paths,
including `.nojekyll`. The site works under the repository's GitHub Pages subpath.

## Publish

Repository Settings → Pages uses **GitHub Actions**. The workflow
`.github/workflows/pages.yml` runs on pushes to `main` and manual dispatch.
It builds, validates, uploads only `dist/`, and deploys to the `github-pages`
environment. Check both jobs under Actions before treating an update as live.

The source repository contains curated project source, public-safe figures and
provenance metadata. The deployed site contains the app, displayed assets,
curated public source register and research map. Original manuscripts, private
screenshots, raw README snapshots and review intermediates are excluded.

## Local working copy

I use one local working folder: `Github repo summary/Research_Story_Hub`.
It is the Git checkout connected to this repository, so I edit, preview, commit
and push from that same folder. No separate publishing copy is needed.

My local research and review material stays alongside the app but is excluded
from Git by `.gitignore`: generated `dist/`, verification outputs, raw repository
snapshots and source-inspection helpers. I inspect `git diff` and `git status`
before committing and pushing reviewed changes.

## Update records

Review evidence boundaries, publication versions and asset licences when
changing the hub. Public visibility does not imply permission to reuse code.
Anonymous 404 responses do not establish that a repository is private.

All original thesis folders remain read-only; all local project work stays
inside `Github repo summary`.