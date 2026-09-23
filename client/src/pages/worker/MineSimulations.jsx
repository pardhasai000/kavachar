import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Flame, 
  Wind, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Camera, 
  RotateCw, 
  ArrowRight, 
  Check, 
  Sparkles,
  RefreshCw,
  Gauge,
  Radio,
  Play,
  Pause,
  Film,
  Box,
  Volume2,
  VolumeX,
  FastForward,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../../utils/translations';

export default function MineSimulations({ selectedLang, selectedMine, activeDrill = 'gas', onDrillComplete, onNavigateToAssignment }) {
  const t = translations[selectedLang] || translations.en;
  
  // Drill selection: 'gas' (Gas Leak) or 'fire' (Fire & Explosion)
  const [drillType, setDrillType] = useState(activeDrill);
  
  // View mode: 'video' (Realistic 3D Simulation Video) or 'interactive' (Hands-on 3D WebGL)
  const [viewMode, setViewMode] = useState('video');
  
  // Video player controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoTime, setVideoTime] = useState(0);

  // AR Camera toggle
  const [isARMode, setIsARMode] = useState(false);
  const [arError, setArError] = useState(null);

  // Gas Leak Checklist
  const [gasSteps, setGasSteps] = useState({
    sniffer: false,
    scsr: false,
    vent: false,
    evacuate: false
  });

  // Fire & Explosion Checklist
  const [fireSteps, setFireSteps] = useState({
    stonedust: false,
    deluge: false,
    firedoor: false,
    refuge: false
  });

  // Telemetry state
  const [methanePercent, setMethanePercent] = useState(8.2);
  const [coPPM, setCoPPM] = useState(140);
  const [temperatureC, setTemperatureC] = useState(85);

  const [toastMessage, setToastMessage] = useState(
    drillType === 'gas' 
      ? 'Underground Methanometer alert: Hazardous gas inrush detected at coal face!' 
      : 'Active spontaneous combustion fire detected! Trigger explosion barrier immediately!'
  );

  // Three.js object references
  const mountRef = useRef(null);
  const videoRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const gasParticlesRef = useRef(null);
  const fireParticlesRef = useRef(null);
  const stoneDustShelfRef = useRef(null);
  const blastDoorRef = useRef(null);
  const warningLightRef = useRef(null);

  // Realistic Simulation Video Milestones
  const gasTimeline = [
    { time: 3, label: 'CH4 & CO Gas Inrush detected', desc: 'Roof fracture vents 8.2% explosive firedamp' },
    { time: 8, label: 'Methanometer Sniffer Alert', desc: 'Optical sensor triggers high-pitch sirens' },
    { time: 14, label: 'SCSR Breathing Mask Donned', desc: 'Chemical oxygen initiates under 60 seconds' },
    { time: 21, label: 'Ventilation Curtain Dilution', desc: 'Intake fresh air reduces methane to 0.4%' },
    { time: 27, label: 'Safe Lifeline Evacuation', desc: 'Crew navigates to intake shaft' }
  ];

  const fireTimeline = [
    { time: 3, label: 'Spontaneous Coal Seam Ignition', desc: 'Coal face temperatures surge past 85°C' },
    { time: 8, label: 'Coal Dust Explosion Shockwave', desc: 'Deflagration wave expands along the drift' },
    { time: 14, label: 'Stone-Dust Barrier Discharge', desc: 'Limestone dust quenches trailing flamefront' },
    { time: 20, label: 'High-Pressure Foam Blanket', desc: 'Heavy foam cannon smothers burning coal seam' },
    { time: 27, label: 'Blast Door Sealed & Refuge Occupied', desc: 'Crew enters airtight 48h safety chamber' }
  ];

  // Video progress timer simulation
  useEffect(() => {
    let interval;
    if (viewMode === 'video' && isPlaying) {
      interval = setInterval(() => {
        setVideoTime(prev => {
          const next = prev + 0.5 * playbackSpeed;
          if (next >= 30) return 0;
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [viewMode, isPlaying, playbackSpeed]);

  // Build 3D Three.js Scene (for interactive mode)
  useEffect(() => {
    if (viewMode !== 'interactive') return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = isARMode ? null : new THREE.Color(0x05070c);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 8.5);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const minerCapLight = new THREE.PointLight(0xffedd5, 1.8, 16);
    minerCapLight.position.set(0, 3.5, 7.5);
    scene.add(minerCapLight);

    const alertLight = new THREE.PointLight(0xef4444, 2.5, 14);
    alertLight.position.set(0, 3.8, 0);
    scene.add(alertLight);
    warningLightRef.current = alertLight;

    // Floor
    const floorGeo = new THREE.PlaneGeometry(8, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.95 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Mine Haulage Tracks
    const railMat = new THREE.MeshStandardMaterial({ color: 0x71717a, metalness: 0.8 });
    const rail1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 18), railMat);
    rail1.position.set(-0.7, 0.04, 0);
    const rail2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 18), railMat);
    rail2.position.set(0.7, 0.04, 0);
    scene.add(rail1);
    scene.add(rail2);

    // Coal Seam Walls
    const wallGeo = new THREE.BoxGeometry(0.6, 4.2, 18);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 1.0 });
    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.position.set(-3.2, 2.1, 0);
    const rightWall = new THREE.Mesh(wallGeo, wallMat);
    rightWall.position.set(3.2, 2.1, 0);
    scene.add(leftWall);
    scene.add(rightWall);

    // Timber Props
    const propMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 });
    for (let z = -6; z <= 6; z += 3) {
      const postL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.8, 8), propMat);
      postL.position.set(-2.6, 1.9, z);
      const postR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.8, 8), propMat);
      postR.position.set(2.6, 1.9, z);
      const bar = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.25, 0.25), propMat);
      bar.position.set(0, 3.7, z);
      scene.add(postL);
      scene.add(postR);
      scene.add(bar);
    }

    if (drillType === 'gas') {
      const pCount = 180;
      const pGeo = new THREE.BufferGeometry();
      const pPositions = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount * 3; i += 3) {
        pPositions[i] = (Math.random() - 0.5) * 4.5;
        pPositions[i + 1] = 2.0 + Math.random() * 1.6;
        pPositions[i + 2] = -4 + (Math.random() - 0.5) * 5;
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x84cc16,
        size: 0.22,
        transparent: true,
        opacity: 0.8
      });

      const gasCloud = new THREE.Points(pGeo, pMat);
      scene.add(gasCloud);
      gasParticlesRef.current = gasCloud;

    } else {
      const fireCount = 220;
      const fGeo = new THREE.BufferGeometry();
      const fPositions = new Float32Array(fireCount * 3);

      for (let i = 0; i < fireCount * 3; i += 3) {
        fPositions[i] = (Math.random() - 0.5) * 3.5;
        fPositions[i + 1] = 0.2 + Math.random() * 2.8;
        fPositions[i + 2] = -6 + (Math.random() - 0.5) * 3;
      }

      fGeo.setAttribute('position', new THREE.BufferAttribute(fPositions, 3));
      const fMat = new THREE.PointsMaterial({
        color: 0xf97316,
        size: 0.28,
        transparent: true,
        opacity: 0.95
      });

      const fireParticles = new THREE.Points(fGeo, fMat);
      scene.add(fireParticles);
      fireParticlesRef.current = fireParticles;

      const shelfGroup = new THREE.Group();
      shelfGroup.position.set(0, 3.5, 1.5);
      const shelfBar = new THREE.Mesh(
        new THREE.BoxGeometry(4.6, 0.1, 0.8),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 })
      );
      shelfGroup.add(shelfBar);
      scene.add(shelfGroup);
      stoneDustShelfRef.current = shelfGroup;

      const doorGroup = new THREE.Group();
      doorGroup.position.set(-2.0, 1.9, 3.5);
      const doorMesh = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 3.8, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 })
      );
      doorMesh.position.x = 1.0;
      doorGroup.add(doorMesh);
      scene.add(doorGroup);
      blastDoorRef.current = doorGroup;
    }

    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      scene.rotation.y += deltaX * 0.006;
      camera.position.y = Math.max(1.5, Math.min(6.0, camera.position.y + deltaY * 0.008));
      camera.lookAt(0, 1.2, 0);
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (warningLightRef.current) {
        warningLightRef.current.intensity = Math.sin(elapsed * 6) > 0 ? 3.5 : 0.5;
      }

      if (gasParticlesRef.current) {
        const pos = gasParticlesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < pos.length; i += 3) {
          pos[i + 1] += Math.sin(elapsed * 2 + i) * 0.005;
        }
        gasParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      if (fireParticlesRef.current) {
        const pos = fireParticlesRef.current.geometry.attributes.position.array;
        for (let i = 1; i < pos.length; i += 3) {
          pos[i] += 0.035;
          if (pos[i] > 3.2) pos[i] = 0.2;
        }
        fireParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (rendererRef.current?.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [viewMode, drillType, isARMode]);

  // Gas Step Actions
  const handleGasStep = (stepKey) => {
    if (stepKey === 'sniffer') {
      setGasSteps(prev => ({ ...prev, sniffer: true }));
      setToastMessage('⚠️ Methanometer confirms 8.2% Methane & 140 PPM CO! Critical danger!');
    } else if (stepKey === 'scsr') {
      setGasSteps(prev => ({ ...prev, scsr: true }));
      setToastMessage('🫁 SCSR Oxygen Mask donned within 45s! Chemical oxygen supply initiated.');
    } else if (stepKey === 'vent') {
      setGasSteps(prev => ({ ...prev, vent: true }));
      setMethanePercent(0.4);
      setCoPPM(12);
      if (gasParticlesRef.current) {
        gasParticlesRef.current.material.opacity = 0.15;
      }
      setToastMessage('💨 Ventilation curtain deployed! Fresh intake air diluted methane to 0.4%.');
    } else if (stepKey === 'evacuate') {
      setGasSteps(prev => ({ ...prev, evacuate: true }));
      setToastMessage(t.gasPassedToast);
      confetti({ particleCount: 90, spread: 70 });
      if (onDrillComplete) onDrillComplete('gas');
    }
  };

  // Fire Step Actions
  const handleFireStep = (stepKey) => {
    if (stepKey === 'stonedust') {
      setFireSteps(prev => ({ ...prev, stonedust: true }));
      if (stoneDustShelfRef.current) {
        stoneDustShelfRef.current.rotation.x = 0.8;
      }
      setToastMessage('🌪️ Stone dust barrier discharged! Explosion flame propagation arrested.');
    } else if (stepKey === 'deluge') {
      setFireSteps(prev => ({ ...prev, deluge: true }));
      setTemperatureC(32);
      if (fireParticlesRef.current) {
        fireParticlesRef.current.material.opacity = 0.2;
      }
      setToastMessage('🧯 High-expansion foam blanket sprayed over burning coal face!');
    } else if (stepKey === 'firedoor') {
      setFireSteps(prev => ({ ...prev, firedoor: true }));
      if (blastDoorRef.current) {
        blastDoorRef.current.rotation.y = Math.PI / 2;
      }
      setToastMessage('🚪 Heavy explosion-proof blast door sealed shut to starve oxygen.');
    } else if (stepKey === 'refuge') {
      setFireSteps(prev => ({ ...prev, refuge: true }));
      setToastMessage(t.firePassedToast);
      confetti({ particleCount: 100, spread: 80 });
      if (onDrillComplete) onDrillComplete('fire');
    }
  };

  const isGasComplete = Object.values(gasSteps).every(Boolean);
  const isFireComplete = Object.values(fireSteps).every(Boolean);

  const getMineName = () => {
    if (!selectedMine) return 'Jharia Coalfield Pit #4';
    if (selectedLang === 'hi') return selectedMine.nameHi;
    if (selectedLang === 'sat') return selectedMine.nameSat;
    return selectedMine.name;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
      {/* Simulation Top Bar */}
      <div className="p-4 sm:p-5 bg-slate-950/85 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              JHARKHAND MINE HAZARD SIMULATOR
            </span>
            <span className="text-xs text-slate-400 font-medium">Colliery: <strong className="text-white">{getMineName()}</strong></span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white mt-1">
            {drillType === 'gas' ? t.gasLeakTitle : t.fireTitle}
          </h2>
        </div>

        {/* Mode Selector & Drill Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* 3D Realistic Video vs Interactive 3D Drill Toggle */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setViewMode('video')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'video'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film size={14} />
              <span>3D Realistic Video</span>
            </button>

            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box size={14} />
              <span>3D Interactive Drill</span>
            </button>
          </div>

          {/* Switch Hazard Toggle */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => {
                setDrillType('gas');
                setVideoTime(0);
                setToastMessage('Underground Methanometer alert: Hazardous gas inrush detected!');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                drillType === 'gas'
                  ? 'bg-lime-600 text-white shadow-md shadow-lime-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wind size={13} />
              <span>Gas Leak</span>
              {isGasComplete && <Check size={12} className="text-emerald-300" />}
            </button>

            <button
              onClick={() => {
                setDrillType('fire');
                setVideoTime(0);
                setToastMessage('Active spontaneous combustion fire detected! Trigger explosion barrier!');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                drillType === 'fire'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame size={13} />
              <span>Fire & Explosion</span>
              {isFireComplete && <Check size={12} className="text-emerald-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Viewport (Video or Interactive 3D) */}
        <div className="lg:col-span-8 relative bg-slate-950 min-h-[500px] flex items-center justify-center overflow-hidden">
          {viewMode === 'video' ? (
            /* 1. Realistic 3D Simulation Video Player Component */
            <div className="w-full h-full min-h-[520px] relative bg-black flex flex-col justify-between overflow-hidden">
              {/* Video Simulation Canvas / Surface */}
              <div className="absolute inset-0 z-0">
                {drillType === 'fire' ? (
                  /* Realistic Underground Coal Dust Explosion Simulation Visuals */
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    {/* Embedded Educational Underground Mine Explosion Footage */}
                    <iframe
                      className="w-full h-full absolute inset-0 pointer-events-none scale-105 opacity-90"
                      src="https://www.youtube.com/embed/S_8qMskfU4w?autoplay=1&mute=1&controls=0&loop=1&playlist=S_8qMskfU4w&showinfo=0&rel=0&modestbranding=1"
                      title="NIOSH Underground Coal Dust Explosion Simulation"
                      allow="autoplay; encrypted-media"
                    />

                    {/* Realistic Blast Shockwave & Thermal HUD Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-red-950/40 mix-blend-color-burn pointer-events-none" />

                    {/* Infrared / Thermal Camera Simulation HUD */}
                    <div className="absolute top-4 right-4 bg-red-950/80 backdrop-blur border border-red-500/50 rounded-xl px-3 py-1.5 text-xs text-red-200 font-mono flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      <span>THERMAL INFRARED FLAME SENSOR • ACTIVE</span>
                    </div>
                  </div>
                ) : (
                  /* Realistic Underground Gas Leak & Methane Dispersion Simulation Visuals */
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    {/* Embedded Optical Gas Imaging (OGI) & Methane Inrush Simulation */}
                    <iframe
                      className="w-full h-full absolute inset-0 pointer-events-none scale-105 opacity-90"
                      src="https://www.youtube.com/embed/g6j3k4r6f3Q?autoplay=1&mute=1&controls=0&loop=1&playlist=g6j3k4r6f3Q&showinfo=0&rel=0&modestbranding=1"
                      title="Underground Methane Inrush Simulation"
                      allow="autoplay; encrypted-media"
                    />

                    {/* Toxic Vapor Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-lime-950/40 pointer-events-none" />

                    {/* Optical Gas Camera HUD */}
                    <div className="absolute top-4 right-4 bg-lime-950/80 backdrop-blur border border-lime-500/50 rounded-xl px-3 py-1.5 text-xs text-lime-200 font-mono flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-ping" />
                      <span>OPTICAL GAS IMAGING (OGI) • 8.2% CH4</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Telemetry HUD */}
              <div className="relative z-10 m-4 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl p-3 shadow-2xl text-xs space-y-1.5 max-w-[210px]">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Gauge size={13} className="text-cyan-400" />
                  <span>Colliery Sensor Grid</span>
                </div>

                {drillType === 'gas' ? (
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">CH4:</span>
                      <span className="font-bold text-red-400 animate-pulse">{methanePercent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CO:</span>
                      <span className="font-bold text-red-400">{coPPM} PPM</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800 text-[10px] text-red-400 font-bold">
                      {t.gasHazard}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Heading Temp:</span>
                      <span className="font-bold text-orange-400 animate-pulse">{temperatureC}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Blast Pressure:</span>
                      <span className="font-bold text-red-400">4.8 Bar (Shockwave)</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800 text-[10px] text-orange-400 font-bold">
                      {t.fireDanger}
                    </div>
                  </div>
                )}
              </div>

              {/* Video Player Controller Bar at Bottom */}
              <div className="relative z-10 mt-auto bg-slate-950/95 backdrop-blur border-t border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer transition shadow-md shadow-cyan-600/20"
                    title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>

                  <button
                    onClick={() => setVideoTime(0)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition"
                    title="Replay from Beginning"
                  >
                    <RefreshCw size={14} />
                  </button>

                  {/* Playback speed selector */}
                  <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 font-mono text-[11px]">
                    <span className="text-slate-500">Speed:</span>
                    <button
                      onClick={() => setPlaybackSpeed(0.5)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${playbackSpeed === 0.5 ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
                    >
                      0.5x
                    </button>
                    <button
                      onClick={() => setPlaybackSpeed(1)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${playbackSpeed === 1 ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
                    >
                      1.0x
                    </button>
                  </div>
                </div>

                {/* Scrubber Timeline Bar */}
                <div className="flex-1 mx-3 hidden sm:block">
                  <div className="w-full bg-slate-800 rounded-full h-1.5 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-red-500 via-orange-500 to-cyan-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(videoTime / 30) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>00:{Math.floor(videoTime).toString().padStart(2, '0')}</span>
                    <span>Disaster Timeline: 00:30</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  <span>HD 1080p 3D Simulation</span>
                </div>
              </div>
            </div>
          ) : (
            /* 2. Hands-on 3D Three.js Interactive WebGL Viewport */
            <div className="w-full h-full relative flex items-center justify-center">
              <video
                ref={videoRef}
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover z-0 ${isARMode ? 'block' : 'hidden'}`}
              />

              <div ref={mountRef} className="w-full h-[520px] relative z-10 cursor-grab active:cursor-grabbing" />

              <div className="absolute bottom-4 left-4 z-20 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <RotateCw size={12} className="animate-spin text-cyan-400" />
                <span>Drag mouse to orbit 3D colliery heading</span>
              </div>
            </div>
          )}

          {/* Supervisor Audio Feed Callout */}
          <div className="absolute top-4 right-4 z-20 max-w-xs bg-slate-950/90 backdrop-blur border border-cyan-500/30 rounded-xl p-3 shadow-xl text-xs text-slate-200 hidden md:block">
            <div className="font-semibold text-cyan-400 flex items-center gap-1.5 mb-1">
              <Radio size={13} className="animate-pulse" />
              <span>Colliery Safety Feed ({selectedMine?.company}):</span>
            </div>
            <p className="text-[11px] leading-snug">{toastMessage}</p>
          </div>
        </div>

        {/* Right: Step-by-Step SOP Checklist HUD */}
        <div className="lg:col-span-4 p-5 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                <span>{drillType === 'gas' ? 'Gas Inrush Mitigation' : 'Explosion Suppression'}</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400">
                {drillType === 'gas'
                  ? `${Object.values(gasSteps).filter(Boolean).length} / 4`
                  : `${Object.values(fireSteps).filter(Boolean).length} / 4`}
              </span>
            </div>

            {/* Checklist Items for Gas Drill */}
            {drillType === 'gas' && (
              <div className="space-y-3">
                <div className={`p-3 rounded-xl border text-xs transition ${
                  gasSteps.sniffer ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <h4 className="font-bold text-white">{t.stepSniffer}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.stepSnifferDesc}</p>
                  {!gasSteps.sniffer && (
                    <button
                      onClick={() => handleGasStep('sniffer')}
                      className="mt-2.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {t.stepSnifferAction}
                    </button>
                  )}
                </div>

                <div className={`p-3 rounded-xl border text-xs transition ${
                  gasSteps.scsr ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <h4 className="font-bold text-white">{t.stepSCSR}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.stepSCSRDesc}</p>
                  {!gasSteps.scsr && gasSteps.sniffer && (
                    <button
                      onClick={() => handleGasStep('scsr')}
                      className="mt-2.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {t.stepSCSRAction}
                    </button>
                  )}
                </div>

                <div className={`p-3 rounded-xl border text-xs transition ${
                  gasSteps.vent ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <h4 className="font-bold text-white">{t.stepVent}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.stepVentDesc}</p>
                  {!gasSteps.vent && gasSteps.scsr && (
                    <button
                      onClick={() => handleGasStep('vent')}
                      className="mt-2.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {t.stepVentAction}
                    </button>
                  )}
                </div>

                <div className={`p-3 rounded-xl border text-xs transition ${
                  gasSteps.evacuate ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <h4 className="font-bold text-white">{t.stepEvacuate}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.stepEvacuateDesc}</p>
                  {!gasSteps.evacuate && gasSteps.vent && (
                    <button
                      onClick={() => handleGasStep('evacuate')}
                      className="mt-2.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {t.stepEvacuateAction}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Checklist Items for Fire Drill */}
            {drillType === 'fire' && (
              <div className="space-y-3">
                <div className={`p-3 rounded-xl border text-xs transition ${
                  fireSteps.stonedust ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <h4 className="font-bold text-white">{t.stepStoneDust}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.stepStoneDustDesc}</p>
                  {!fireSteps.stonedust && (
                    <button
                      onClick={() => handleFireStep('stonedust')}
                      className="mt-2.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {t.stepStoneDustAction}
                    </button>
                  )}
                </div>

                <div className={`p-3 rounded-xl border text-xs transition ${
                  fireSteps.deluge ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <h4 className="font-bold text-white">{t.stepDeluge}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.stepDelugeDesc}</p>
                  {!fireSteps.deluge && fireSteps.stonedust && (
                    <button
                      onClick={() => handleFireStep('deluge')}
                      className="mt-2.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {t.stepDelugeAction}
                    </button>
                  )}
                </div>

                <div className={`p-3 rounded-xl border text-xs transition ${
                  fireSteps.firedoor ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <h4 className="font-bold text-white">{t.stepFireDoor}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.stepFireDoorDesc}</p>
                  {!fireSteps.firedoor && fireSteps.deluge && (
                    <button
                      onClick={() => handleFireStep('firedoor')}
                      className="mt-2.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {t.stepFireDoorAction}
                    </button>
                  )}
                </div>

                <div className={`p-3 rounded-xl border text-xs transition ${
                  fireSteps.refuge ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <h4 className="font-bold text-white">{t.stepRefuge}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.stepRefugeDesc}</p>
                  {!fireSteps.refuge && fireSteps.firedoor && (
                    <button
                      onClick={() => handleFireStep('refuge')}
                      className="mt-2.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {t.stepRefugeAction}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Proceed to Assignment CTA */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            {(isGasComplete || isFireComplete) ? (
              <button
                onClick={onNavigateToAssignment}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Sparkles size={16} />
                <span>{t.navAssignment}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <p className="text-[11px] text-slate-500 text-center">
                Watch the realistic 3D simulation video or complete the checklist steps to unlock the assignment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
