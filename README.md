# MED-Aid 🏥

> **Privacy-first digital health platform bridging healthcare access gaps across India**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://medaiii.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

---

## 🌟 Overview

MED-Aid is a comprehensive digital health platform that enables secure health ID creation, appointment management, emergency routing, and consent-driven health record management. Built with privacy and accessibility at its core, it addresses healthcare fragmentation challenges faced by underserved populations in India.

**🔗 Live Demo:** [https://medaiii.vercel.app](https://medaiii.vercel.app)

---

## ✨ Key Features

### 🆔 Digital Health IDs
- Secure health ID creation with hashed Aadhaar integration
- Privacy-first approach (only last-4 digits displayed)
- Universal health identifier for seamless care

### 📅 Appointment Management
- Book appointments with healthcare providers
- View and manage appointment history
- Doctor and patient dashboards

### 🚨 Emergency Routing
- Location-based hospital discovery
- Quick access to emergency services
- Consent-override mechanisms for critical situations

### 📱 Progressive Web App (PWA)
- Mobile-first responsive design
- Offline capabilities
- Install as native app on any device

### 🌐 Multi-language Support
- Accessibility for diverse populations
- Multiple Indian language options
- Low-literacy friendly UX

### 🔒 Privacy & Security
- Row Level Security (RLS) with Supabase
- Consent-driven data access
- HIPAA-aligned security practices

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tooling
- **TailwindCSS** - Utility-first styling
- **Shadcn/ui** - Component library
- **React Router** - Navigation
- **React Query** - State management

### Backend
- **Supabase** - PostgreSQL database with RLS
- **Node.js/Express** - API services
- **MongoDB** - Additional data storage

### Infrastructure
- **Vercel** - Frontend hosting
- **Docker** - Containerization
- **GitHub Actions** - CI/CD

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnshXGrind/medaiii.git
   cd medaiii
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Backend Setup (Optional)

```bash
cd backend-modules
npm install
cp .env.example .env
# Configure MongoDB and other services
npm start
```

---

## 📁 Project Structure

```
medaiii/
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── pages/           # Route pages
│   ├── lib/             # Utilities
│   ├── hooks/           # Custom hooks
│   └── integrations/    # External integrations
├── backend-modules/     # Backend API services
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── server.js        # Express server
├── docs/                # Documentation
├── public/              # Static assets
├── supabase/            # Database migrations
└── scripts/             # Utility scripts
```

---

## 🔐 Environment Variables

Key environment variables (see `.env.example` for full list):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ Never commit `.env` files with actual credentials**

---

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   React     │────▶ │   Supabase   │────▶ │  PostgreSQL │
│  Frontend   │      │   (API+Auth) │      │  Database   │
└─────────────┘      └──────────────┘      └─────────────┘
       │                                             │
       │                                             │
       ▼                                             ▼
┌─────────────┐                             ┌─────────────┐
│  Express    │                             │  Row Level  │
│   Backend   │                             │  Security   │
└─────────────┘                             └─────────────┘
```

### Key Design Decisions

- **Frontend-first architecture** - Reduced backend complexity in early phases
- **Supabase RLS** - Database-level security and data isolation
- **Consent-driven access** - Privacy boundaries enforced before feature expansion
- **No clinical diagnosis** - Avoiding ethical/regulatory risks

---

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Code of conduct
- Development workflow
- Pull request process
- Coding standards

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

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
