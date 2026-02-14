# Backend Modules

Optional backend services for MED-Aid providing additional API functionality.

## Overview

The backend modules extend MED-Aid with server-side services for:
- Health record management
- Disease tracking
- Medicine verification
- Medical search

## Services

### 1. Express.js API Server (`server.js`)
RESTful API for core backend operations.

### 2. Python Search Service (`search_service.py`)
Medical information search and analytics.

## Quick Start

### Node.js Backend

```bash
cd backend-modules
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

Server runs on `http://localhost:3000`

### Python Service

```bash
cd backend-modules
pip install -r requirements.txt
python search_service.py
```

## Environment Variables

Create `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/medaid
JWT_SECRET=your-secret-key
PORT=3000
```

## API Endpoints

### Health Records
- `POST /api/health-records` - Create record
- `GET /api/health-records/:id` - Get record
- `PUT /api/health-records/:id` - Update record
- `DELETE /api/health-records/:id` - Delete record

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/:patientId` - Get patient appointments
- `PUT /api/appointments/:id` - Update appointment

### Disease Tracker
- `GET /api/disease-tracker` - Get disease statistics
- `POST /api/disease-tracker/report` - Report case

### Medicine Checker
- `POST /api/medicine-checker` - Verify medicine authenticity
- `GET /api/medicine-checker/:code` - Check medicine by code

## Docker

Run with Docker Compose:

```bash
docker-compose up backend
```

## Database Models

### HealthRecord
```javascript
{
  patientId: String,
  doctorId: String,
  diagnosis: String,
  medications: [String],
  notes: String,
  createdAt: Date
}
```

### DiseaseTracker
```javascript
{
  disease: String,
  location: { lat: Number, lng: Number },
  cases: Number,
  date: Date
}
```

## Development

```bash
# Run in development mode
npm run dev

# Lint code
npm run lint
```

## Testing

The backend assumes:
- MongoDB running on localhost:27017
- Supabase configured in frontend
- Valid JWT tokens for authentication

## Security

- All endpoints require authentication
- JWT token validation
- Input sanitization
- Rate limiting enabled
- CORS configured for frontend origin

## Notes

- Backend modules are **optional** - the app works with Supabase alone
- Use these services for advanced features requiring server-side logic
- Python service is independent and can run separately
