# Source and attribution records

`public-source-register.json` is the curated, deployable record of content
sources, repository URLs/access/licences, and eighteen displayed asset files.

`portfolio-scope.json` records the 13 repositories selected from the revised
author portfolio on 8 October 2026. It is the source of truth for build and
validation scope. Source documents retain their broader research context.

The local working folder also contains:

- `repository-verification.json`: dated anonymous GitHub API evidence for the 13 included repositories.
- `repository-documentation.md`: paraphrased public documentation and connection findings.
- `repositories/`: local README snapshots for inspection, **not redistributed in the build**.
- `asset-register.json`: all inspected public and review-only assets, with captions,
  figure locations, attribution, changes and reuse decisions.

Original publications, manuscripts, plans and app manuals remain outside this
project and unchanged. Public-facing records use source titles/relative locations,
not personal absolute filesystem paths.

The research source set is the September 2026 plan and skeleton, current local
papers, Year 3 presentation and Central Monitoring guide v3. Public repository
documentation and external publication records were checked on 8 October 2026.

The four public evidence images are complete cropped figure areas from the
CC BY Sensors article (Figures 1, 8, 9 and 10). Every caption credits the authors
and links to the DOI and CC BY 4.0 terms. Original schematics are illustrative.
The fifth evidence image is a real Rotating Target Calibration Studio screenshot,
used under the repository's verified MIT licence with the complete notice retained.
Its noise-free simulation does not establish physical timing accuracy.

Seven additional images are complete, unchanged embedded figures from the
author-supplied hardware, array and safety manuscripts. The PhD author requested
their use in this hub on 8 October 2026. This scoped authorization is recorded as
`author-authorized-for-this-hub`; it does not claim an open-content licence.
Captions identify local manuscript versions, figure numbers and simulation or
method-diagram status. SHA-256 records verify that scientific image bytes remain
unchanged. The safety diagram comes from the local manuscript, not a verified
copy of the final journal layout. Partner photographs and mine scans remain excluded.

The featured story figure metadata is generated from `asset-register.json` into
`src/scripts/paper-figures.js` by the build. Section 5 includes local array Figures
18 (fusion comparison), 15 (pose graph), 17 (single-unit simulated cloud) and
8 (monitoring interface with a synthetic scene). Hardware Figures 1 and 2 support
the context and integration stages; local safety Figure 7 supports interpretation.
Published Sensors Figure 8 is also shown directly in the spatial-calibration tab.

Private source summaries support tool descriptions without establishing current
code features, licences or implemented connectors. Publication statuses and exact
versions must not be inferred from filenames. See `docs/research-map.md` for
the study settings and research relationships.

`publication-summary.json` records the global publication popup: three published
journal articles, four under-review manuscripts, two conference papers and two
separately counted patent applications. Under-review display statuses follow
the author’s 9 October 2026 instruction. Publisher Impact Factors and completed
2025 Scopus CiteScore/category-percentile records were inspected on that date.
Category percentiles are retained so the displayed highest category is auditable.
The Australian provisional filing title/date come from IP Australia; the second
patent number comes from the supplied plan and awaits full author details.
