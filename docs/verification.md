# Verification report

Verified 8 October 2026 against the generated static distribution.

## Result

The three main destinations render in Chrome. Desktop, 390 × 844 mobile and
320 × 740 narrow-mobile layouts were exercised. The local HTTP build returns 200
for its entry point, scripts, stylesheet, source register, text map and eight
registered image assets. No browser console errors or warnings were captured.

## User journeys checked

| Journey | Observed result |
|---|---|
| Story → stage anchor | Correct stage reached beneath navigation |
| Reliability tabs | All four panels switch; arrow keys move selection and focus |
| Six research-map stages | Correct heading/output; selected state and relevant lines update |
| Tool search and interface filter | Combined enclosure/browser filters return one matching tool |
| Public/private access filter | Nine publicly accessible records; six summary-recorded private |
| Further applications filter | Three tools, including the explicitly labelled creep prototype |
| Empty search | Clear empty state and reset control |
| Repository details | All 15 catalogue panels were opened during the browser pass; matching exact names and descriptions rendered |
| Escape dismissal | Dialog closes and focus returns to its original tool button |
| Thesis navigation | Seven sections, nine paper entries and 15 software-mapping rows |
| Skip to content | Focus moves to main without changing the selected destination |
| Source page | Attribution, licence notice and provenance links present |
| Mobile width | Story, map, source page and thesis have no page-level horizontal overflow at tested widths; academic tables scroll within their container |

## Repairs during verification

- Reduced the desktop hero heading to keep the opening illustration visible.
- Replaced positional stage placement with named stage selectors after a decorative
  SVG shifted the grid indexing.
- Highlighted adjacent map lines for stage/repository selection.
- Set the academic grid children to allow contained table overflow on mobile.
- Preserved the original dialog trigger when changing related tools, for reliable
  focus restoration.
- Made skip-to-content an in-page focus action rather than a destination change.

## Static validation

`npm run build` and `npm run check` pass. Checks cover all repository/paper IDs,
related endpoints, connection types and evidence bases, referenced static assets,
keyboard-focus/reduced-motion/mobile foundations, and exclusion of private
review material from `dist/`. JavaScript syntax checks passed.

The app uses ordinary deferred local scripts, relative local assets and hash
navigation. It has no runtime fetch, module loader, CDN or server API dependency.

## Verification limits

Automated `file://` opening was rejected by the browser tool’s security policy,
which allows only HTTP/HTTPS. The standalone file-opening workflow is supported
by the app’s static design but was not directly browser-tested. All recorded UI
tests used the generated build through local HTTP.

Browser screenshots can lag a navigation by a frame; final screenshots were
captured after the page painted and independently inspected. A long batch of
detail-panel checks timed out at the browser-tool level after reaching the final
repository; this was not a website error. Subsequent representative state and
interaction checks completed normally.

No screen-reader user test or certification-grade accessibility audit was
performed. Keyboard focus, labels, semantic controls, native modal behaviour,
text alternatives and reduced-motion rules were checked as accessibility basics.

External private source code was unavailable. Publisher filtering and GitHub API
rate limits can affect anonymous verification; unresolved access and publication
version/status distinctions are recorded rather than treated as successful checks.

## Saved evidence

- `verification/desktop-story.jpg`
- `verification/mobile-story.jpg`
- `verification/static-checks.json`
- `verification/http-assets.json`

These are local QA records, excluded from the distributable build. All work was
confined to `Github repo summary/Research_Story_Hub`; original thesis sources
were not edited or moved.
