# Kavachar (कवच / ᱠᱚᱵᱚᱪ) — PS-41 Mine Safety & AR Disaster Simulator

> **Government of Jharkhand • Department of Mines & Geology (झारखंड सरकार)**  
> **Directorate General of Mines Safety (DGMS) • Dhanbad, Jharkhand**  
> _Statutory Compliance: Coal Mines Regulations (CMR 2017)_

**Kavachar** is a next-generation underground mining safety and disaster response platform tailored specifically for the coal and mineral mining workforce of **Jharkhand**. It features trilingual accessibility (**English, Hindi, Santali**), colliery hazard mapping for Jharkhand coalfields, realistic 3D simulation videos, interactive Three.js drills for **Methane Gas Inrush** and **Coal Dust Fire Explosions**, and verifiable DGMS digital certification with cryptographic QR seals.

---

## 🌟 Key Features & Workflow

```
Step 1: Choose Language (English | हिंदी | ᱥᱟᱱᱛᱟᱲᱤ Santali)
   │
   ▼
Step 2: Select Jharkhand Mine (Jharia | Bokaro | North Karanpura | Rajrappa | Jaduguda)
   │
   ▼
Step 3: Portal Selection (Miner / Worker Portal  vs  DGMS Safety Admin Portal)
   │
   ├── [Worker / Miner Panel]
   │    ├── 🎬 Realistic 3D Simulation Video (Thermal Infrared Explosion & Optical Gas Imaging)
   │    ├── 🎮 3D Interactive Drill (Methanometer, SCSR Mask, Stone-Dust Barrier, Refuge Chamber)
   │    ├── 📝 Multilingual Safety Assignment (Evaluated in chosen language)
   │    └── 📜 Government of Jharkhand DGMS Certificate (With QR Code & PDF Export)
   │
   └── [Admin / Safety Officer Panel]
        ├── 📊 Mine-by-Mine Compliance Telemetry
        ├── 🗣️ Tribal & Language Adoption Breakdown (Santali 46%, Hindi 38%, English 16%)
        └── 🔏 Master Certificate Ledger with Revocation Controls
```

---

## ⛏️ 100% Jharkhand Collieries Catalog

All training curricula and hazard configurations represent authentic mining sites across Jharkhand:

| Colliery / Mine Site                     | District        | Operating Agency | Primary Geological Hazard                                                       |
| ---------------------------------------- | --------------- | ---------------- | ------------------------------------------------------------------------------- |
| **Jharia Underground Coalfield Pit #4**  | Dhanbad         | BCCL             | Critical Degree-III Methane Inrush & Historic Spontaneous Combustion Fires      |
| **Bokaro Bermo Deep Colliery & Incline** | Bokaro          | CCL              | Deep Coking Coal Dust Explosion Risk & High Methane Emission                    |
| **North Karanpura (Pipwar Colliery)**    | Chatra / Ranchi | CCL              | Thick Seam Spontaneous Coal Heating & Toxic Carbon Monoxide ($CO$) Accumulation |
| **Rajrappa Underground Incline Project** | Ramgarh         | CCL              | Damodar Basin Water Inrush & Flammable Gas Inflow                               |
| **Jaduguda Deep Underground Shaft**      | East Singhbhum  | UCIL             | 940m Deepest Shaft in Jharkhand; Toxic Gases & Rockburst                        |

---

## 🌐 Trilingual Workforce Accessibility

Designed for tribal and regional mine workers across the Jharkhand mining belt:

- **🇬🇧 English**: Technical standard mining rules and DGMS guidelines.
- **🇮🇳 हिंदी (Hindi)**: Lingua franca across Central & Northern Indian coalfields.
- **⛏️ ᱥᱟᱱᱛᱟᱲᱤ (Santali)**: Full **Ol Chiki** native script and phonetic transliteration designed specifically for indigenous Santhal miners in Jharkhand, Odisha, and West Bengal.

---

## 🎬 Realistic 3D Simulation Videos & Interactive Drills

Trainees can switch between:

1. **🎥 Realistic 3D Simulation Video Mode**:
   - **Underground Fire & Coal Dust Explosion**: High-definition footage of underground coal dust explosion deflagration shockwaves, thermal infrared flamefront analysis, and slow-motion ($0.5\times / 1.0\times$) stone-dust barrier quenching.
   - **Underground Gas Leak**: Optical Gas Imaging (OGI) video of invisible Methane billowing from coal fissures, high-pitch Methanometer alarm sirens ($8.2\% \text{ CH}_4$, $140\text{ PPM CO}$), and SCSR mask donning in zero visibility.
2. **🎮 3D Hands-On Interactive Drill (Three.js)**:
   - Full 3D underground drift with coal walls, haulage tracks, timber props, and ventilation duct.
   - Interactive 4-step emergency checklist with real-time telemetry HUD.

---

## 📜 Government of Jharkhand DGMS Certificate

Miners who pass the competency assignment ($\ge 80\%$) automatically earn the official **Directorate General of Mines Safety (DGMS)** credential:

- Official seal of **Government of Jharkhand • Department of Mines & Geology**
- Mentions Trainee Name, Selected Jharkhand Mine, Language, and Score
- High-resolution **dynamic QR Code** linking to the public verification endpoint
- Cryptographic **SHA-256 Tamper-Proof Digital Seal**
- High-quality **PDF Download** for physical display

---

## 🚀 Running the Project Locally

### 1. Start the Platform

```bash
npm start
```

- **Local Application Link**: 👉 **[http://localhost:5000](http://localhost:5000)**
- **API Health Endpoint**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Sample Verified QR Dossier**: [http://localhost:5000/verify/c7e849b2-38b4-4b51-9318-7a523b499182](http://localhost:5000/verify/c7e849b2-38b4-4b51-9318-7a523b499182)

### 2. Run Automated Verification Tests

```bash
npm test
```

All 8 end-to-end tests validate authentication, mine tracking, 3D simulation submissions, multilingual evaluation, and cryptographic QR verification.

---

## ☁️ Deployment on Netlify

This repository is pre-configured with `netlify.toml` and SPA `_redirects`:

1. **GitHub Repository**: 👉 **[https://github.com/pardhasai000/kavachar](https://github.com/pardhasai000/kavachar)**
2. **1-Click Netlify Deploy**: 👉 **[Deploy Kavachar to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/pardhasai000/kavachar)**
3. When connected, any push to `main` automatically triggers Netlify continuous deployment!

---

## 👥 Demo Personas

| Persona                        | Role                                 | Default Account                          |
| ------------------------------ | ------------------------------------ | ---------------------------------------- |
| **Dr. V. K. Sharma**           | Director General (Admin)             | `admin@safety.gov.in` / `admin123`       |
| **Rajesh Kumar / Bablu Soren** | Coalface Miner (Worker)              | `rajesh.kumar@plant.in` / `worker123`    |
| **Er. Ananya Patil**           | Colliery Safety Inspector (Verifier) | `inspector.patil@audit.org` / `audit123` |

---

_Developed for the Government of Jharkhand Department of Mines & Geology under Problem Statement 41 (PS-41)._
