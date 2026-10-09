# The research map

The research develops a path from reliable enclosed observations to spatial
reconstruction and safety interpretation. Separate evaluations establish its
building blocks. A complete active-face acquisition-to-reasoning trial remains
future work.

The software catalogue follows the revised author portfolio dated 8 October
2026 and includes 13 PhD repositories.

## The story

1. Longwall visibility: workers, cutting machinery and supports occupy a changing space.
2. Capture: LiDAR geometry and camera appearance form colourised observations.
3. Reliability: spatial calibration, refraction, timing and low-light processing.
4. Integration: sensors and processing inside a protected physical unit.
5. Reconstruction: many overlapping observations in a common coordinate frame.
6. Interpretation: detections → spatial/temporal relationships → hazard evidence.
7. Extensions: creep concept/prototype, moving-object detection and surface meshing.

## Academic ownership

| Location | Study or task | Supporting repositories |
|---|---|---|
| 1 | Introduction, objectives and distinct contributions | Entire programme |
| 2 | Review, monitoring requirements and readiness | Requirements inform all tools |
| 3.1 | Single-shot extrinsic calibration | single-shot-lidar-camera-calibration |
| 3.2 | Enclosure and time correction | enclosure-aware-lidar-correction; livox-avia-camera-timing |
| 3.3 | Rotating-aperture temporal target | rotating-target-calibration-studio; livox-avia-camera-timing |
| 3.4 | Multi-camera colourisation and enhancement | Principles relate to Sensor_Computer; different research rig |
| 4 | Protected unit and pre-deployment validation | Sensor_Computer; 3D_monitoring_device_simulation_underground |
| 5 | Array processing, coverage and reconstruction | Sensor_Computer; simulation; Lidar_camera_FOV_analysis; Multi_device_reconstruction-pose_graph; Central_Monitoring_Platform; Dynamic_Object_Detection as supporting tool |
| 6 | Perception and hybrid safety reasoning | Scene-Graph_Mine-Safety |
| 7 | Evidence synthesis and future validation | Programme plus Creep_Monitoring concept/prototype and Meshing_toolkit supporting application |
| Appendix A | Earlier dome-refraction paper | Enclosure correction supporting methods; overlap with 3.2 disclosed |

## Connections in text

**Documented transport:** Sensor_Computer publishes colourised PointCloud2 data,
including `/merged_colored_cloud`, via TCPROS/ROSBridge. The supplied Central
Monitoring user guide v3 documents receiving those transport types. Private
receiver source was not independently reviewed; no other code-level connector is
asserted.

**Shared methods/support:** spatial calibration → sensing parameters; enclosure
models and recorded geometry → correction evidence; target simulations and
studio → temporal analysis; coverage tools → array geometry; reconstruction →
monitoring transform concepts; dynamic detection → foreground filtering.

**Proposed workflows:** monitored/reconstructed scenes → safety interpretation;
recordings → creep prototype; aligned clouds → surface meshing. Compatible file
formats alone do not establish an implemented pipeline.

## Evidence distinctions

- Temporal target: 22 configurations, three hardware tests and remaining simulations.
- Measurement timing: ~32 ms initial error and 2.726 ms corrected residual.
- Rotating target: +66.7 ms estimated relative observation-time offset, not residual error.
- Hardware output: 10 Hz standard, 5.2 Hz enhanced, under the reported conditions.
- Array trials: 1,029 simulated neighbouring-device evaluations; pairwise errors are not global operational accuracy.
- Safety: 115 controlled scenarios; coverage 57% / 76% / 93% at successive reasoning stages.
- MineGraph Studio: one-frame browser demonstrator without temporal graphs or live sensing.
- Creep monitoring: concept/prototype for monitoring unwanted movement of underground roof-support structures.

## Public record updates

The rotating-target paper has [SSRN 7513129](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7513129), posted 23 September 2026.
The safety journal article is listed by [UNSW Research](https://research.unsw.edu.au/people/professor-simit-raval/publications) as Expert Systems with Applications, 134601,
[DOI 10.1016/j.eswa.2026.134601](https://doi.org/10.1016/j.eswa.2026.134601).
Hardware arXiv 2605.02516 and safety arXiv 2606.03460 use earlier titles. The local
revised manuscript titles remain authoritative for this thesis map.
