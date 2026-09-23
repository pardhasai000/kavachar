import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Box, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  HardHat, 
  Gauge, 
  Flame, 
  Power, 
  Camera, 
  Check, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';

export default function ARSimulation({ moduleId = 'mod_boiler_01', onComplete }) {
  const { token, user } = useAuth();
  const mountRef = useRef(null);
  const videoRef = useRef(null);

  // AR Camera toggle
  const [isARMode, setIsARMode] = useState(false);
  const [arError, setArError] = useState(null);

  // Simulation state
  const [stepStates, setStepStates] = useState({
    ppe: false,
    inspect_gauge: false,
    relief_valve: false,
    emergency_switch: false,
    extinguisher: false
  });

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [pressurePSI, setPressurePSI] = useState(185);
  const [simCompleted, setSimCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState(0);
  const [toastMessage, setToastMessage] = useState('Inspect the PPE station to equip gear before entering the hot work zone.');

  // Three.js refs
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const valveWheelRef = useRef(null);
  const needleRef = useRef(null);
  const steamParticlesRef = useRef(null);
  const warningLightRef = useRef(null);
  const switchLeverRef = useRef(null);

  const checklist = [
    {
      id: 'ppe',
      title: 'Equip Mandatory PPE Gear',
      desc: 'Verify and equip high-temp kevlar gloves, polycarbonate visor, and non-conductive boots.',
      icon: HardHat,
      actionText: 'Equip PPE Gear',
      target: 'PPE Locker'
    },
    {
      id: 'inspect_gauge',
      title: 'Inspect Boiler Pressure Gauge',
      desc: 'Analyze primary steam manifold gauge. Critical danger threshold detected (>180 PSI).',
      icon: Gauge,
      actionText: 'Scan Pressure Dial',
      target: 'Pressure Dial'
    },
    {
      id: 'relief_valve',
      title: 'Operate Steam Relief Valve',
      desc: 'Manually actuate counterweight relief valve to vent superheated steam down to <30 PSI.',
      icon: RotateCw,
      actionText: 'Turn Relief Valve',
      target: 'Valve Wheel'
    },
    {
      id: 'emergency_switch',
      title: 'Trigger Emergency Fuel Cutoff',
      desc: 'Engage the master red emergency shutoff lever to immediately cut burner fuel supply.',
      icon: Power,
      actionText: 'Trip Emergency Switch',
      target: 'Cutoff Switch'
    },
    {
      id: 'extinguisher',
      title: 'Deploy CO2 Suppressant Drill',
      desc: 'Execute PASS sweep technique at burner hearth to suppress secondary flare-up risk.',
      icon: Flame,
      actionText: 'Deploy Extinguisher',
      target: 'CO2 Extinguisher'
    }
  ];

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = isARMode ? null : new THREE.Color(0x090d16);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4.5, 9);
    camera.lookAt(0, 1.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Warning Red Strobe Light
    const warningLight = new THREE.PointLight(0xef4444, 2.5, 12);
    warningLight.position.set(0, 4.2, 0);
    scene.add(warningLight);
    warningLightRef.current = warningLight;

    // Floor with Industrial Hazard Grid
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid helper
    const grid = new THREE.GridHelper(16, 16, 0x06b6d4, 0x1e293b);
    grid.position.y = 0.01;
    scene.add(grid);

    // 1. Central Industrial Boiler Body (Cylinder)
    const boilerGeo = new THREE.CylinderGeometry(1.2, 1.2, 3.2, 32);
    const boilerMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.3
    });
    const boiler = new THREE.Mesh(boilerGeo, boilerMat);
    boiler.position.set(0, 2, 0);
    boiler.castShadow = true;
    scene.add(boiler);

    // Boiler Base Plate
    const baseGeo = new THREE.BoxGeometry(3, 0.4, 2.6);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.set(0, 0.2, 0);
    scene.add(base);

    // Pipe network
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const pipeGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.5, 16);
    const pipeTop = new THREE.Mesh(pipeGeo, pipeMat);
    pipeTop.position.set(1.2, 2.6, 0);
    pipeTop.rotation.z = Math.PI / 4;
    scene.add(pipeTop);

    // 2. Pressure Gauge Assembly
    const gaugeBodyGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.12, 32);
    const gaugeBodyMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 });
    const gaugeMesh = new THREE.Mesh(gaugeBodyGeo, gaugeBodyMat);
    gaugeMesh.position.set(0, 2.4, 1.25);
    gaugeMesh.rotation.x = Math.PI / 2;
    scene.add(gaugeMesh);

    // Gauge Face (White disc)
    const dialFaceGeo = new THREE.CircleGeometry(0.3, 32);
    const dialFaceMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const dialFace = new THREE.Mesh(dialFaceGeo, dialFaceMat);
    dialFace.position.set(0, 2.4, 1.32);
    scene.add(dialFace);

    // Gauge Needle (Pivot)
    const needlePivot = new THREE.Group();
    needlePivot.position.set(0, 2.4, 1.33);
    const needleBarGeo = new THREE.BoxGeometry(0.02, 0.24, 0.01);
    const needleBarMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });
    const needleBar = new THREE.Mesh(needleBarGeo, needleBarMat);
    needleBar.position.y = 0.1;
    needlePivot.add(needleBar);
    needlePivot.rotation.z = -1.2; // Red danger zone initially
    scene.add(needlePivot);
    needleRef.current = needlePivot;

    // 3. Steam Relief Valve Wheel (Torus + Spokes)
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(1.4, 3.2, 0);
    wheelGroup.rotation.y = Math.PI / 2;

    const ringGeo = new THREE.TorusGeometry(0.35, 0.06, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.6, roughness: 0.4 });
    const wheelRing = new THREE.Mesh(ringGeo, ringMat);
    wheelGroup.add(wheelRing);

    const spokeGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.7, 8);
    const spoke1 = new THREE.Mesh(spokeGeo, ringMat);
    const spoke2 = new THREE.Mesh(spokeGeo, ringMat);
    spoke2.rotation.z = Math.PI / 2;
    wheelGroup.add(spoke1);
    wheelGroup.add(spoke2);

    scene.add(wheelGroup);
    valveWheelRef.current = wheelGroup;

    // 4. Master Emergency Cutoff Lever Box
    const switchBoxGeo = new THREE.BoxGeometry(0.4, 0.6, 0.25);
    const switchBoxMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.3 });
    const switchBox = new THREE.Mesh(switchBoxGeo, switchBoxMat);
    switchBox.position.set(-1.4, 1.8, 0.6);
    scene.add(switchBox);

    const leverPivot = new THREE.Group();
    leverPivot.position.set(-1.4, 1.8, 0.75);
    const leverHandleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 12);
    const leverHandleMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c });
    const leverHandle = new THREE.Mesh(leverHandleGeo, leverHandleMat);
    leverHandle.position.y = 0.16;
    leverPivot.add(leverHandle);
    leverPivot.rotation.x = -0.5; // Up / armed initially
    scene.add(leverPivot);
    switchLeverRef.current = leverPivot;

    // 5. Fire Extinguisher Unit (Red cylinder + nozzle)
    const extGroup = new THREE.Group();
    extGroup.position.set(-2.4, 0.7, 1.2);

    const extCylGeo = new THREE.CylinderGeometry(0.18, 0.18, 1.1, 24);
    const extCylMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.7 });
    const extCyl = new THREE.Mesh(extCylGeo, extCylMat);
    extGroup.add(extCyl);

    const extHandle = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.15, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x1e293b })
    );
    extHandle.position.set(0, 0.62, 0);
    extGroup.add(extHandle);
    scene.add(extGroup);

    // 6. PPE Station Rack
    const ppeRack = new THREE.Group();
    ppeRack.position.set(2.4, 1.0, 1.2);
    const helmetMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 })
    );
    helmetMesh.position.y = 0.5;
    ppeRack.add(helmetMesh);
    const standMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1.0, 12),
      new THREE.MeshStandardMaterial({ color: 0x475569 })
    );
    ppeRack.add(standMesh);
    scene.add(ppeRack);

    // 7. Billowing Steam Particle System
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = 1.4 + (Math.random() - 0.5) * 0.4;
      particlePositions[i + 1] = 3.2 + Math.random() * 1.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 0.4;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.15,
      transparent: true,
      opacity: 0.8
    });

    const steamSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(steamSystem);
    steamParticlesRef.current = steamSystem;

    // Interactive mouse rotation (Orbit controls lightweight)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      scene.rotation.y += deltaX * 0.006;
      camera.position.y = Math.max(1.5, Math.min(7.0, camera.position.y + deltaY * 0.01));
      camera.lookAt(0, 1.5, 0);

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Flashing warning light if pressure is still critical
      if (warningLightRef.current) {
        if (!stepStates.emergency_switch) {
          warningLightRef.current.intensity = Math.sin(elapsedTime * 8) > 0 ? 3.0 : 0.4;
          warningLightRef.current.color.setHex(0xef4444);
        } else {
          warningLightRef.current.intensity = 1.5;
          warningLightRef.current.color.setHex(0x22c55e); // Green safe!
        }
      }

      // Steam particle movement
      if (steamParticlesRef.current) {
        const positions = steamParticlesRef.current.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.02;
          if (positions[i] > 5.0) {
            positions[i] = 3.2;
          }
        }
        steamParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        // Fade out steam when valve is depressurized
        steamParticlesRef.current.material.opacity = stepStates.relief_valve ? 0.15 : 0.8;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [isARMode]);

  // Handle AR Mode Camera Stream
  const toggleARMode = async () => {
    if (!isARMode) {
      try {
        setArError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsARMode(true);
      } catch (err) {
        console.error('AR Camera error', err);
        setArError('Camera access denied or unavailable. Running in high-fidelity 3D mode.');
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      setIsARMode(false);
    }
  };

  // Perform Simulation Step Actions
  const handlePerformStep = (stepId) => {
    if (stepId === 'ppe') {
      setStepStates(prev => ({ ...prev, ppe: true }));
      setToastMessage('✅ PPE verified! Full safety helmet, thermal gloves, and boots equipped.');
      setActiveStepIndex(1);
    } 
    else if (stepId === 'inspect_gauge') {
      setStepStates(prev => ({ ...prev, inspect_gauge: true }));
      setToastMessage('⚠️ Critical alert! Pressure gauge reading 185 PSI. Emergency venting required!');
      setActiveStepIndex(2);
    } 
    else if (stepId === 'relief_valve') {
      // Rotate 3D wheel
      if (valveWheelRef.current) {
        valveWheelRef.current.rotation.x += Math.PI * 4;
      }
      // Needle moves to safe
      if (needleRef.current) {
        needleRef.current.rotation.z = 1.1; // Safe green zone
      }
      setPressurePSI(24);
      setStepStates(prev => ({ ...prev, relief_valve: true }));
      setToastMessage('💨 Pressure relief wheel actuated! High-pressure steam safely bypassed (24 PSI).');
      setActiveStepIndex(3);
    } 
    else if (stepId === 'emergency_switch') {
      // Flip lever down
      if (switchLeverRef.current) {
        switchLeverRef.current.rotation.x = 0.8;
      }
      setStepStates(prev => ({ ...prev, emergency_switch: true }));
      setToastMessage('🛑 Emergency Fuel Cutoff engaged! Master burner extinguished.');
      setActiveStepIndex(4);
    } 
    else if (stepId === 'extinguisher') {
      setStepStates(prev => ({ ...prev, extinguisher: true }));
      setToastMessage('🧯 CO2 suppressant deployed successfully. Plant hazard secured.');
      setSimCompleted(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  // Calculate live score
  const completedCount = Object.values(stepStates).filter(Boolean).length;
  const currentScore = Math.round((completedCount / checklist.length) * 100);

  // Submit simulation completion
  const handleSubmitSimulation = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/simulations/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          moduleId,
          completedSteps: stepStates,
          score: 100,
          timeSpentSecs: 90
        })
      });

      const data = await res.json();
      if (res.ok) {
        confetti({ particleCount: 120, spread: 80 });
        if (onComplete) {
          onComplete(data);
        }
      } else {
        alert(data.error || 'Failed to submit simulation');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const resetSimulation = () => {
    setStepStates({
      ppe: false,
      inspect_gauge: false,
      relief_valve: false,
      emergency_switch: false,
      extinguisher: false
    });
    setPressurePSI(185);
    setSimCompleted(false);
    setActiveStepIndex(0);
    setToastMessage('Inspect the PPE station to equip gear before entering the hot work zone.');
    if (needleRef.current) needleRef.current.rotation.z = -1.2;
    if (switchLeverRef.current) switchLeverRef.current.rotation.x = -0.5;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Simulation Header */}
      <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
              <Box size={13} />
              INTERACTIVE 3D / WebAR SIMULATION
            </span>
            <span className="text-xs text-slate-400">Standard Operating Procedure Drill</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
            PS-41: High-Pressure Steam Valve Depressurization Drill
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleARMode}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              isARMode
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Camera size={14} />
            {isARMode ? 'Exit AR Mode' : 'Toggle AR Mode'}
          </button>

          <button
            onClick={resetSimulation}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Reset Drill"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {arError && (
        <div className="bg-amber-950/60 border-b border-amber-800/50 px-4 py-2 text-xs text-amber-300 flex items-center gap-2">
          <AlertTriangle size={14} />
          <span>{arError}</span>
        </div>
      )}

      {/* Main Simulation Viewport & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: 3D WebGL / AR Canvas Viewport */}
        <div className="lg:col-span-8 relative bg-slate-950 min-h-[480px] flex items-center justify-center overflow-hidden">
          {/* AR Video Background Passthrough */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover z-0 ${isARMode ? 'block' : 'hidden'}`}
          />

          {/* Three.js Mount */}
          <div ref={mountRef} className="w-full h-[520px] relative z-10 cursor-grab active:cursor-grabbing" />

          {/* Dynamic HUD Overlays */}
          {/* Pressure Telemetry HUD */}
          <div className="absolute top-4 left-4 z-20 bg-slate-900/85 backdrop-blur border border-slate-700/80 rounded-xl p-3 shadow-xl">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Gauge size={13} className={pressurePSI > 100 ? 'text-red-400 animate-pulse' : 'text-emerald-400'} />
              <span>Steam Telemetry</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-black ${pressurePSI > 100 ? 'text-red-400' : 'text-emerald-400'}`}>
                {pressurePSI}
              </span>
              <span className="text-xs font-bold text-slate-400">PSI</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${pressurePSI > 100 ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`}></span>
              <span className="text-[11px] font-medium text-slate-300">
                {pressurePSI > 100 ? 'HAZARD: OVERPRESSURE' : 'SAFE OPERATING RANGE'}
              </span>
            </div>
          </div>

          {/* Interactive 3D Orbit Helper Notice */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/70 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <RotateCw size={12} className="animate-spin text-cyan-400" />
            <span>Drag to rotate 3D view | Scroll to zoom</span>
          </div>

          {/* Real-time Status Audio-Visual Feedback Banner */}
          <div className="absolute bottom-4 right-4 max-w-sm z-20 bg-slate-900/90 backdrop-blur border border-cyan-500/30 rounded-xl p-3 shadow-xl text-xs text-slate-200">
            <div className="font-semibold text-cyan-400 flex items-center gap-1.5 mb-1">
              <Sparkles size={13} />
              <span>Safety Supervisor Audio Feed:</span>
            </div>
            <p>{toastMessage}</p>
          </div>
        </div>

        {/* Right: Step-by-Step SOP Checklist HUD */}
        <div className="lg:col-span-4 p-5 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                <span>Simulation Checklist</span>
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400">
                {completedCount} / {checklist.length} Completed
              </span>
            </div>

            {/* Score Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentScore}%` }}
              ></div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5">
              {checklist.map((step, idx) => {
                const isDone = stepStates[step.id];
                const isActive = activeStepIndex === idx;
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : isActive
                        ? 'bg-cyan-950/30 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-800/40 border-slate-800/70 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className={`p-1.5 rounded-lg mt-0.5 ${
                          isDone 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : isActive 
                            ? 'bg-cyan-500/20 text-cyan-400' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isDone ? <Check size={14} /> : <Icon size={14} />}
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold ${isDone ? 'text-emerald-300' : 'text-white'}`}>
                            {idx + 1}. {step.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{step.desc}</p>
                        </div>
                      </div>
                    </div>

                    {!isDone && (
                      <div className="mt-2.5 flex items-center justify-end">
                        <button
                          onClick={() => handlePerformStep(step.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm shadow-cyan-500/30'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          <step.icon size={13} />
                          <span>{step.actionText}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submission / Verification trigger */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            {simCompleted ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <ShieldCheck size={16} />
                  <span>All 5 safety drill checkpoints completed with 100% precision!</span>
                </div>
                <button
                  onClick={handleSubmitSimulation}
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>{submitting ? 'Recording Simulation...' : 'Submit & Proceed to Exam'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  Complete all 5 emergency SOP steps above to unlock the official certification exam.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

