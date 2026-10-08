# Below the Surface — My PhD Story

I’m Pasindu Ranasinghe, and this is the story of my PhD research at UNSW Sydney:
connecting underground LiDAR–camera sensing, colourised 3D reconstruction and
safety interpretation for longwall mining.

My research follows a question that links these stages: how can I turn local
sensor observations into reliable spatial information, and use that information
to understand relationships in a changing underground workplace?

Through this website, I bring together my research papers, software and
experimental evidence. I introduce the ideas visually, then connect them to the
technical tools and academic structure behind my thesis. The work includes
studies developed with my collaborators, whose contributions are credited in
the linked publications and source records.

**[Explore my PhD story →](https://maninka123.github.io/my-phd-from-sensing-to-safety/)**

## My journey: from sensing to safety

I begin with the monitoring challenges at a longwall face, where machinery,
people and surrounding geometry change together. From there, my research moves
through the methods needed to make observations useful:

1. **Understand the challenge.** I examine how spatial sensing can add geometric
   context to existing underground monitoring.
2. **Combine shape and appearance.** I investigate LiDAR–camera fusion and
   low-light processing to produce colourised 3D observations.
3. **Make measurements reliable.** I study spatial calibration, enclosure-induced
   refraction and observation timing, each addressing a different source of error.
4. **Integrate a protected sensing unit.** I bring sensing, computation, optics,
   thermal management and communications into one engineering system.
5. **Reconstruct a wider scene.** I investigate coverage and constrained alignment
   so neighbouring observations can share a common spatial frame.
6. **Interpret relationships for safety.** I explore how perception, scene graphs,
   rules and contextual reasoning can support hazard interpretation.
7. **Explore further applications.** I connect the geometry to supporting work on
   movement, background separation and surface reconstruction.

I keep the evidence for each stage explicit. My studies establish separate
building blocks through analytical work, laboratory experiments, simulation and
recorded data. I do not present them as a completed acquisition-to-reasoning
system validated at an active operating face. Sustained, integrated underground
validation remains a next step, and I label Creep Monitoring as a concept/prototype.

## Explore my research

- **The Story:** I explain the research through seven illustrated stages.
- **Explore the Tools:** I connect 13 repositories through an interactive map,
  searchable catalogue, filters and tool detail panels.
- **The Thesis:** I map the seven-chapter structure, nine-paper register,
  software contributions and validation limits.
- **Sources & credits:** I show where the content and images come from and
  explain their reuse terms.

My current selection follows my revised repository overview (8 October 2026).
I include only the repositories selected for this PhD story.

## How I connect the tools

I organise the research around requirements → enabling methods → protected
unit → face-wide reconstruction → safety interpretation. Supporting tools can
contribute to more than one stage.

I distinguish three kinds of relationship in the map:

- **Solid blue — documented interface:** sensor output and monitoring input use
  ROSBridge/TCPROS colourised point-cloud streams; the receiver code is private.
- **Dashed teal — shared method or support:** calibration parameters, correction
  models, timing studies, coverage and reconstruction research support related work.
- **Dotted warm brown — proposed connection:** reconstructed scenes entering the
  safety framework, recordings entering the creep prototype, and surfaces built
  from aligned clouds describe future workflows, rather than established connectors.

I include exact repository names, purposes, inputs and outputs, research roles,
related tools, interface types and evidence status. I show repository links
without visibility badges or an access filter. The map also has
keyboard-operated stage buttons and a complete text alternative.

## My publication summary

I make my publication summary available from the header on every view, beside
GitHub and the last-update date. I show category counts once, with each paper
listed once in the summary. My current PhD portfolio contains nine papers:
three published journal articles, four journal manuscripts under review and
two published conference papers. I list my two related patent applications
separately from the paper total.

For the published journals, I show the publisher-listed Impact Factor, 2025
CiteScore and the highest 2025 CiteScore category percentile, with links to the
publisher and Scopus. I checked these records on 9 October 2026. The summary
uses `source-records/publication-summary.json`; the build generates
`src/scripts/publications.js`. My manuscript titles remain linked to their
available versions, while I display their author-confirmed status as under review.

I include the Australian provisional application’s verified filing title and
date from IP Australia. I retain the second application number from my thesis
plan while its exact title and current status await my final details. Journal
submission venues for the four manuscripts are not identified in the supplied
files. I keep the summary editable so those details can be added accurately.

## My evidence and acknowledgements

I include four figures from my paper with Patra, Banerjee and Raval (2025),
*LiDAR Point Cloud Colourisation Using Multi-Camera Fusion and Low-Light Image
Enhancement*, Sensors 25, 6582 ([DOI](https://doi.org/10.3390/s25216582)).
I retain the complete figure panels and captions and credit the work under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). I distinguish that
study’s trolley-based four-camera platform from the later enclosed single-camera unit.

I also include a Rotating Target Calibration Studio screenshot under its MIT
licence, with the full notice retained. It illustrates noise-free simulation,
not measured physical timing accuracy. I use original explanatory schematics
for the opening context, sensor fusion and method relationships; these
illustrations are not measured scientific results.

I also include seven complete figures from my hardware, array and safety
manuscripts: proposed mounting and hardware architecture, pose-graph alignment,
a simulated before-and-after array comparison, a single-unit colourised cloud,
the monitoring interface displaying simulation, and the safety graph pipeline.
I identify the local manuscript versions and evaluation settings in each caption,
and authorize these selected figures for this hub without claiming an open
licence. I preserve every panel and provide full-resolution image links.

I exclude partner hardware photographs, confidential roadway reconstructions,
original manuscripts and screenshots with unresolved reuse terms from the
public website.

I use a dated GitHub access snapshot from **8 October 2026**: seven included repositories
were publicly accessible and six were unavailable anonymously. I describe the
latter as private according to my repository overview, while recognising that
an anonymous 404 does not establish current visibility. I also distinguish
public access from permission to reuse code: `Sensor_Computer` is public but
UNSW proprietary, and several public projects have no detected licence.

My [source records](source-records/README.md),
[public source register](source-records/public-source-register.json) and
[research map](docs/research-map.md) document these boundaries.

I distinguish earlier manuscript titles from revised manuscript titles. The hub
includes identified public-record updates for the safety journal paper and
rotating-target manuscript beyond my older thesis plan. I use my confirmed
under-review wording for the four journal manuscripts. Final author contributions,
the second patent’s details and examination snapshots still require final records.

## Run the website locally

I keep this website static, with no dependencies to install. Open `index.html`
in a browser, or use Node 20 or newer for a local preview from the repository:

```powershell
cd my-phd-from-sensing-to-safety
npm run dev
```

Open **http://127.0.0.1:4173** and stop the preview with Ctrl+C. For another port,
set the `PORT` environment variable before launching.

To build, validate and preview the public distribution:

```powershell
npm run build
npm run check
node scripts/preview.mjs --dist
```

I can regenerate the three matching sensor-fusion illustrations with
`node scripts/create-fusion-diagrams.mjs`. They share one authored scene and
camera view; their point samples explain geometry and colour, rather than
representing a measured scan. The editable outputs live in `public/assets/diagrams/`.

I regenerate my protected-unit illustration with
`node scripts/create-unit-diagram.mjs`. I drew the LiDAR using the
[Livox Avia external form](https://www.livoxtech.com/avia) as a reference:
silver housing, green optical window, side cooling fins and connector.
The dome and internal arrangement explain the sensing concept and are not to
scale. Fixed-size numbered HTML labels remain readable on phones; I retain
the unchanged manuscript architecture figure immediately below.

The build creates `dist/` with relative paths for GitHub Pages. The website needs
no backend, account, external font, runtime API request or package installation.

## Repository structure

I separate the website, evidence records, documentation and build scripts.
I keep shared reading sizes in `src/styles/typography.css`: 20 px body text on
desktop, 18 px on mobile, and an 18 px minimum for captions, labels and controls
at the default browser text size. I preserve browser text-size preferences and
use wrapping layouts and HTML diagram labels so text remains readable.

I use a larger scale in my tool catalogue and detail panels: 20 px body text
and 24 px card headings on desktop, with 18 px labels, metadata, controls and
links. On phones, I keep tool body text at 18 px and card headings at 22 px.
My thesis paper titles follow the same 24 px desktop / 22 px mobile scale;
author details, publication records and contribution summaries use the shared
body size. My byline is 20 px on desktop and 18 px on phones.
I show the latest website update date beside the GitHub link in the header.
I maintain that date in `index.html` when I revise the app; it stays fixed
between updates.

```text
my-phd-from-sensing-to-safety/
├── index.html                    Entry point and semantic page shell
├── src/
│   ├── styles/                   Layout, shared typography and accessibility styles
│   └── scripts/
│       ├── app.js                Story, navigation, map, catalogue and dialogs
│       ├── data.js               Repository, paper and relationship content
│       ├── repository-status.js  Generated access/licence snapshot
│       ├── paper-figures.js       Generated featured figure metadata
│       └── publications.js       Generated publication and journal metric records
├── public/assets/
│   ├── diagrams/                 Editable explanatory SVG schematics
│   └── evidence/                 Licensed evidence and author-authorized manuscript figures
├── scripts/                      Build, preview, checks and diagram generation
├── source-records/               Provenance, access/licence and asset metadata
├── docs/                         Research map, deployment and verification notes
├── verification/.gitkeep         Placeholder; local review outputs are ignored
├── .github/workflows/pages.yml   GitHub Pages deployment workflow
└── dist/                         Generated website; excluded from Git
```

I keep raw repository snapshots, source inspection helpers and private review
assets in my local authoring folder; I do not upload them to this repository.

## Publishing and maintaining my story

- Website: [Below the Surface](https://maninka123.github.io/my-phd-from-sensing-to-safety/)
- Source: [my-phd-from-sensing-to-safety](https://github.com/maninka123/my-phd-from-sensing-to-safety)

I publish through GitHub Pages. The workflow builds and validates the curated
website before deploying `dist/`; it runs on pushes to `main` and can also run
manually. See my [deployment guidance](docs/deployment.md).

When I update the hub, I edit relationships in `src/scripts/data.js` and narrative
rendering in `src/scripts/app.js`, review access and licence records, and record
provenance for any new assets in `source-records/asset-register.json`. I run the build and checks, then review affected
interactions on desktop and mobile.

In my local thesis workspace, I keep all project changes inside
`Github repo summary`. My original thesis folders remain read-only.
