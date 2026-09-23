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
  Eye, 
  Sliders 
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
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoTime, setVideoTime] = useState(0); // 0 to 30 seconds
  const [visionMode, setVisionMode] = useState('thermal'); // 'normal' | 'thermal' | 'ogi'

  // Canvas ref for Realistic 3D Simulation Video Render
  const videoCanvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const sirenOscRef = useRef(null);

  // Three.js interactive mode refs
  const mountRef = useRef(null);
  const videoRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const gasParticlesRef = useRef(null);
  const fireParticlesRef = useRef(null);
  const stoneDustShelfRef = useRef(null);
  const blastDoorRef = useRef(null);
  const warningLightRef = useRef(null);

  // AR Camera toggle
  const [isARMode, setIsARMode] = useState(false);

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

  // Video progress timer loop
  useEffect(() => {
    let interval;
    if (viewMode === 'video' && isPlaying) {
      interval = setInterval(() => {
        setVideoTime(prev => {
          const next = prev + 0.25 * playbackSpeed;
          if (next >= 30) return 0;
          return next;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [viewMode, isPlaying, playbackSpeed]);

  // Web Audio Alarm Siren synthesizer
  useEffect(() => {
    if (!isMuted && isPlaying && viewMode === 'video') {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';

        // Modulate frequency to create an emergency siren wavering tone
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(1100, now + 0.6);
        osc.frequency.linearRampToValueAtTime(600, now + 1.2);

        gain.gain.setValueAtTime(0.08, now);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        sirenOscRef.current = { osc, gain };

        const sirenInterval = setInterval(() => {
          if (!audioContextRef.current) return;
          const t = audioContextRef.current.currentTime;
          osc.frequency.setValueAtTime(600, t);
          osc.frequency.linearRampToValueAtTime(1100, t + 0.6);
          osc.frequency.linearRampToValueAtTime(600, t + 1.2);
        }, 1200);

        return () => {
          clearInterval(sirenInterval);
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        };
      } catch (err) {
        console.warn('Web Audio not allowed without interaction');
      }
    } else {
      if (sirenOscRef.current) {
        try {
          sirenOscRef.current.osc.stop();
          sirenOscRef.current.osc.disconnect();
        } catch (e) {}
        sirenOscRef.current = null;
      }
    }
  }, [isMuted, isPlaying, viewMode]);

  // ==========================================
  // REALISTIC 3D VIDEO SIMULATION ENGINE (CANVAS)
  // ==========================================
  useEffect(() => {
    if (viewMode !== 'video') return;
    const canvas = videoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let frameCount = 0;

    // Particle caches
    const sparks = Array.from({ length: 90 }, () => ({
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 12,
      size: Math.random() * 3.5 + 1.5,
      life: Math.random() * 50
    }));

    const smokePlumes = Array.from({ length: 45 }, (_, i) => ({
      x: 200 + Math.random() * 400,
      y: 150 + Math.random() * 150,
      radius: 30 + Math.random() * 60,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: -Math.random() * 1.2 - 0.4,
      opacity: Math.random() * 0.5 + 0.3
    }));

    const gasVapors = Array.from({ length: 60 }, () => ({
      x: Math.random() * 800,
      y: 80 + Math.random() * 180,
      radius: 40 + Math.random() * 80,
      alpha: Math.random() * 0.4 + 0.2,
      drift: Math.random() * 1.2 + 0.4
    }));

    const render = () => {
      animId = requestAnimationFrame(render);
      frameCount++;

      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear background
      ctx.fillStyle = '#06080e';
      ctx.fillRect(0, 0, width, height);

      // Camera Shake calculation during explosion or high inrush
      let shakeX = 0;
      let shakeY = 0;
      if (drillType === 'fire' && videoTime >= 5 && videoTime <= 16) {
        const shakeMag = (16 - videoTime) * 1.2;
        shakeX = (Math.random() - 0.5) * shakeMag;
        shakeY = (Math.random() - 0.5) * shakeMag;
      }
      ctx.save();
      ctx.translate(shakeX, shakeY);

      // 2. Render 3D Perspective Mine Gallery Tunnel Walls
      const cx = width / 2;
      const cy = height / 2 - 20;

      // Vanishing point perspective lines (Mine rails & timber props)
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;

      // Roof & Floor boundary
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(cx, cy);
      ctx.lineTo(width, 0);
      ctx.moveTo(0, height);
      ctx.lineTo(cx, cy);
      ctx.lineTo(width, height);
      ctx.stroke();

      // Coal Tunnel Track Rails
      ctx.strokeStyle = '#52525b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy + 30);
      ctx.lineTo(cx - 140, height);
      ctx.moveTo(cx + 20, cy + 30);
      ctx.lineTo(cx + 140, height);
      ctx.stroke();

      // Rail Sleepers
      for (let y = cy + 40; y < height; y += (y - cy) * 0.28 + 10) {
        const span = (y - cy) * 0.9;
        ctx.strokeStyle = '#3f3f46';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - span, y);
        ctx.lineTo(cx + span, y);
        ctx.stroke();
      }

      // Timber Pit Props along the gallery walls
      const timberLevels = [0.2, 0.45, 0.72, 1.0];
      timberLevels.forEach((lvl, idx) => {
        const topY = cy - (cy * lvl);
        const botY = cy + ((height - cy) * lvl);
        const leftX = cx - (cx * lvl);
        const rightX = cx + (cx * lvl);

        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 6 * lvl + 2;

        // Left timber post
        ctx.beginPath();
        ctx.moveTo(leftX, topY);
        ctx.lineTo(leftX, botY);
        ctx.stroke();

        // Right timber post
        ctx.beginPath();
        ctx.moveTo(rightX, topY);
        ctx.lineTo(rightX, botY);
        ctx.stroke();

        // Overhead timber crossbar
        ctx.beginPath();
        ctx.moveTo(leftX, topY);
        ctx.lineTo(rightX, topY);
        ctx.stroke();
      });

      // 3. HAZARD SCENE RENDERING:
      if (drillType === 'fire') {
        // ===================================
        // FIRE & COAL DUST EXPLOSION SCENE
        // ===================================
        const progress = videoTime; // 0 to 30

        // Phase 1: Ignition & Blast Wave (0 to 14s)
        if (progress < 18) {
          // Dynamic Fireball Core expanding from the heading (cx, cy)
          const blastRadius = Math.min(260, 40 + progress * 16);
          const fireGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, blastRadius);

          if (visionMode === 'thermal') {
            // Thermal Infrared color palette (White hot -> yellow -> magenta -> deep blue)
            fireGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
            fireGrad.addColorStop(0.2, 'rgba(254, 240, 138, 0.92)');
            fireGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.85)');
            fireGrad.addColorStop(0.8, 'rgba(168, 85, 247, 0.65)');
            fireGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
          } else {
            // Realistic visible combustion (Yellow core -> Orange flame -> Dark soot)
            fireGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
            fireGrad.addColorStop(0.25, 'rgba(251, 146, 60, 0.92)');
            fireGrad.addColorStop(0.65, 'rgba(220, 38, 38, 0.85)');
            fireGrad.addColorStop(0.9, 'rgba(30, 27, 24, 0.7)');
            fireGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          }

          ctx.fillStyle = fireGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, blastRadius, 0, Math.PI * 2);
          ctx.fill();

          // Explosive Shockwave Distortion Rings
          ctx.strokeStyle = 'rgba(254, 215, 170, 0.6)';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(cx, cy, blastRadius * 1.15, 0, Math.PI * 2);
          ctx.stroke();

          // Flying Coal Sparks & Burning Embers
          sparks.forEach(s => {
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.15; // Gravity
            if (s.y > height - 30 || s.x < 0 || s.x > width) {
              s.x = cx + (Math.random() - 0.5) * 60;
              s.y = cy + (Math.random() - 0.5) * 40;
              s.vx = (Math.random() - 0.5) * 16;
              s.vy = (Math.random() - 0.8) * 12;
            }

            ctx.fillStyle = '#fde047';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        // Phase 2: Stone-Dust Explosion Barrier Deployment (14s to 24s)
        if (progress >= 12 && progress < 24) {
          // Cascading incombustible limestone stone-dust cloud
          ctx.fillStyle = 'rgba(241, 245, 249, 0.75)';
          for (let i = 0; i < 30; i++) {
            const dustX = cx + (Math.sin(i * 13 + frameCount * 0.05) * 220);
            const dustY = cy - 60 + ((frameCount * 3 + i * 20) % 280);
            ctx.beginPath();
            ctx.arc(dustX, dustY, 25 + (i % 15), 0, Math.PI * 2);
            ctx.fill();
          }

          // Stone dust banner indicator
          ctx.fillStyle = '#0284c7';
          ctx.fillRect(cx - 150, 60, 300, 30);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('STONE-DUST BARRIER ARRESTING FLAME', cx, 80);
        }

        // Phase 3: Foam Deluge & Refuge Chamber Secure (24s to 30s)
        if (progress >= 22) {
          // Thick foam suppression blanket on floor
          ctx.fillStyle = 'rgba(226, 232, 240, 0.85)';
          ctx.beginPath();
          ctx.ellipse(cx, height - 70, 260, 60, 0, 0, Math.PI * 2);
          ctx.fill();

          // Refuge Chamber door sealed notice
          ctx.fillStyle = '#16a34a';
          ctx.fillRect(cx - 160, cy - 30, 320, 45);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 13px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('REFUGE CHAMBER SEALED • 48H LIFE SUPPORT', cx, cy - 2);
        }

      } else {
        // ===================================
        // GAS LEAK & METHANE INRUSH SCENE
        // ===================================
        const progress = videoTime;

        // Coal Roof Fissure with Gas Inrush Plumes
        const fissureX = cx - 40;
        const fissureY = 70;

        // Fissure crack
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(fissureX - 60, fissureY);
        ctx.lineTo(fissureX, fissureY + 15);
        ctx.lineTo(fissureX + 70, fissureY - 10);
        ctx.stroke();

        // Optical Gas Imaging (OGI) Turbulent Gas Plumes
        gasVapors.forEach((gv, idx) => {
          gv.y += Math.sin(frameCount * 0.05 + idx) * 0.4;
          gv.x += gv.drift * 0.8;
          if (gv.x > width + 50) gv.x = fissureX - 30;

          const gasGrad = ctx.createRadialGradient(gv.x, gv.y, 5, gv.x, gv.y, gv.radius);
          if (visionMode === 'thermal') {
            // Optical gas false-color thermal palette
            gasGrad.addColorStop(0, 'rgba(163, 230, 53, 0.7)');
            gasGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.45)');
            gasGrad.addColorStop(1, 'rgba(30, 41, 59, 0)');
          } else {
            // Semi-visible vapor plume
            gasGrad.addColorStop(0, 'rgba(190, 242, 100, 0.5)');
            gasGrad.addColorStop(0.6, 'rgba(132, 204, 22, 0.25)');
            gasGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          }

          ctx.fillStyle = gasGrad;
          ctx.beginPath();
          ctx.arc(gv.x, gv.y, gv.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Optical Gas Crosshair Scanner tracking methane accumulation
        const scanX = cx + Math.sin(frameCount * 0.04) * 120;
        const scanY = 120 + Math.cos(frameCount * 0.03) * 40;

        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(scanX - 25, scanY - 25, 50, 50);
        ctx.beginPath();
        ctx.moveTo(scanX - 35, scanY);
        ctx.lineTo(scanX + 35, scanY);
        ctx.moveTo(scanX, scanY - 35);
        ctx.lineTo(scanX, scanY + 35);
        ctx.stroke();

        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`CH4: ${(8.2 - (progress > 18 ? 7.6 : 0)).toFixed(1)}% VOL`, scanX + 30, scanY - 10);

        // If SCSR Mask Donned (after 10s), draw SCSR visor overlay HUD
        if (progress >= 10) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 4;
          ctx.strokeRect(20, 20, width - 40, height - 40);

          ctx.fillStyle = 'rgba(14, 165, 233, 0.15)';
          ctx.fillRect(25, 25, 180, 55);

          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 11px monospace';
          ctx.fillText('SCSR RESPIRATOR: ON', 35, 45);
          ctx.fillText('OXYGEN PURITY: 99.4%', 35, 65);
        }

        // Fresh Air Brattice Curtain Deployment (after 20s)
        if (progress >= 18) {
          ctx.fillStyle = '#059669';
          ctx.fillRect(cx - 150, cy + 40, 300, 30);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('VENTILATION BRATTICE DILUTING TOXIC GAS', cx, cy + 60);
        }
      }

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [viewMode, drillType, isPlaying, videoTime, playbackSpeed, visionMode]);

  // Three.js Interactive Scene
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
            /* 1. Realistic 3D Simulation Video Player Component (Self-Contained 60FPS Canvas) */
            <div className="w-full h-full min-h-[520px] relative bg-black flex flex-col justify-between overflow-hidden">
              {/* Canvas Rendering Surface */}
              <canvas
                ref={videoCanvasRef}
                width={860}
                height={520}
                className="w-full h-full object-cover absolute inset-0 z-0"
              />

              {/* Dynamic Telemetry HUD Overlay */}
              <div className="relative z-10 m-4 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl p-3 shadow-2xl text-xs space-y-1.5 max-w-[220px]">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Gauge size={13} className="text-cyan-400" />
                  <span>DGMS Telemetry HUD</span>
                </div>

                {drillType === 'fire' ? (
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Heading Temp:</span>
                      <span className="font-bold text-orange-400 animate-pulse">{temperatureC}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Blast Pressure:</span>
                      <span className="font-bold text-red-400">5.2 Bar (Shockwave)</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800 text-[10px] text-orange-400 font-bold">
                      {t.fireDanger}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">CH4 Inrush:</span>
                      <span className="font-bold text-red-400 animate-pulse">{methanePercent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CO Poisoning:</span>
                      <span className="font-bold text-red-400">{coPPM} PPM</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800 text-[10px] text-red-400 font-bold">
                      {t.gasHazard}
                    </div>
                  </div>
                )}
              </div>

              {/* Top-Right Vision Mode & Audio Controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => setVisionMode(visionMode === 'thermal' ? 'normal' : 'thermal')}
                  className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 shadow-lg backdrop-blur cursor-pointer hover:bg-slate-900"
                >
                  <Eye size={13} className="text-cyan-400" />
                  <span>{visionMode === 'thermal' ? 'Thermal Vision (ON)' : 'Standard Vision'}</span>
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur cursor-pointer transition ${
                    !isMuted 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-slate-950/90 border border-slate-700 text-slate-300 hover:bg-slate-900'
                  }`}
                  title={isMuted ? 'Turn Alarm Siren Sound ON' : 'Mute Siren'}
                >
                  {!isMuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </button>
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
                    title="Replay from 00:00"
                  >
                    <RefreshCw size={14} />
                  </button>

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
                  <div 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                      setVideoTime(ratio * 30);
                    }}
                    className="w-full bg-slate-800 rounded-full h-2 relative overflow-hidden cursor-pointer"
                  >
                    <div 
                      className="bg-gradient-to-r from-red-500 via-orange-500 to-cyan-500 h-2 rounded-full transition-all duration-200"
                      style={{ width: `${(videoTime / 30) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>00:{Math.floor(videoTime).toString().padStart(2, '0')}</span>
                    <span className="text-cyan-400">
                      {drillType === 'fire' 
                        ? (videoTime < 12 ? 'Phase: Coal Dust Deflagration' : videoTime < 22 ? 'Phase: Stone-Dust Barrier Discharge' : 'Phase: Refuge Chamber Sealing')
                        : (videoTime < 10 ? 'Phase: Methane Gas Roof Inrush' : videoTime < 20 ? 'Phase: SCSR Chemical Mask Donning' : 'Phase: Intake Airway Dilution')}
                    </span>
                    <span>Disaster Timeline: 00:30</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  <span className="text-emerald-400 font-bold">1080p 60FPS 3D Render</span>
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
          <div className="absolute top-16 right-4 z-20 max-w-xs bg-slate-950/90 backdrop-blur border border-cyan-500/30 rounded-xl p-3 shadow-xl text-xs text-slate-200 hidden md:block">
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
