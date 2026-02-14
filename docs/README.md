# Documentation

Welcome to MED-Aid documentation.

## 📚 Quick Links

- [Main README](../README.md) - Project overview and setup
- [Contributing Guide](../CONTRIBUTING.md) - How to contribute
- [License](../LICENSE) - MIT License

## 📖 Core Documentation

### System Overview

MED-Aid is a privacy-first digital health platform built with:
- **Frontend:** React + TypeScript + Vite + TailwindCSS
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Optional Services:** Node.js/Express + MongoDB

### Architecture

```
┌──────────────┐
│  React App   │
│  (Frontend)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Supabase    │
│  PostgreSQL  │
│  Auth + RLS  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Storage     │
│  Functions   │
└──────────────┘
```

### Key Features

1. **Digital Health IDs**
   - Secure Aadhaar-linked identifiers
   - Privacy-preserving (hashed tokens)
   - Universal health record access

2. **Appointment System**
   - Patient-Doctor scheduling
   - Dashboard management
   - History tracking

3. **Emergency Routing**
   - Location-based hospital finder
   - Quick access protocols
   - Consent override for emergencies

4. **PWA Support**
   - Offline capabilities
   - Mobile installation
   - Native app experience

### Security

- Row Level Security (RLS) on all tables
- Hashed sensitive data (Aadhaar)
- Consent-driven access control
- HTTPS-only communication

### Database Schema

Key tables:
- `patients` - Patient profiles
- `doctors` - Healthcare provider profiles
- `appointments` - Scheduling records
- `health_records` - Medical data (RLS protected)
- `emergency_contacts` - Emergency access lists

### API Endpoints (Optional Backend)

- `/api/health-records` - Health record CRUD
- `/api/appointments` - Appointment management
- `/api/disease-tracker` - Local disease tracking
- `/api/medicine-checker` - Medicine verification

## 🚀 Development

### Local Setup

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run dev server
npm run dev
```

### Building for Production

```bash
npm run build
npm run preview
```

### Deployment

The app is configured for:
- **Vercel** (frontend) - `vercel.json`
- **Netlify** (alternative) - `netlify.toml`
- **Docker** - `Dockerfile` and `docker-compose.yml`

## 🧪 Testing

```bash
# Lint code
npm run lint

# Build check
npm run build
```

## 📦 Project Structure

```
medaiii/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Route pages
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities
│   ├── integrations/    # External services
│   └── contexts/        # React contexts
├── backend-modules/     # Optional backend
├── public/              # Static assets
├── supabase/           # Database migrations
├── docs/               # Documentation
└── scripts/            # Utility scripts
```

## 🔐 Environment Variables

Required variables:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

Optional:
- `MONGODB_URI` - MongoDB connection (backend)
- `JWT_SECRET` - JWT signing key (backend)

See `.env.example` for full list.

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

---

**Need help?** Open an issue on [GitHub](https://github.com/AnshXGrind/medaiii/issues)
