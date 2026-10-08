# Workspace boundary

All project changes and generated files must remain in `Github repo summary`.
All other folders in the parent thesis workspace are read-only sources. Do not
edit, move, rename, remove or regenerate any original manuscript, plan or figure.

# Project conventions

- Buildless static HTML/CSS/JavaScript; the delivered `dist` also works without a server.
- Source content: `src/scripts/data.js`. Access/licence facts: `source-records/repository-verification.json`.
- Preserve evidence boundaries, manuscript version distinctions and Creep Monitoring concept/prototype status.
- Implemented interfaces require documentation; shared methods and future workflows use different labels.
- Public visibility is separate from code licensing.
- Display only public-safe assets. `verification` and raw README snapshots are local review material, excluded by the build.
- Run `npm run build` and `npm run check`; verify changed interactions and mobile layouts in a browser.
- Do not publish or change any remote repository unless the user explicitly requests it.
