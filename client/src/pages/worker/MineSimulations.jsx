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
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../../utils/translations';

export default function MineSimulations({ selectedLang, selectedMine, activeDrill = 'gas', onDrillComplete, onNavigateToAssignment }) {
  const t = translations[selectedLang] || translations.en;
  const mountRef = useRef(null);
  const videoRef = useRef(null);

  // Drill type: 'gas' (Gas Leak) or 'fire' (Fire & Explosion)
  const [drillType, setDrillType] = useState(activeDrill);
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
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const gasParticlesRef = useRef(null);
  const fireParticlesRef = useRef(null);
  const stoneDustShelfRef = useRef(null);
  const blastDoorRef = useRef(null);
  const warningLightRef = useRef(null);

  // Build 3D Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = isARMode ? null : new THREE.Color(0x05070c);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 8.5);
    camera.lookAt(0, 1.2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const minerCapLight = new THREE.PointLight(0xffedd5, 1.8, 16);
    minerCapLight.position.set(0, 3.5, 7.5);
    scene.add(minerCapLight);

    // Strobe Alert Light
    const alertLight = new THREE.PointLight(0xef4444, 2.5, 14);
    alertLight.position.set(0, 3.8, 0);
    scene.add(alertLight);
    warningLightRef.current = alertLight;

    // 1. Underground Coal Mine Tunnel Gallery
    // Floor
    const floorGeo = new THREE.PlaneGeometry(8, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.95 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Mine Haulage Tracks (Rails)
    const railMat = new THREE.MeshStandardMaterial({ color: 0x71717a, metalness: 0.8 });
    const rail1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 18), railMat);
    rail1.position.set(-0.7, 0.04, 0);
    const rail2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 18), railMat);
    rail2.position.set(0.7, 0.04, 0);
    scene.add(rail1);
    scene.add(rail2);

    // Coal Tunnel Walls (Rough Dark Coal Seam)
    const wallGeo = new THREE.BoxGeometry(0.6, 4.2, 18);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 1.0 });
    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.position.set(-3.2, 2.1, 0);
    const rightWall = new THREE.Mesh(wallGeo, wallMat);
    rightWall.position.set(3.2, 2.1, 0);
    scene.add(leftWall);
    scene.add(rightWall);

    // Roof Support Timber Pit Props (Cross-beams)
    const propMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 });
    for (let z = -6; z <= 6; z += 3) {
      // Left vertical post
      const postL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.8, 8), propMat);
      postL.position.set(-2.6, 1.9, z);
      // Right vertical post
      const postR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.8, 8), propMat);
      postR.position.set(2.6, 1.9, z);
      // Roof crossbar
      const bar = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.25, 0.25), propMat);
      bar.position.set(0, 3.7, z);

      scene.add(postL);
      scene.add(postR);
      scene.add(bar);
    }

    // 2. Ventilation Duct Pipe along roof
    const ductGeo = new THREE.CylinderGeometry(0.35, 0.35, 18, 16);
    const ductMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.2 });
    const duct = new THREE.Mesh(ductGeo, ductMat);
    duct.rotation.x = Math.PI / 2;
    duct.position.set(2.0, 3.4, 0);
    scene.add(duct);

    // 3. Drill-Specific 3D Assets:
    if (drillType === 'gas') {
      // Gas Leak Vapor Particles (Methane / CO cloud)
      const pCount = 180;
      const pGeo = new THREE.BufferGeometry();
      const pPositions = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount * 3; i += 3) {
        pPositions[i] = (Math.random() - 0.5) * 4.5;
        pPositions[i + 1] = 2.0 + Math.random() * 1.6; // High up near roof
        pPositions[i + 2] = -4 + (Math.random() - 0.5) * 5;
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x84cc16, // Toxic yellowish-green cloud
        size: 0.22,
        transparent: true,
        opacity: 0.8
      });

      const gasCloud = new THREE.Points(pGeo, pMat);
      scene.add(gasCloud);
      gasParticlesRef.current = gasCloud;

      // Methanometer Sniffer Station
      const snifferGroup = new THREE.Group();
      snifferGroup.position.set(-1.4, 1.8, 1.0);
      const snifferBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.5, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x0284c7 })
      );
      snifferGroup.add(snifferBox);
      scene.add(snifferGroup);

    } else {
      // Fire & Explosion Scene:
      // Active Fire particles at inbye face
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
        color: 0xf97316, // Fiery orange / red
        size: 0.28,
        transparent: true,
        opacity: 0.95
      });

      const fireParticles = new THREE.Points(fGeo, fMat);
      scene.add(fireParticles);
      fireParticlesRef.current = fireParticles;

      // Stone Dust Explosion Barrier Shelf near roof
      const shelfGroup = new THREE.Group();
      shelfGroup.position.set(0, 3.5, 1.5);
      const shelfBar = new THREE.Mesh(
        new THREE.BoxGeometry(4.6, 0.1, 0.8),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 })
      );
      shelfGroup.add(shelfBar);
      scene.add(shelfGroup);
      stoneDustShelfRef.current = shelfGroup;

      // Explosion-Proof Blast Steel Door (Swings shut)
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

    // Interactive mouse rotation
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

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Flashing alert light
      if (warningLightRef.current) {
        warningLightRef.current.intensity = Math.sin(elapsed * 6) > 0 ? 3.5 : 0.5;
      }

      // Gas particles movement
      if (gasParticlesRef.current) {
        const pos = gasParticlesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < pos.length; i += 3) {
          pos[i + 1] += Math.sin(elapsed * 2 + i) * 0.005;
        }
        gasParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Fire particles dancing
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
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current?.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [drillType, isARMode]);

  // AR Camera toggle
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
        setArError('Camera access unavailable. Rendering 3D underground mine model.');
      }
    } else {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
      setIsARMode(false);
    }
  };

  // Gas Leak Action Handler
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
        gasParticlesRef.current.material.opacity = 0.15; // Gas cloud diluted
      }
      setToastMessage('💨 Ventilation curtain deployed! Fresh intake air diluted methane to 0.4%.');
    } else if (stepKey === 'evacuate') {
      setGasSteps(prev => ({ ...prev, evacuate: true }));
      setToastMessage(t.gasPassedToast);
      confetti({ particleCount: 90, spread: 70 });
      if (onDrillComplete) onDrillComplete('gas');
    }
  };

  // Fire Action Handler
  const handleFireStep = (stepKey) => {
    if (stepKey === 'stonedust') {
      setFireSteps(prev => ({ ...prev, stonedust: true }));
      // Tilt stone dust shelf
      if (stoneDustShelfRef.current) {
        stoneDustShelfRef.current.rotation.x = 0.8;
      }
      setToastMessage('🌪️ Stone dust barrier discharged! Explosion flame propagation arrested.');
    } else if (stepKey === 'deluge') {
      setFireSteps(prev => ({ ...prev, deluge: true }));
      setTemperatureC(32);
      if (fireParticlesRef.current) {
        fireParticlesRef.current.material.opacity = 0.2; // Flame smothered
      }
      setToastMessage('🧯 High-expansion foam blanket sprayed over burning coal face!');
    } else if (stepKey === 'firedoor') {
      setFireSteps(prev => ({ ...prev, firedoor: true }));
      // Swing blast door shut
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
    if (!selectedMine) return 'Jharia Coalfield';
    if (selectedLang === 'hi') return selectedMine.nameHi;
    if (selectedLang === 'sat') return selectedMine.nameSat;
    return selectedMine.name;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
      {/* Simulation Top Bar */}
      <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              3D MINE HAZARD SIMULATOR
            </span>
            <span className="text-xs text-slate-400 font-medium">Colliery: <strong className="text-white">{getMineName()}</strong></span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white mt-1">
            {drillType === 'gas' ? t.gasLeakTitle : t.fireTitle}
          </h2>
        </div>

        {/* Hazard Selector & AR Mode */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Switch Drill Toggle */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => {
                setDrillType('gas');
                setToastMessage('Underground Methanometer alert: Hazardous gas inrush detected!');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                drillType === 'gas'
                  ? 'bg-lime-600 text-white shadow-md shadow-lime-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wind size={13} />
              <span>{t.navGasLeak}</span>
              {isGasComplete && <Check size={12} className="text-emerald-300" />}
            </button>

            <button
              onClick={() => {
                setDrillType('fire');
                setToastMessage('Active spontaneous combustion fire detected! Trigger explosion barrier!');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                drillType === 'fire'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame size={13} />
              <span>{t.navFireExplosion}</span>
              {isFireComplete && <Check size={12} className="text-emerald-300" />}
            </button>
          </div>

          <button
            onClick={toggleARMode}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isARMode
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Camera size={14} />
            <span>{isARMode ? 'Exit AR' : '3D / WebAR'}</span>
          </button>
        </div>
      </div>

      {/* 3D Viewport & Checklist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: 3D Canvas */}
        <div className="lg:col-span-8 relative bg-slate-950 min-h-[500px] flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover z-0 ${isARMode ? 'block' : 'hidden'}`}
          />

          <div ref={mountRef} className="w-full h-[520px] relative z-10 cursor-grab active:cursor-grabbing" />

          {/* Dynamic Mine Telemetry HUD */}
          <div className="absolute top-4 left-4 z-20 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-xl p-3 shadow-2xl text-xs space-y-1.5 min-w-[190px]">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Gauge size={13} className="text-cyan-400" />
              <span>Underground Telemetry</span>
            </div>

            {drillType === 'gas' ? (
              <div className="space-y-1 pt-1 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.methaneLevel}:</span>
                  <span className={`font-bold ${methanePercent > 2 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                    {methanePercent}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.coLevel}:</span>
                  <span className={`font-bold ${coPPM > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {coPPM} PPM
                  </span>
                </div>
                <div className="pt-1 border-t border-slate-800 text-[10px]">
                  <span className={`font-bold ${methanePercent > 2 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {methanePercent > 2 ? t.gasHazard : t.gasSafe}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-1 pt-1 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.tempLevel}:</span>
                  <span className={`font-bold ${temperatureC > 50 ? 'text-orange-400 animate-pulse' : 'text-emerald-400'}`}>
                    {temperatureC}°C
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Dust Flame Index:</span>
                  <span className={`font-bold ${fireSteps.deluge ? 'text-emerald-400' : 'text-red-400'}`}>
                    {fireSteps.deluge ? '0.04 (Suppressed)' : '0.88 (Critical)'}
                  </span>
                </div>
                <div className="pt-1 border-t border-slate-800 text-[10px]">
                  <span className={`font-bold ${temperatureC > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {temperatureC > 50 ? t.fireDanger : t.fireSafe}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Helper Notice */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <RotateCw size={12} className="animate-spin text-cyan-400" />
            <span>Click & Drag to rotate 3D colliery tunnel view</span>
          </div>

          {/* Audio supervisor feed */}
          <div className="absolute bottom-4 right-4 max-w-sm z-20 bg-slate-900/90 backdrop-blur border border-cyan-500/30 rounded-xl p-3 shadow-xl text-xs text-slate-200">
            <div className="font-semibold text-cyan-400 flex items-center gap-1.5 mb-1">
              <Radio size={13} className="animate-pulse" />
              <span>Colliery Overman Safety Audio:</span>
            </div>
            <p>{toastMessage}</p>
          </div>
        </div>

        {/* Right: Interactive Checklist HUD */}
        <div className="lg:col-span-4 p-5 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                <span>{drillType === 'gas' ? 'Gas Inrush Protocol' : 'Fire Suppression Protocol'}</span>
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
                {/* Step 1: Sniffer */}
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

                {/* Step 2: SCSR */}
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

                {/* Step 3: Vent */}
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

                {/* Step 4: Evacuate */}
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
                {/* Step 1: Stone dust */}
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

                {/* Step 2: Deluge foam */}
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

                {/* Step 3: Fire door */}
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

                {/* Step 4: Refuge chamber */}
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
                Complete the 4 emergency drill steps above to unlock the Competency Assignment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

