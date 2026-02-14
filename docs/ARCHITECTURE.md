# System Overview

## Architecture

MED-Aid follows a modern, frontend-first architecture with optional backend services.

### Core Components

1. **Frontend Application**
   - React 18 with TypeScript
   - Vite for build tooling
   - TailwindCSS + Shadcn/ui for UI
   - React Router for navigation
   - React Query for state management

2. **Database & Auth**
   - Supabase PostgreSQL
   - Row Level Security (RLS)
   - Built-in authentication
   - Real-time subscriptions

3. **Optional Backend**
   - Express.js API server
   - MongoDB for additional storage
   - Disease tracking services
   - Medicine verification APIs

### Data Flow

```
User → React App → Supabase API → PostgreSQL (RLS)
                ↓
         Optional Backend → MongoDB
```

### Security Model

- **Authentication:** Supabase Auth (JWT)
- **Authorization:** Row Level Security policies
- **Data Privacy:** Hashed sensitive fields
- **Consent Management:** Database-level enforcement

### Key Design Decisions

1. **Frontend-First Approach**
   - Reduced initial complexity
   - Faster iteration
   - Better UX control

2. **Supabase for Backend**
   - Built-in auth & RLS
   - Real-time capabilities
   - Reduced server maintenance

3. **Privacy by Design**
   - Consent before features
   - Minimal data collection
   - Hashed identifiers

4. **No Clinical Diagnosis**
   - Avoiding regulatory complexity
   - Focus on record management
   - Clear scope boundaries

### Scalability

- **Frontend:** CDN-hosted static assets (Vercel)
- **Database:** Supabase managed PostgreSQL
- **Backend:** Containerized services (Docker)

### Deployment

- **Production:** Vercel (frontend) + Supabase (backend)
- **Staging:** Branch previews on Vercel
- **Local:** Docker Compose for full stack
