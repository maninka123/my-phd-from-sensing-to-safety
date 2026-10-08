# Below the Surface

A research exhibition connecting Pasindu Ranasinghe’s PhD work on underground
LiDAR–camera sensing, colourised reconstruction and safety interpretation at
UNSW Sydney.

The hub makes the research understandable before presenting the repository
details. **The Story** follows seven illustrated stages. **Explore the Tools**
connects 15 repositories, with search, filters and readable detail panels.
**The Thesis** provides the academic chapter sequence, nine-paper register,
software mappings, distinct contributions and validation limits.

## Preview locally

No dependencies need installing. Open `index.html` in a browser, or use Node 20+
for a local preview:

```powershell
cd my-phd-from-sensing-to-safety
npm run dev
```

Open **http://127.0.0.1:4173**. Stop the preview with Ctrl+C. For another port,
set a task-specific `PORT` environment variable before launching.

```powershell
npm run build
npm run check
node scripts/preview.mjs --dist
```

The build produces a portable `dist/` website using relative paths. It works at
a GitHub Pages repository subpath and does not require a backend, account,
external font, runtime API request, or JavaScript package install.

## Project structure

```text
Research_Story_Hub/
├── index.html                    Entry point and semantic page shell
├── src/
│   ├── styles/main.css           Responsive exhibition and accessibility styles
│   └── scripts/
│       ├── app.js                Routing, story, map, catalogue and dialogs
│       ├── data.js               Editorial repository, paper and connection data
│       └── repository-status.js  Generated access/licence snapshot
├── public/assets/
│   ├── diagrams/                 Original editable SVG schematics
│   └── evidence/                 Four CC BY figures and one MIT app screenshot
├── scripts/                      Build, local preview and source checks
├── tools/assets/                 Read-only source inspection/export helpers
├── source-records/               Provenance, access/licence and asset records
│   └── repositories/             Local README evidence snapshots, not deployed
├── docs/                         Research map and deployment guidance
├── verification/                 Check reports and private review assets
├── .github/workflows/pages.yml   GitHub Pages deployment workflow
└── dist/                         Generated distributable website
```

## How the tools connect

The core progression is requirements → enabling methods → protected unit →
face-wide reconstruction → safety interpretation. Supporting tools can span
several stages.

- **Solid blue:** documented data interface. Sensor output and monitoring input
  use ROSBridge/TCPROS colourised point-cloud streams; receiver code is private.
- **Dashed teal:** shared method or supporting tool. Calibration parameters,
  correction models, timing studies, coverage and reconstruction research.
- **Dotted warm brown:** proposed future connection. Reconstructed scenes into
  the safety framework, recordings into the creep prototype, and surfaces from
  aligned clouds. These are not claimed as implemented repository connectors.

The diagram has keyboard-operated stage buttons and a complete text alternative.
The catalogue exposes exact repository names, purpose, inputs/outputs, research
roles, related tools, interface types, licensing and evidence status.

## Evidence and attribution

Four genuine figures come from Ranasinghe, Patra, Banerjee and Raval (2025),
*LiDAR Point Cloud Colourisation Using Multi-Camera Fusion and Low-Light Image
Enhancement*, Sensors 25, 6582, [DOI](https://doi.org/10.3390/s25216582).
They retain complete panels and captions and are attributed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Their trolley-based
four-camera platform is kept distinct from the enclosed single-camera unit.
An additional genuine rotating-target studio screenshot illustrates noise-free
simulation, used under its MIT licence with the complete notice retained.

The mining context, device architecture and in-page method/relationship graphics
are original editable explanatory schematics, not measured scientific outputs.
Partner hardware photographs, confidential roadway reconstructions, original
manuscripts and unresolved-reuse screenshots are excluded from `dist/`.

Public GitHub access was checked on **8 October 2026**: nine repositories were
accessible and six unavailable anonymously. The latter are recorded as private
in the supplied overview; an anonymous 404 is not proof of current visibility.
Public code and open-source permission are separate. `Sensor_Computer` is public
but UNSW proprietary. Several other public projects have no detected licence.

See [source records](source-records/README.md), the machine-readable
[public source register](source-records/public-source-register.json), and the
[research map](docs/research-map.md).

Current source checks identify a published safety-paper citation and a public
rotating-target preprint beyond the older thesis plan. Earlier preprint titles
are explicitly distinguished from revised local manuscripts. Current journal
review statuses, author contributions, patent details and examination snapshots
still require final records.

## Website and repository

- Website: [Below the Surface](https://maninka123.github.io/my-phd-from-sensing-to-safety/)
- Source: [my-phd-from-sensing-to-safety](https://github.com/maninka123/my-phd-from-sensing-to-safety)

The GitHub Pages workflow builds and validates the curated public website before
publishing `dist/`. It runs on pushes to `main` and can also be triggered manually.
Private review material and original thesis documents are excluded. See
[deployment guidance](docs/deployment.md).

## Update the hub

1. Edit story/tool/paper relationships in `src/scripts/data.js` and narrative
   rendering in `src/scripts/app.js`.
2. Update public access/licence records after reviewing current documentation.
   `scripts/verify-repositories.py` refreshes anonymous repository/README evidence;
   retain manual licence interpretations after refresh.
3. Add assets only with recorded provenance and reuse rights. Keep review-only
   material in `verification/`.
4. Run `npm run build` and `npm run check`, then browser-test relevant interactions
   at desktop and mobile sizes.

The original thesis folders are read-only. All generated work stays within
`Github repo summary`.
