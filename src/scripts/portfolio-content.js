// Curated presentation content. Study evidence remains in HUB and PAPER_FIGURES;
// source access and licences remain in the generated REPOSITORY_STATUS records.
window.PORTFOLIO = {
  hero: {
    eyebrow: 'PHD RESEARCH · UNSW SYDNEY', title: 'Below the Surface',
    subtitle: 'From 3D Sensing to Intelligent Underground Mine Safety',
    description: 'Developing reliable spatial sensing, reconstruction and intelligent safety interpretation for underground longwall operations.',
    tags: ['LiDAR + Camera', '3D Reconstruction', 'Safety AI']
  },
  progression: [
    {label:'The challenge', icon:'challenge', section:'context'},
    {label:'Capture', icon:'scan', section:'capture'},
    {label:'Calibrate', icon:'ruler', section:'reliable'},
    {label:'Integrate', icon:'integrate', section:'unit'},
    {label:'Reconstruct', icon:'cube', section:'array'},
    {label:'Interpret', icon:'shield', section:'safety'}
  ],
  tools: {
    'single-shot-lidar-camera-calibration': {purpose:'Estimate the camera–LiDAR transform from one paired checkerboard capture.', visual:'registration-validation', note:'Related published validation figure; not a repository screenshot.', explore:['Prepare paired image and intensity-cloud inputs.', 'Inspect checkerboard correspondences and reprojection checks.', 'Export the refined sensor transformation.']},
    'enclosure-aware-lidar-correction': {purpose:'Explore optical-dome refraction and correct the resulting LiDAR geometry.', concept:'refraction', explore:['Configure dome geometry, refractive properties and sensor position.', 'Compare ray paths in Enclosure Lab.', 'Generate correction lookup tables and corrected clouds.']},
    'livox-avia-camera-timing': {purpose:'Compare recorded target-angle histories to estimate observation-time offsets.', concept:'timing', explore:['Analyse recorded camera and Livox Avia topics.', 'Inspect angle histories and timing quality checks.', 'Review estimated offsets and exported reports.']},
    'rotating-target-calibration-studio': {purpose:'Simulate a rotating target to compare sensor timing estimators.', screenshot:true, explore:['Configure target geometry and sensor models.', 'Compare angle and timing estimators.', 'Run parameter sweeps and inspect simulated error statistics.']},
    'Sensor_Computer': {purpose:'Acquire, align and colourise camera and LiDAR streams on the sensing computer.', concept:'integrate', explore:['Inspect the ROS acquisition and processing pipeline.', 'Configure calibration, filtering and low-light processing.', 'Review colourised-cloud and auxiliary-stream outputs.']},
    '3D_monitoring_device_simulation_underground': {purpose:'Test virtual longwall sensing configurations in ROS/Gazebo.', visual:'longwall-mounting', note:'Proposed mounting from the hardware manuscript; not a simulator screenshot.', explore:['Review documented single- and three-device simulation modes.', 'Examine simulated streams and ground-truth outputs.', 'Explore documented fault-isolation tests.']},
    'Lidar_camera_FOV_analysis': {purpose:'Evaluate viewing overlap and coverage for neighbouring sensing devices.', concept:'coverage', explore:['Review sensor orientation and stand-off parameters.', 'Examine roof clipping and viewing overlap.', 'Inspect documented coverage and layout analyses.']},
    'Multi_device_reconstruction-pose_graph': {purpose:'Align neighbouring point clouds into a shared spatial frame.', visual:'array-fusion-before-after', note:'Simulated three-device alignment; complete manuscript panels.', explore:['Review spacing and orientation priors.', 'Inspect registration and pose-graph alignment.', 'Compare aligned clouds against optional simulated ground truth.']},
    'Dynamic_Object_Detection': {purpose:'Identify moving foreground points against a stable scene background.', concept:'movement', explore:['Review background-building and motion compensation.', 'Explore documented per-device detection settings.', 'Inspect moving-point sets, bounding boxes and diagnostics.']},
    'Meshing_toolkit': {purpose:'Reconstruct coloured surfaces from point clouds and compare meshing methods.', concept:'mesh', explore:['Prepare PCD or PLY point-cloud inputs.', 'Compare Ball Pivoting and Poisson reconstruction.', 'Inspect held-out consistency and benchmark reports.']},
    'Central_Monitoring_Platform': {purpose:'Inspect sensing streams, recordings and combined reconstructions in one interface.', visual:'array-monitoring-interface', note:'Documented application displaying simulation; not a live embedded monitor.', explore:['Review ROSBridge and TCPROS connection workflows.', 'Explore recording, filtering and measurement functions.', 'Inspect individual and combined device views described in guide v3.']},
    'Scene-Graph_Mine-Safety': {purpose:'Connect scene geometry to hazard evidence and contextual safety reasoning.', visual:'safety-scene-graph-pipeline', note:'Research pipeline; the browser demonstrator operates on a single frame.', explore:['Inspect single-frame semantic detections and scene graphs.', 'Review deterministic rules and contextual reasoning outputs.', 'Examine the broader research framework’s temporal and memory stages.']},
    'Creep_Monitoring': {purpose:'Explore a prototype for monitoring unwanted movement of underground roof supports.', concept:'movement', explore:['Review the proposed fixed-marker reference workflow.', 'Inspect relative displacement and scan-comparison outputs.', 'Explore optional IMU orientation in the concept/prototype.']}
  }
};

// Short labels describe each tool's workflow; drawings are explanatory, not results.
window.PORTFOLIO.toolDrawings = {
  'single-shot-lidar-camera-calibration': {kind:'calibration', labels:['Shared target','Sensor alignment'], description:'Camera and LiDAR observe checkerboard corners to establish their spatial alignment.'},
  'enclosure-aware-lidar-correction': {kind:'refraction', labels:['Dome refraction','Ray correction'], description:'Light bends through an optical dome; ray tracing accounts for the changed path.'},
  'livox-avia-camera-timing': {kind:'timing', labels:['Rotating target','Time offset'], description:'Camera and LiDAR observe one rotating target to compare their observation times.'},
  'rotating-target-calibration-studio': {kind:'target', labels:['Target geometry','Sensor models'], description:'An apertured rotating target and camera–LiDAR models explain the timing simulation.'},
  'Sensor_Computer': {kind:'integration', labels:['LiDAR + camera','Colour + 3D'], description:'LiDAR geometry and camera appearance combine into a colourised spatial observation.'},
  '3D_monitoring_device_simulation_underground': {kind:'simulation', labels:['Virtual sensors','Longwall scene'], description:'Virtual sensing devices observe a simulated longwall with roof supports and a shearer.'},
  'Lidar_camera_FOV_analysis': {kind:'coverage', labels:['Sensor views','Coverage overlap'], description:'Two sensing fields overlap to illustrate viewing-geometry and coverage analysis.'},
  'Multi_device_reconstruction-pose_graph': {kind:'array', labels:['Separate views','Shared frame'], description:'Three differently placed observations of roof supports are aligned into one common frame.'},
  'Dynamic_Object_Detection': {kind:'motion', labels:['Repeated scans','Moving objects'], description:'A person changes position against stationary roof supports; foreground points identify the moving object.'},
  'Meshing_toolkit': {kind:'mesh', labels:['Point cloud','Surface mesh'], description:'A small set of 3D points is connected into a coloured triangular surface.'},
  'Central_Monitoring_Platform': {kind:'monitor', labels:['Device streams','Combined view'], description:'Several device streams feed a common spatial view on an operator display.'},
  'Scene-Graph_Mine-Safety': {kind:'safety', labels:['Scene graph','Hazard reasoning'], description:'Scene geometry becomes relationships between people and equipment, then evidence for a safety check.'},
  'Creep_Monitoring': {kind:'creep', labels:['Reference markers','Support creep'], description:'Reference markers help compare recorded scans for unwanted movement of underground roof-support structures.'}
};
