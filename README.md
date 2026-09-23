# PS-41: AR-Powered Worker Training, Assessment, Certification & QR Verification Platform

> **Problem Statement 41 (PS 41)**: An end-to-end industrial safety training and regulatory compliance platform featuring role-based portals (Admin, Trainee/Worker, Verifier), interactive 3D/WebAR emergency drills, automated examination grading, instant tamper-evident certificate issuance, and cryptographic QR verification.

---

## 🌟 Core Pillars Mapped to PS 41

```
PS 41
│
├── 1. User Requirements
│   ├── Admin (Regulatory oversight, curriculum authoring, audit logs)
│   ├── Worker/Trainee (Interactive SOPs, 3D/AR drill, competency exams, credential wallet)
│   └── Verifier (Mobile QR scanner & cryptographic audit terminal)
│
├── 2. Core Features
│   ├── Registration & 1-Click Demo Login (Admin, Worker, Verifier)
│   ├── Interactive Training Curricula (SOP protocols, ISO 45001 & Factories Act)
│   ├── 3D / WebAR Simulation (Three.js real-time hazards, pressure telemetry, emergency valves)
│   ├── Competency Assessment (Timed examinations, instant evaluation)
│   ├── Certificate Generation (High-res canvas/PDF, dynamic QR, SHA-256 seal)
│   └── QR Verification (Public portal, in-browser camera scanning, tamper detection)
│
├── 3. Admin Portal
│   ├── Real-Time KPI Telemetry Dashboard
│   ├── Trainee & Operator Registry
│   ├── Training Modules & Simulation Scenarios Management
│   ├── Master Certificate Registry (Revocation & Reinstatement)
│   └── Regulatory Compliance Audit Trail
│
├── 4. Worker/Trainee Portal
│   ├── Trainee Profile & Safety Readiness Index
│   ├── Training Modules with SOP Documentation
│   ├── 3D / WebAR Emergency Steam Valve & Incident Drill
│   ├── Automated Competency Examination
│   ├── Instant Evaluation & Scorecard
│   └── Digital Safety Credential Wallet (Print & PDF Export)
│
├── 5. Backend
│   ├── JWT Authentication & Role-Based Access Control (RBAC)
│   ├── RESTful APIs for Modules, Simulations, Exams, and Audits
│   ├── SQLite Database (WAL mode, relational integrity)
│   ├── In-Memory & File Storage for 3D assets & credentials
│   └── SHA-256 Cryptographic QR Verification Engine
│
└── 6. End-to-End Demo
    Admin Setup → Worker SOP → 3D Simulation Drill → Exam
    → Certificate Issuance → QR Scan → Real-Time Verification
```

---

## 🚀 Quick Start & Running the Project

### 1. Run the Full-Stack Application

To start the unified production server (serves both API & React UI):

```bash
npm start
```

- **Application URL**: `http://localhost:5000`
- **Public Verification Endpoint**: `http://localhost:5000/verify/:certId`
- **Backend API**: `http://localhost:5000/api`

### 2. Development Mode (with Hot Reloading)

In two separate terminals:

```bash
# Terminal 1: Start Backend API
npm run server

# Terminal 2: Start Vite Client
npm run client
```

Access the client at `http://localhost:3000`.

### 3. Run Automated Tests

```bash
npm test
```

---

## 👥 Demo Personas (1-Click Switcher)

| Persona                    | Role                            | Default Account                          |
| -------------------------- | ------------------------------- | ---------------------------------------- |
| **Dr. Vikram Sharma**      | Director General (Admin)        | `admin@safety.gov.in` / `admin123`       |
| **Rajesh Kumar**           | Machine Operator (Worker)       | `rajesh.kumar@plant.in` / `worker123`    |
| **Inspector Ananya Patil** | Chief Safety Auditor (Verifier) | `inspector.patil@audit.org` / `audit123` |

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide Icons, Three.js (3D & WebAR engine), `html5-qrcode` (camera QR scanning), `jspdf` & `html2canvas` (PDF generation).
- **Backend**: Node.js, Express, `better-sqlite3` (SQLite engine), `jsonwebtoken`, `qrcode`, `crypto` (SHA-256 hashing).
