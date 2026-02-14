# MedAI API Documentation

## 📡 Overview

This document provides comprehensive documentation for the MedAI REST API.

**Base URL (Development):** `http://localhost:3000/api`
**Base URL (Production):** `https://api.medai.app/v1`

**API Version:** 1.0.0

---

## 🔐 Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### Obtaining Tokens

**Login Endpoint:** `POST /api/auth/login`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "role": "patient"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

### Token Refresh

When your access token expires, use the refresh token:

**Endpoint:** `POST /api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "your_refresh_token"
}
```

---

## 📋 Common Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional context
  }
}
```

---

## 🔑 Authentication Endpoints

### Register User

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "role": "patient",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+911234567890"
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "role": "patient"
    },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

### Login

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`

### Logout

```http
POST /api/auth/logout
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

### Verify Email

```http
POST /api/auth/verify-email
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:** `200 OK`

---

## 🏥 Health Records Endpoints

### Get All Health Records

```http
GET /api/health-records
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `category` (optional): Filter by category
- `sortBy` (optional): Sort field (default: createdAt)
- `sortOrder` (optional): asc | desc (default: desc)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "records": [
      {
        "id": "rec_123",
        "title": "Blood Test Report",
        "description": "Annual checkup results",
        "category": "lab_report",
        "fileUrl": "https://storage.url/file.pdf",
        "tags": ["blood", "annual"],
        "createdAt": "2026-02-14T10:30:00Z",
        "updatedAt": "2026-02-14T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

### Get Health Record by ID

```http
GET /api/health-records/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

### Upload Health Record

```http
POST /api/health-records
```

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data:**
- `file` (required): The file to upload
- `title` (required): Record title
- `description` (optional): Record description
- `category` (required): lab_report | prescription | scan | vaccination | other
- `date` (required): Date of record (ISO 8601)
- `tags` (optional): Comma-separated tags

**Response:** `201 Created`

### Update Health Record

```http
PUT /api/health-records/:id
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "tags": ["updated", "tag"]
}
```

**Response:** `200 OK`

### Delete Health Record

```http
DELETE /api/health-records/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

### Share Health Record

```http
POST /api/health-records/:id/share
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "expiresIn": 86400000,
  "permissions": ["view"]
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "shareToken": "abc123def456...",
    "shareUrl": "https://medai.app/shared/abc123def456",
    "expiresAt": "2026-02-15T10:30:00Z"
  }
}
```

### Access Shared Record

```http
GET /api/health-records/shared/:token
```

**No Authentication Required**

**Response:** `200 OK`

---

## 📅 Appointment Endpoints

### Get All Appointments

```http
GET /api/appointments
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): pending | confirmed | completed | cancelled
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date

**Response:** `200 OK`

### Book Appointment

```http
POST /api/appointments
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "doctorId": "doc_456",
  "date": "2026-02-20",
  "time": "10:00",
  "reason": "General checkup",
  "notes": "Experiencing fever for 2 days"
}
```

**Response:** `201 Created`

### Update Appointment

```http
PUT /api/appointments/:id
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "date": "2026-02-21",
  "time": "11:00",
  "notes": "Updated notes"
}
```

**Response:** `200 OK`

### Cancel Appointment

```http
DELETE /api/appointments/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

### Get Doctor's Schedule

```http
GET /api/appointments/doctor/:doctorId
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `date` (required): Date in YYYY-MM-DD format

**Response:** `200 OK`

---

## 💊 Medicine Checker Endpoints

### Verify Medicine

```http
POST /api/medicine-checker/verify
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "barcode": "8901234567890",
  "batchNumber": "BATCH123",
  "manufacturer": "Pharma Corp"
}
```

**Response:** `200 OK`

### Search Medicine

```http
GET /api/medicine-checker/search
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `q` (required): Search query
- `category` (optional): Medicine category

**Response:** `200 OK`

### Get Medicine Details

```http
GET /api/medicine-checker/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

---

## 📰 Medical News Endpoints

### Get Latest News

```http
GET /api/medical-news
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `category` (optional): News category

**Response:** `200 OK`

### Get News Article

```http
GET /api/medical-news/:id
```

**Response:** `200 OK`

### Get News by Category

```http
GET /api/medical-news/category/:category
```

**Response:** `200 OK`

---

## 🦠 Disease Tracker Endpoints

### Get Disease Statistics

```http
GET /api/disease-tracker/stats
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `disease` (optional): Specific disease
- `region` (optional): Geographic region

**Response:** `200 OK`

### Get Local Disease Data

```http
GET /api/disease-tracker/location/:pincode
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

### Report Symptoms

```http
POST /api/disease-tracker/report
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "symptoms": ["fever", "cough"],
  "location": "110001",
  "severity": "moderate"
}
```

**Response:** `201 Created`

---

## 📊 Dashboard Endpoints

### Get Dashboard Statistics

```http
GET /api/dashboard/stats
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

### Get Recent Activity

```http
GET /api/dashboard/recent-activity
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

### Get Notifications

```http
GET /api/dashboard/notifications
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `unread` (optional): true | false

**Response:** `200 OK`

---

## ❌ Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `AUTH_REQUIRED` | 401 | Authentication required |
| `INVALID_TOKEN` | 401 | Invalid or malformed token |
| `TOKEN_EXPIRED` | 401 | Token has expired |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `DUPLICATE_ERROR` | 409 | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

---

## 🔒 Rate Limiting

### Rate Limit Headers

All responses include rate limit headers:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1609459200
```

### Limits by Endpoint Type

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
|General API | 100 requests | 15 minutes |
| Authentication | 5 requests | 15 minutes |
| File Upload | 20 requests | 1 hour |
| Password Reset | 3 requests | 1 hour |
| OTP Requests | 3 requests | 5 minutes |

---

## 📦 Pagination

List endpoints support pagination with standard parameters:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response Format:**
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

## 🔍 Filtering and Sorting

Many list endpoints support filtering and sorting:

**Query Parameters:**
- `sortBy`: Field to sort by
- `sortOrder`: `asc` or `desc`
- `filter[field]`: Filter by field value

**Example:**
```
GET /api/health-records?sortBy=createdAt&sortOrder=desc&filter[category]=lab_report
```

---

## 🧪 Testing

### Postman Collection

Import our Postman collection for easy API testing:

[Download Postman Collection](./postman-collection.json)

### cURL Examples

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Get Health Records:**
```bash
curl -X GET http://localhost:3000/api/health-records \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Upload Health Record:**
```bash
curl -X POST http://localhost:3000/api/health-records \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/file.pdf" \
  -F "title=Blood Test" \
  -F "category=lab_report"
```

---

## 🌐 Webhooks (Coming Soon)

Webhook support for real-time event notifications.

**Planned Events:**
- `appointment.created`
- `appointment.cancelled`
- `record.shared`
- `consent.granted`

---

## 📞 Support

For API support and questions:

- **Email:** api-support@medai.com
- **Documentation:** [https://docs.medai.app](https://docs.medai.app)
- **GitHub Issues:** [https://github.com/AnshXGrind/Medai-new/issues](https://github.com/AnshXGrind/Medai-new/issues)

---

**Last Updated:** February 14, 2026
**API Version:** 1.0.0
