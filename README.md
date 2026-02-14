# MedAI - Universal Digital Healthcare Platform 🏥

> **Privacy-first, consent-driven digital health ecosystem bridging healthcare access gaps across India**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://medaiii.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-3ecf8e)](https://supabase.com/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution Architecture](#-solution-architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Security](#-security--privacy)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🌟 Overview

**MedAI** is a production-ready, open-source digital health platform designed to democratize healthcare access in India. It provides a complete healthcare ecosystem with:

- **Universal Health ID** - Aadhaar-linked unique identifier for seamless healthcare delivery
- **Doctor Authentication** - Secure verification system for healthcare providers
- **Medical History Access** - Consent-driven, secure access to complete patient records
- **Government Integration** - Ayushman Bharat eligibility checking & scheme discovery
- **Role-Based Access Control** - Patient, Doctor, and Admin dashboards
- **Emergency Services** - Location-based hospital routing with consent overrides

Built with scalability, security, and accessibility as core principles, MedAI bridges the gap between patients, doctors, government schemes, and healthcare providers.

**🔗 Live Demo:** [https://medaiii.vercel.app](https://medaiii.vercel.app)

---

## 🎯 Problem Statement

### Healthcare Challenges in India

1. **Fragmented Medical Records** 
   - Patients carry physical files across hospitals
   - No unified system for medical history tracking
   - Critical information lost during emergencies

2. **Authentication & Trust Deficit**
   - Difficulty verifying legitimate healthcare providers
   - Fake doctors and credential fraud
   - No standardized verification system

3. **Government Scheme Awareness**
   - Low awareness of Ayushman Bharat and health schemes
   - Complex eligibility criteria and application processes
   - Lack of accessible information for rural populations

4. **Access Barriers**
   - Limited digital literacy
   - Language barriers
   - No unified patient identifier

5. **Privacy & Security Concerns**
   - Unauthorized access to medical records
   - No consent management system
   - Data breaches and misuse

### Our Mission

Create a **privacy-first, accessible, consent-driven** digital health ecosystem that:
- Empowers patients with data ownership
- Enables seamless care coordination
- Bridges urban-rural healthcare divide
- Integrates with government initiatives
- Maintains security & compliance standards

---

## 🏗️ Solution Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Patient    │  │    Doctor    │  │    Admin     │          │
│  │  Dashboard   │  │  Dashboard   │  │  Dashboard   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                            │                                     │
│                   ┌────────▼────────┐                           │
│                   │  React Router   │                           │
│                   │  State Mgmt     │                           │
│                   └────────┬────────┘                           │
└────────────────────────────┼──────────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                      API/SERVICE LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │   Supabase   │  │   Express    │  │   External APIs  │    │
│  │  Auth & RLS  │  │   Backend    │  │  (Maps, ABDM)    │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────────┘    │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼──────────────┐
│                      DATA LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  PostgreSQL  │  │   MongoDB    │  │  File Storage│        │
│  │  (Supabase)  │  │  (Optional)  │  │  (Supabase)  │        │
│  │  + RLS       │  │              │  │              │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└───────────────────────────────────────────────────────────────┘
```

### Architecture Principles

1. **Privacy by Design**
   - Aadhaar never stored in full (hashed with salt)
   - Row-Level Security (RLS) at database level
   - Consent management for all data access
   - Audit trails for sensitive operations

2. **Scalable Microservices**
   - Frontend-first architecture for rapid iteration
   - Optional backend modules for specialized services
   - API-first design for future integrations
   - Horizontal scaling capability

3. **Security Layers**
   - Authentication: Supabase Auth (JWT tokens)
   - Authorization: Role-based access control (RBAC)
   - Data Isolation: PostgreSQL RLS policies
   - Transport: HTTPS/TLS encryption
   - Storage: Encrypted at rest

4. **Accessibility & Inclusivity**
   - Mobile-first responsive design
   - Multi-language support (i18n ready)
   - Low-literacy friendly UI/UX
   - Progressive Web App (PWA) capabilities

### Data Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Patient │────────▶│  Health  │────────▶│  Doctor  │
│  Uploads │         │    ID    │         │  Views   │
│  Record  │         │  System  │         │  Record  │
└──────────┘         └──────────┘         └──────────┘
     │                     │                     │
     │                     ▼                     │
     │              ┌──────────────┐             │
     │              │   Consent    │             │
     └─────────────▶│  Management  │◀────────────┘
                    │    Layer     │
                    └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Encrypted   │
                    │   Storage    │
                    │   (Supabase) │
                    └──────────────┘
```

---

## ✨ Key Features

## ✨ Key Features

### 🆔 Universal Health ID System
- **Aadhaar Integration** - Secure linking with government ID
- **Privacy-First Storage** - Only hashed values stored, last-4 digits displayed
- **QR Code Generation** - Quick access for healthcare providers
- **Cross-Platform Access** - Web and mobile compatibility
- **Unique Patient Identification** - Eliminates duplicate records

### 👨‍⚕️ Doctor Authentication & Verification
- **Credential Verification** - Medical council registration checks
- **License Validation** - Automated verification workflows
- **Profile Management** - Practice details, specializations, availability
- **Digital Signature** - Secure prescription signing
- **Trust Badges** - Verified doctor indicators

### 📋 Medical History Management
- **Secure Document Upload** - Prescriptions, reports, scan imaging
- **Consent-Driven Sharing** - Patient-controlled access permissions
- **Version Control** - Track document updates and modifications
- **OCR Integration** - Extract data from physical documents
- **Download & Export** - PDF generation for offline access

### 🏛️ Government Integration
- **Ayushman Bharat Eligibility** - Real-time scheme checking
- **Jan Aushadhi Locator** - Find affordable medicine stores
- **Government Schemes Discovery** - State and central health programs
- **ABDM Integration** - Ready for National Digital Health Mission
- **CoWIN Sync** - Vaccination certificate import

### 👥 Role-Based Dashboards

**Patient Dashboard:**
- View health records and history
- Book appointments with verified doctors
- Track vaccinations and medications
- Emergency SOS with location sharing
- Scheme eligibility checker

**Doctor Dashboard:**
- Patient lookup by Health ID
- Access granted medical records
- Appointment scheduling
- Prescription management
- Analytics and insights

**Admin Dashboard:**
- User management and verification
- System health monitoring
- Audit log reviews
- Analytics and reports
- Scheme management

### 🚨 Emergency Features
- **Location-Based Hospital Finder** - Nearest emergency facilities
- **Direct Call Integration** - One-tap emergency contacts
- **Consent Override** - Emergency access protocols
- **Real-Time Bed Availability** - Live hospital capacity data
- **Ambulance Routing** - Optimal path calculation

### 📱 Progressive Web App (PWA)
- **Offline Access** - Core features work without internet
- **Mobile Install** - Add to home screen capability
- **Push Notifications** - Appointment reminders, alerts
- **Fast Loading** - Optimized performance
- **Low Data Usage** - Efficient data management

### 🌐 Accessibility & Inclusivity
- **Multi-Language Support** - Hindi, English, regional languages
- **Low-Literacy UI** - Visual workflows, audio assistance
- **Screen Reader Compatible** - WCAG 2.1 AA compliant
- **Responsive Design** - Works on all device sizes
- **High Contrast Mode** - Accessibility options

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.x | UI framework |
| **TypeScript** | 5.x | Type safety & developer experience |
| **Vite** | 5.x | Build tool & dev server |
| **React Router** | 6.x | Client-side routing |
| **TanStack Query** | 5.x | Server state management |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Shadcn/ui** | Latest | Component library |
| **Radix UI** | Latest | Accessible primitives |
| **Lucide React** | Latest | Icon system |
| **React Hook Form** | Latest | Form management |
| **Zod** | Latest | Schema validation |
| **date-fns** | Latest | Date utilities |

### Backend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Supabase** | Latest | PostgreSQL database + Auth |
| **Node.js** | 18+ | JavaScript runtime |
| **Express** | 4.x | REST API framework |
| **MongoDB** | 6.x | Document database (optional modules) |
| **Mongoose** | 8.x | MongoDB ODM |
| **JWT** | 9.x | Token-based authentication |
| **bcrypt** | 2.x | Password hashing |
| **Multer** | 1.x | File upload middleware |

### Infrastructure & DevOps

| Tool | Purpose |
|------|---------|
| **Vercel** | Frontend hosting & deployment |
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **GitHub Actions** | CI/CD pipelines |
| **Nginx** | Reverse proxy & load balancing |
| **PowerShell** | Automation scripts (Windows) |

### APIs & Integrations

- **Google Maps API** - Location services & routing
- **OpenStreetMap** - Alternative mapping solution
- **ABDM Sandbox** - National Digital Health Mission integration
- **CoWIN API** - Vaccination data
- **News API** - Medical news aggregation
- **SMS Gateway** - OTP and notifications

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **VS Code** - Recommended IDE
- **Postman** - API testing

---

## 🚀 Getting Started

### ⚡ Quick Start (3 Steps)

If you've integrated Vercel with Supabase, follow these steps:

#### 1️⃣ Apply Database Migration

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project → **SQL Editor** → **New Query**
3. Open `APPLY_TO_SUPABASE.sql` from this repo
4. Copy entire content → Paste → Click **RUN**
5. Wait for success message ✅

#### 2️⃣ Configure Local Environment

Run the interactive setup wizard:

```bash
npm install
npm run setup
```

Enter your Supabase credentials when prompted (get from Vercel or Supabase dashboard).

#### 3️⃣ Start Development

```bash
npm run dev
```

Visit: http://localhost:5173/auth

**✅ That's it!** Test signup/login and you're ready to develop.

---

### 📋 Detailed Installation Guide

<details>
<summary><b>Click to expand full installation steps</b></summary>

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 10.x or yarn 1.x
- **Git** ([Download](https://git-scm.com/))
- **Supabase Account** ([Sign up](https://supabase.com/))
- **Vercel Account** (optional, for deployment)

### 1. Clone Repository

```bash
git clone https://github.com/AnshXGrind/Medai-new.git
cd Medai-new
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

**Apply SQL Migration:**
- Open [Supabase SQL Editor](https://app.supabase.com/)
- Copy content from `APPLY_TO_SUPABASE.sql`
- Paste and run

**What this creates:**
- `profiles` table with RLS policies
- Auto-profile-creation trigger
- Performance indexes
- Security policies

### 4. Environment Configuration

**Option A: Interactive Wizard (Recommended)**
```bash
npm run setup
```

**Option B: Manual Setup**
Create `.env` file:
```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Get Credentials:**
- Vercel: Project → Settings → Environment Variables
- Supabase: Dashboard → Settings → API

### 5. Verify Setup

```bash
npm run check-env
```

Should show ✅ for all required variables.

### 6. Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173

</details>

---

### 🎯 Quick Commands

```bash
# Interactive setup wizard
npm run setup

# Check environment configuration
npm run check-env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Frontend + Backend:**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
cd backend-modules
npm start
```

Terminal 3 (Python Search Service - Optional):
```bash
cd backend-modules
python search_service.py
```

Or use the quick start script:
```bash
.\scripts\QUICK_SETUP.ps1
```

#### 7. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### Docker Setup (Alternative)

Run the entire stack with Docker:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
- Search Service: http://localhost:5000

### Quick Setup Script (Windows)

For a fully automated setup:

```powershell
.\scripts\QUICK_SETUP.ps1
```

This script will:
- Check prerequisites
- Install dependencies
- Create environment files
- Apply database migrations
- Start all services

---

## 📁 Project Structure

```
Medai-new/
│
├── 📂 src/                          # Frontend application source
│   ├── 📂 components/               # Reusable React components
│   │   ├── AadhaarUpload.tsx       # Aadhaar verification UI
│   │   ├── ABHAIntegration.tsx     # ABDM integration
│   │   ├── AppointmentBooking.tsx  # Appointment system
│   │   ├── DashboardSidebar.tsx    # Navigation component
│   │   ├── EmergencyRouting.tsx    # Emergency features
│   │   ├── HealthIDCard.tsx        # Health ID display
│   │   ├── HealthIDVerification.tsx # ID verification
│   │   ├── HospitalFinder.tsx      # Location-based search
│   │   └── ... (50+ components)
│   │
│   ├── 📂 pages/                    # Route page components
│   │   ├── Dashboard.tsx            # Main dashboard
│   │   ├── PatientDashboard.tsx    # Patient view
│   │   ├── DoctorDashboard.tsx     # Doctor view
│   │   ├── AdminDashboard.tsx      # Admin view
│   │   ├── Auth.tsx                 # Authentication pages
│   │   └── ...
│   │
│   ├── 📂 contexts/                 # React Context providers
│   │   ├── AuthContext.tsx          # Authentication state
│   │   ├── LanguageContext.tsx     # i18n state
│   │   └── ThemeContext.tsx        # Theme management
│   │
│   ├── 📂 hooks/                    # Custom React hooks
│   │   ├── useAuth.ts              # Authentication hook
│   │   ├── useHealthRecord.ts      # Health record operations
│   │   └── ...
│   │
│   ├── 📂 lib/                      # Utility functions
│   │   ├── utils.ts                # General utilities
│   │   ├── supabase.ts             # Supabase client
│   │   └── validators.ts           # Form validation
│   │
│   ├── 📂 integrations/             # External API integrations
│   │   ├── maps/                   # Google Maps/OSM
│   │   ├── abdm/                   # ABDM integration
│   │   └── cowin/                  # CoWIN integration
│   │
│   ├── 📂 __tests__/               # Test files
│   │   └── security.test.ts        # Security tests
│   │
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # Application entry
│   └── index.css                    # Global styles
│
├── 📂 backend-modules/              # Backend API services
│   ├── 📂 controllers/              # Business logic (to be added)
│   │   ├── authController.js       # Authentication logic
│   │   ├── healthRecordController.js
│   │   ├── appointmentController.js
│   │   └── ...
│   │
│   ├── 📂 models/                   # Database models
│   │   ├── HealthRecord.js         # Health record schema
│   │   ├── MedicineVerification.js # Medicine data model
│   │   ├── DiseaseTracker.js       # Disease tracking
│   │   └── MedicalNews.js          # News aggregation
│   │
│   ├── 📂 routes/                   # API route definitions
│   │   ├── healthRecords.js        # /api/health-records
│   │   ├── medicineChecker.js      # /api/medicine-checker
│   │   ├── medicalNews.js          # /api/medical-news
│   │   ├── diseaseTracker.js       # /api/disease-tracker
│   │   └── dashboard.js            # /api/dashboard
│   │
│   ├── 📂 middleware/               # Express middleware (to be added)
│   │   ├── auth.js                 # JWT verification
│   │   ├── roleCheck.js            # RBAC middleware
│   │   ├── rateLimiter.js          # Rate limiting
│   │   └── errorHandler.js         # Error handling
│   │
│   ├── 📂 config/                   # Configuration (to be added)
│   │   ├── database.js             # DB connection config
│   │   ├── auth.js                 # Auth config
│   │   └── constants.js            # App constants
│   │
│   ├── server.js                    # Express server
│   ├── search_service.py           # Python search microservice
│   └── package.json                # Backend dependencies
│
├── 📂 supabase/                     # Database & RLS policies
│   ├── 📂 migrations/               # SQL migration files
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_rls_policies.sql
│   │   └── ...
│   ├── 📂 functions/                # Edge functions
│   └── config.toml                  # Supabase config
│
├── 📂 docs/                         # Documentation
│   ├── ARCHITECTURE.md             # System architecture
│   ├── SECURITY.md                 # Security guidelines
│   ├── README.md                   # Documentation index
│   ├── 📂 guides/                  # How-to guides
│   ├── 📂 features/                # Feature documentation
│   └── 📂 deployment/              # Deployment guides
│
├── 📂 public/                       # Static assets
│   ├── 📂 icons/                   # PWA icons
│   ├── manifest.json               # PWA manifest
│   ├── service-worker.js           # SW for offline
│   └── robots.txt
│
├── 📂 scripts/                      # Automation scripts
│   ├── QUICK_SETUP.ps1             # One-command setup
│   ├── apply-migration.ps1         # DB migration
│   ├── health-id-check.js          # Health ID utilities
│   └── ...
│
├── 📂 shared/                       # Shared code (frontend/backend)
│   ├── 📂 config/                  # Shared configuration
│   ├── 📂 constants/               # Shared constants
│   └── 📂 services/                # Shared API services
│
├── 📂 mobile/                       # React Native app
│   ├── App.tsx                     # Mobile entry point
│   ├── 📂 src/screens/             # Mobile screens
│   └── package.json
│
├── 📂 docker/                       # Docker configuration
│   └── nginx.conf                  # Nginx config
│
├── 📂 .github/                      # GitHub configuration
│   ├── 📂 workflows/               # CI/CD workflows
│   ├── 📂 ISSUE_TEMPLATE/          # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md   # PR template
│
├── package.json                     # Frontend dependencies
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite configuration
├── tailwind.config.ts               # Tailwind config
├── docker-compose.yml              # Docker orchestration
├── .gitignore                       # Git ignore rules
├── .env.example                     # Environment template
├── LICENSE                          # MIT License
├── README.md                        # This file
└── CONTRIBUTING.md                 # Contribution guide
```

### Key Directories Explained

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `src/components/` | Reusable UI components | AadhaarUpload, HealthIDCard, EmergencyRouting |
| `src/pages/` | Route-level page components | Dashboard variants, Auth pages |
| `src/contexts/` | Global state management | AuthContext, LanguageContext |
| `backend-modules/` | API server & microservices | server.js, routes/, models/ |
| `supabase/migrations/` | Database schema & RLS | SQL migration files |
| `docs/` | Comprehensive documentation | ARCHITECTURE.md, SECURITY.md |
| `scripts/` | Automation & setup tools | QUICK_SETUP.ps1, migration scripts |

---

## 🔐 Environment Variables

## 🔐 Environment Variables

### Frontend Environment Variables (.env.local)

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Endpoints (Optional - if using separate backend)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SEARCH_SERVICE_URL=http://localhost:5000

# Google Maps (Required for hospital finder)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# ABDM Integration (Optional but recommended)
VITE_ABDM_SANDBOX_URL=https://sandbox.abdm.gov.in
VITE_ABDM_CLIENT_ID=your_abdm_client_id
VITE_ABDM_CLIENT_SECRET=your_abdm_client_secret

# Application Configuration
VITE_APP_NAME=MedAI
VITE_APP_URL=http://localhost:5173
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_PWA=true
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_ANALYTICS=false

# External Services (Optional)
VITE_SENTRY_DSN=your_sentry_dsn
VITE_ANALYTICS_ID=your_analytics_id
```

### Backend Environment Variables (backend-modules/.env)

Create a `.env` file in the `backend-modules` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# MongoDB Configuration (Required)
MONGODB_URI=mongodb://localhost:27017/medai-modules
MONGODB_DB_NAME=medai-modules

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=30d

# Supabase (for data sync)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# CORS Configuration
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf

# External APIs
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEWS_API_KEY=your_news_api_key
SMS_GATEWAY_API_KEY=your_sms_gateway_key

# Encryption
ENCRYPTION_KEY=your_32_character_encryption_key
SALT_ROUNDS=10

# Python Search Service
SEARCH_SERVICE_PORT=5000
SEARCH_SERVICE_HOST=localhost

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

### Obtaining API Keys

#### 1. Supabase Setup
1. Create account at [supabase.com](https://supabase.com/)
2. Create new project
3. Go to Settings → API
4. Copy `Project URL` and `anon/public key`
5. For backend, copy `service_role key` (keep secret!)

#### 2. Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Maps JavaScript API
3. Create credentials → API Key
4. Restrict key to your domains

#### 3. ABDM Sandbox
1. Register at [sandbox.abdm.gov.in](https://sandbox.abdm.gov.in/)
2. Follow their integration guidelines
3. Obtain client ID and secret

#### 4. MongoDB (Local or Cloud)
**Local:**
```bash
# Install MongoDB Community Edition
# Connection string: mongodb://localhost:27017/medai-modules
```

**Cloud (MongoDB Atlas):**
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Get connection string

### Security Best Practices

⚠️ **IMPORTANT:**
- Never commit `.env` files to Git
- Use different keys for development and production
- Rotate secrets regularly
- Use environment-specific configurations
- Store production secrets in secure vaults (e.g., GitHub Secrets, Vercel Environment Variables)

---

## 📡 API Documentation

### Base URLs

- **Frontend:** `http://localhost:5173` (development)
- **Backend API:** `http://localhost:3000/api`
- **Search Service:** `http://localhost:5000`
- **Supabase:** Auto-configured via client

### Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### API Endpoints

#### Health Records API

**Base Path:** `/api/health-records`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all records for authenticated user | ✅ |
| GET | `/:id` | Get specific record by ID | ✅ |
| POST | `/` | Upload new health record | ✅ |
| PUT | `/:id` | Update existing record | ✅ |
| DELETE | `/:id` | Delete record | ✅ |
| POST | `/:id/share` | Generate share token | ✅ |
| GET | `/shared/:token` | Access shared record | ❌ |

**Example: Upload Health Record**

```javascript
POST /api/health-records
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "title": "Blood Test Report",
  "description": "Annual checkup results",
  "file": <file_binary>,
  "date": "2026-02-14",
  "category": "lab_report",
  "tags": ["blood", "annual checkup"]
}

Response 201:
{
  "success": true,
  "data": {
    "id": "rec_123abc",
    "title": "Blood Test Report",
    "fileUrl": "https://storage.url/file.pdf",
    "createdAt": "2026-02-14T10:30:00Z"
  }
}
```

#### Medicine Checker API

**Base Path:** `/api/medicine-checker`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/verify` | Verify medicine authenticity | ✅ |
| GET | `/search` | Search medicine database | ✅ |
| GET | `/:id` | Get medicine details | ✅ |

**Example: Verify Medicine**

```javascript
POST /api/medicine-checker/verify
Content-Type: application/json
Authorization: Bearer <token>

{
  "barcode": "8901234567890",
  "batchNumber": "BATCH123",
  "manufacturer": "Pharma Corp"
}

Response 200:
{
  "success": true,
  "data": {
    "verified": true,
    "medicine": {
      "name": "Paracetamol 500mg",
      "manufacturer": "Pharma Corp",
      "expiryDate": "2027-12-31",
      "authenticity": "verified"
    }
  }
}
```

#### Appointments API

**Base Path:** `/api/appointments`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user's appointments | ✅ |
| POST | `/` | Book new appointment | ✅ |
| PUT | `/:id` | Update appointment | ✅ |
| DELETE | `/:id` | Cancel appointment | ✅ |
| GET | `/doctor/:doctorId` | Get doctor's schedule | ✅ |

**Example: Book Appointment**

```javascript
POST /api/appointments
Content-Type: application/json
Authorization: Bearer <token>

{
  "doctorId": "doc_456def",
  "date": "2026-02-20",
  "time": "10:00",
  "reason": "General checkup",
  "notes": "Experiencing fever for 2 days"
}

Response 201:
{
  "success": true,
  "data": {
    "appointmentId": "appt_789ghi",
    "status": "confirmed",
    "doctor": {
      "name": "Dr. Sharma",
      "specialization": "General Physician"
    },
    "scheduledAt": "2026-02-20T10:00:00Z"
  }
}
```

#### Disease Tracker API

**Base Path:** `/api/disease-tracker`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/stats` | Get disease statistics | ✅ |
| GET | `/location/:pincode` | Get local disease data | ✅ |
| POST | `/report` | Report symptoms | ✅ |

#### Medical News API

**Base Path:** `/api/medical-news`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get latest medical news | ❌ |
| GET | `/:id` | Get specific article | ❌ |
| GET | `/category/:category` | Get news by category | ❌ |

#### Dashboard API

**Base Path:** `/api/dashboard`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/stats` | Get user dashboard statistics | ✅ |
| GET | `/recent-activity` | Get recent user activity | ✅ |
| GET | `/notifications` | Get user notifications | ✅ |

### Supabase Database Schema

#### Tables

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('patient', 'doctor', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**health_ids**
```sql
CREATE TABLE health_ids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  health_id TEXT UNIQUE NOT NULL,
  aadhaar_hash TEXT NOT NULL,
  aadhaar_last_four TEXT NOT NULL,
  qr_code TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**health_records**
```sql
CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**appointments**
```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES users(id),
  doctor_id UUID REFERENCES users(id),
  scheduled_at TIMESTAMP NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  reason TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Error Responses

All API errors follow this format:

```javascript
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional context
  }
}
```

**Common Error Codes:**
- `AUTH_REQUIRED` (401) - Authentication required
- `FORBIDDEN` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `VALIDATION_ERROR` (400) - Invalid input data
- `RATE_LIMIT_EXCEEDED` (429) - Too many requests
- `SERVER_ERROR` (500) - Internal server error

### Rate Limiting

- **Default:** 100 requests per 15 minutes per IP
- **Authenticated:** 300 requests per 15 minutes per user
- **Special endpoints:** More restrictive limits apply

### Webhook Events (Future)

| Event | Description |
|-------|-------------|
| `appointment.created` | New appointment booked |
| `appointment.cancelled` | Appointment cancelled |
| `record.shared` | Health record shared |
| `health_id.created` | New Health ID created |

---

## 🤝 Contributing

## 🤝 Contributing

We welcome contributions from developers, healthcare professionals, designers, and advocates! MedAI is built to be hackathon-ready while maintaining production-quality standards.

### How to Contribute

1. **Read the Guidelines** - Start with [CONTRIBUTING.md](./CONTRIBUTING.md)
2. **Pick an Issue** - Check [Good First Issues](https://github.com/AnshXGrind/Medai-new/labels/good%20first%20issue)
3. **Fork & Clone** - Create your own fork
4. **Create Branch** - Use descriptive branch names
5. **Make Changes** - Follow our coding standards
6. **Test Thoroughly** - Ensure nothing breaks
7. **Submit PR** - Use our PR template

### Contribution Areas

| Area | Skills Needed | Examples |
|------|---------------|----------|
| **Frontend** | React, TypeScript, UI/UX | New components, accessibility improvements |
| **Backend** | Node.js, Express, MongoDB | API endpoints, data models |
| **Database** | PostgreSQL, SQL | Schema improvements, RLS policies |
| **Security** | Auth, Encryption, Compliance | Security audits, penetration testing |
| **Documentation** | Technical writing | Guides, API docs, translations |
| **Design** | Figma, UI/UX | Interface improvements, accessibility |
| **DevOps** | Docker, CI/CD | Deployment automation, monitoring |

### Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/Medai-new.git
cd Medai-new

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat: add your feature"

# 4. Push and create PR
git push origin feature/your-feature-name
```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `perf:` Performance improvements
- `ci:` CI/CD changes
- `build:` Build system changes

**Examples:**
```
feat: add doctor verification system
fix: resolve health ID generation bug
docs: update API documentation
refactor: improve authentication flow
```

### Code Quality Standards

- **TypeScript**: Maintain type safety, no `any` types
- **ESLint**: Follow configured rules
- **Components**: Keep under 300 lines
- **Functions**: Single responsibility principle
- **Comments**: Explain why, not what
- **Tests**: Write tests for new features

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code  
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Changes tested locally
- [ ] PR description is clear and detailed

---

## 🔒 Security & Privacy

### Security Principles

1. **Privacy by Design**
   - Minimal data collection
   - User consent for all data operations
   - Transparent data usage policies

2. **Data Protection**
   - Aadhaar stored as hashed values only
   - End-to-end encryption for sensitive data
   - Regular security audits

3. **Access Control**
   - Role-based access control (RBAC)
   - Row-level security (RLS) in database
   - Time-limited access tokens

4. **Compliance**
   - HIPAA-aligned practices
   - GDPR principles
   - IT Act 2000 (India) compliance

### Security Features

✅ **Implemented:**
- JWT-based authentication
- Supabase RLS policies
- Hashed Aadhaar storage
- HTTPS/TLS encryption
- Rate limiting
- Input validation & sanitization
- CORS configuration
- SQL injection prevention

🔄 **Planned:**
- Multi-factor authentication (MFA)
- End-to-end encryption
- Audit logging system
- Security monitoring
- Penetration testing

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Instead, email: **security@medai.com** (or use your GitHub Security Advisories)

We take security seriously and will respond within 48 hours.

---

## 🛣️ Roadmap

### Current Status: MVP (v1.0)

✅ **Completed Features:**
- [x] Universal Health ID system
- [x] Doctor authentication
- [x] Health record management
- [x] Appointment booking
- [x] Emergency routing
- [x] Government scheme integration
- [x] PWA support
- [x] Multi-language foundation

### Q1 2026: Enhanced Security

- [ ] Multi-factor authentication
- [ ] Biometric authentication
- [ ] Enhanced audit logging
- [ ] Security penetration testing
- [ ] Compliance certifications

### Q2 2026: ABDM Integration

- [ ] Full ABDM/NDHM integration
- [ ] ABHA address creation
- [ ] PHR app connectivity
- [ ] Health facility registry
- [ ] Healthcare professional registry

### Q3 2026: Advanced Features

- [ ] Telemedicine integration
- [ ] AI-powered health insights
- [ ] Prescription OCR & extraction
- [ ] Medicine reminder system
- [ ] Wearable device integration

### Q4 2026: Scale & Optimize

- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Offline-first architecture
- [ ] Multi-region deployment
- [ ] Performance optimizations

### Future Vision

- Blockchain for immutable health records
- AI symptom checker (non-diagnostic)
- Insurance claim automation
- Lab integration for automatic report upload
- Pharmacy network integration
- Public health analytics
- Research data anonymization & contribution

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

```
MIT License

Copyright (c) 2026 MedAI Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

**What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ No liability or warranty
- ⚠️ Must include license and copyright notice

---

## ⚠️ Disclaimer

**THIS SOFTWARE IS FOR EDUCATIONAL AND DEMONSTRATION PURPOSES ONLY.**

MedAI is **NOT**:
- ❌ A licensed medical device
- ❌ Approved for clinical diagnosis or treatment
- ❌ HIPAA/FDA certified
- ❌ A replacement for professional medical advice
- ❌ Suitable for production medical use without proper licensing

**Use at your own risk.** Do not upload real patient data to demo instances.

For production healthcare use, ensure:
- Proper medical licensing
- Healthcare compliance certifications (HIPAA, GDPR, etc.)
- Security audits and penetration testing
- Legal review and approval
- Data protection officer oversight

---

## 🙏 Acknowledgments

This project builds upon excellent open-source tools and frameworks:

- **[React](https://reactjs.org/)** - UI framework
- **[Supabase](https://supabase.com/)** - Backend infrastructure
- **[Shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Lucide](https://lucide.dev/)** - Icon system

Special thanks to:
- NDHM/ABDM team for digital health standards
- Healthcare professionals who provided feedback
- Open-source contributors worldwide
- The React and TypeScript communities

---

## 📧 Contact & Support

### Project Links
- **GitHub Repository:** [Medai-new](https://github.com/AnshXGrind/Medai-new)
- **Live Demo:** [medaiii.vercel.app](https://medaiii.vercel.app)
- **Documentation:** [docs/](./docs/)

### Get Help
- 📖 [Documentation](./docs/README.md)
- 💬 [GitHub Discussions](https://github.com/AnshXGrind/Medai-new/discussions)
- 🐛 [Issue Tracker](https://github.com/AnshXGrind/Medai-new/issues)
- 📧 Email: support@medai.com

### Community
- Join our contributor community
- Follow development updates
- Share feedback and suggestions
- Participate in discussions

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/AnshXGrind/Medai-new?style=social)
![GitHub forks](https://img.shields.io/github/forks/AnshXGrind/Medai-new?style=social)
![GitHub issues](https://img.shields.io/github/issues/AnshXGrind/Medai-new)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AnshXGrind/Medai-new)
![GitHub contributors](https://img.shields.io/github/contributors/AnshXGrind/Medai-new)

---

<div align="center">

**Built with ❤️ for accessible, privacy-first healthcare in India**

[⭐ Star us on GitHub](https://github.com/AnshXGrind/Medai-new) | [🤝 Contribute](./CONTRIBUTING.md) | [📖 Documentation](./docs/)

</div>

---

## 🎯 Roadmap

- [x] MVP with Health IDs and appointments
- [x] Emergency routing
- [x] PWA support
- [ ] ABHA/NDHM integration
- [ ] Advanced analytics
- [ ] Offline-first capabilities
- [ ] Telemedicine features

---

## 🙏 Acknowledgments

- Built with modern React ecosystem
- Powered by Supabase
- UI components from Shadcn
- Icons from Lucide

---

## 📧 Contact

- **Project Link:** [https://github.com/AnshXGrind/medaiii](https://github.com/AnshXGrind/medaiii)
- **Live Demo:** [https://medaiii.vercel.app](https://medaiii.vercel.app)

---

**⚕️ Disclaimer:** This is a prototype for educational and demonstration purposes. Not intended for production medical use without proper licensing and compliance.

**Why this works:**  
- Emphasizes user agency over AI magic
- Transparently frames the project scope
- Highlights system design over feature count
- Builds trust through honesty

**Avoid:**  
- "AI-powered healthcare revolution"
- "Blockchain-secured medical records"
- "Real-time disease prediction"
- "Government-certified platform"

---

## 🏗️ Core Features (What's Actually Built)

### Record Management & Privacy
- **Privacy-aware Health ID**: Aadhaar never stored in full — only hashed tokens with last-4 display
- **Document Upload**: Secure storage for prescriptions, reports, and health documents (Supabase backend)
- **Consent-First Sharing**: Record access requires explicit user authorization (UI designed, partial backend)

### User Experience
- **Role-Based Dashboards**: Separate patient and doctor interfaces with contextual navigation
- **Emergency Routing**: Location-based hospital discovery for urgent care scenarios
- **Vaccination Tracking**: Multi-dose reminder interface with schedule management
- **Low-Literacy UX**: Visual workflows, large touch targets, simplified language options
- **PWA Installation**: Mobile-first design with offline capability scaffolding

### Technical Foundations
- **Authentication**: Supabase Auth with role-based access control
- **Database**: PostgreSQL with Row-Level Security (RLS) policies for data isolation
- **Multi-Language Architecture**: i18n infrastructure (English/Hindi contexts wired)
- **Real-Time Ready**: Supabase Realtime subscriptions configured (not actively used in MVP)

## Architecture and Tech Stack

- Frontend: React 18 + TypeScript, Vite, React Router, TanStack Query
- UI: shadcn-ui components, Radix primitives, Tailwind CSS
- Data: Supabase (PostgreSQL, RLS) and Supabase Realtime where enabled
- Mapping: Google Maps / OpenStreetMap integrations (see `integrations/`)
- PWA: Vite PWA plugin and `PWAInstallPrompt` component
- Optional services: `backend-modules` for search and supporting APIs

## Repository Structure

```
medaiii/
├── src/                    # React application source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components and routes
│   ├── contexts/          # React contexts (auth, language, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and helpers
│   └── integrations/      # Third-party integrations (Maps, etc.)
├── public/                # Static assets and PWA icons
├── backend-modules/       # Optional backend services (search API, etc.)
├── supabase/             # Database migrations and seed data
├── scripts/              # Utility scripts (migrations, setup, etc.)
├── tests/                # Test files and utilities
├── docs/                 # 📚 All documentation (see below)
├── docker/               # Docker and nginx configuration
└── mobile/               # React Native mobile app
```

### 📚 Documentation

All project documentation is organized in the [docs/](docs) directory:

- **[docs/guides/](docs/guides)** - Setup guides, quick starts, and how-tos
- **[docs/features/](docs/features)** - Feature-specific documentation (Health ID, Vaccination, etc.)
- **[docs/deployment/](docs/deployment)** - Deployment guides and checklists
- **[docs/security/](docs/security)** - Security policies and compliance guides
- **[docs/implementation/](docs/implementation)** - Implementation summaries and technical details

**📖 Full documentation index**: [docs/README.md](docs/README.md)

Key documents:
- [CONTRIBUTING_SIMPLE.md](CONTRIBUTING_SIMPLE.md) - Quick start for contributors
- [PROJECT_ORGANIZATION.md](PROJECT_ORGANIZATION.md) - Understanding the project structure
- [CHANGELOG.md](CHANGELOG.md) - Version history and changes
- [ROADMAP.md](ROADMAP.md) - Future plans and features

## Getting Started

### Prerequisites

- Node.js 20+ and npm 10+
- Supabase project (for database and RLS-enabled auth)
- Optional: Docker for local containerized runs

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/AnshXGrind/medaiii.git
cd medaiii

# Install dependencies
npm install

# Set up environment (copy and edit with your Supabase credentials)
cp .env.example .env.local
```

**📖 Detailed setup guide**: [docs/guides/QUICK_START.md](docs/guides/QUICK_START.md)  
**👥 Contributing**: [CONTRIBUTING_SIMPLE.md](CONTRIBUTING_SIMPLE.md)

### Environment configuration

1. Create an `.env.local` file for the frontend and add Supabase keys and URLs. See [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md) for required variables.
2. Apply Supabase migrations from [supabase/](supabase) to set up tables and RLS policies. Run `npm run migrate` or use scripts in [scripts/](scripts).
3. (Optional) Configure `backend-modules/.env` if running search or auxiliary services locally.

### Run locally

```bash
npm run dev
```

The app will start at `http://localhost:5173`. The dev server uses Vite and supports hot module replacement.

### Quality checks

- Lint: `npm run lint`
- Build verification: `npm run build`
- Preview production build: `npm run preview`

Automated tests are not yet wired; add targeted tests under `src/__tests__/` when contributing.

## 🔒 Security & Privacy Practices

**Implemented Controls:**
- Aadhaar numbers hashed with salt, never stored or transmitted in full
- Last-4 digits displayed for user verification only
- Supabase RLS policies enforce user-level data isolation
- HTTPS enforced for all data transmission
- Session-based authentication with secure token storage

**Design Patterns (Not All Enforced in Code):**
- Consent logging for record access (designed, partially implemented)
- Audit trails for sensitive operations (schema exists, logging incomplete)
- Time-limited share tokens for doctor access (designed, not wired)
- Emergency override with audit requirements (documented in [docs/security/](docs/security))

**Review before modifying:**  
- [docs/security/SECURITY.md](docs/security/SECURITY.md) - Security architecture and threat model
- [docs/guides/MIGRATION_GUIDE.md](docs/guides/MIGRATION_GUIDE.md) - RLS policy management

**What's NOT implemented:**  
- End-to-end encryption (records encrypted at rest by Supabase, not E2EE)
- Multi-factor authentication (planned, not active)
- Penetration testing or security audits (no external review conducted)

## 🛣️ Roadmap & Future Work

**Next Milestones (If Continued):**
1. Connect AI summarization pipeline (OCR + NLP for uploaded reports)
2. Implement secure share token generation with expiry logic
3. Add automated testing (unit + integration coverage)
4. Conduct accessibility audit and WCAG compliance review
5. Real ABDM sandbox integration (requires institutional partnership)

**Long-Term Vision (Research Phase):**
- Pharmacy integration for medication adherence
- Lab test result ingestion and interpretation
- Public health analytics (anonymized, aggregated data only)
- Wearable device sync for vitals tracking

**See full roadmap:** [ROADMAP.md](ROADMAP.md)

---

## 🤝 Contributing & Learning

This project welcomes contributors interested in:
- Healthcare UX/UI design patterns
- Consent and privacy architecture
- Low-literacy interface design
- React/TypeScript/Supabase full-stack development

**Start here:**  
- [CONTRIBUTING_SIMPLE.md](CONTRIBUTING_SIMPLE.md) - Quick contributor guide
- [docs/guides/QUICK_START.md](docs/guides/QUICK_START.md) - Local development setup
- [PROJECT_ORGANIZATION.md](PROJECT_ORGANIZATION.md) - Codebase structure walkthrough

**Good first issues:**  
- Add unit tests for authentication flows
- Improve accessibility scores in Lighthouse audits
- Translate existing UI strings to additional Indian languages
- Document API response shapes for backend modules

---

## ⚖️ Legal & Disclaimers

**MIT License** - See [LICENSE](LICENSE) for details

**Not a Medical Device:**  
This software is a student portfolio project demonstrating system design capabilities. It is NOT:
- A licensed medical device or diagnostic tool
- Approved for clinical use or patient care
- Compliant with HIPAA, FDA, or other healthcare regulations
- Suitable for storing real patient health information

**Data Responsibility:**  
Do not upload real medical records or personally identifiable health information to the demo deployment. Any data you enter should be considered test data only.

**Use at Your Own Risk:**  
This software is provided "as is" without warranty. See license for full disclaimer.
