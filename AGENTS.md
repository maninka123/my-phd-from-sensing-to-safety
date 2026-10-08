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
- Typography: use `src/styles/typography.css` for the shared scale. Body copy is
  1.25rem on desktop and 1.125rem on mobile; captions, controls and labels must be
  at least 1.125rem. Keep diagram labels in HTML so image scaling cannot shrink them.
  Preserve browser text-size settings and allow layouts to grow and wrap.
- Tool catalogue and detail panels use the larger tool scale in that stylesheet:
  20px desktop body copy, 18px mobile body copy, and at least 18px labels,
  metadata, filter controls and links. Card headings are 24px desktop / 22px mobile.
- Do not publish or change any remote repository unless the user explicitly requests it.
- Maintain the header's `Last updated` date in `index.html` when changing site
  content or presentation. Use the actual update date, not a visitor's current
  date or a routine rebuild date; keep the ISO `datetime` and visible date aligned.
- Publication popup records live in `source-records/publication-summary.json`.
  Generate `src/scripts/publications.js` through the build. Count papers and
  patent applications separately; preserve metric year, category and source links.
  Do not invent submission journals, patent titles or grant status.
