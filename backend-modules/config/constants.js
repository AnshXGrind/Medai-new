/**
 * Application Constants
 * Centralized constants for the application
 */

module.exports = {
  // User Roles
  ROLES: {
    PATIENT: 'patient',
    DOCTOR: 'doctor',
    ADMIN: 'admin',
  },

  // Appointment Status
  APPOINTMENT_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    NO_SHOW: 'no_show',
  },

  // Health Record Categories
  RECORD_CATEGORIES: {
    LAB_REPORT: 'lab_report',
    PRESCRIPTION: 'prescription',
    SCAN: 'scan',
    VACCINATION: 'vaccination',
    DISCHARGE_SUMMARY: 'discharge_summary',
    OTHER: 'other',
  },

  // Consent Status
  CONSENT_STATUS: {
    PENDING: 'pending',
    ACTIVE: 'active',
    REVOKED: 'revoked',
    EXPIRED: 'expired',
  },

  // File Upload
  FILE_UPLOAD: {
    MAX_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB
    ALLOWED_TYPES: [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },

  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },

  // Error Codes
  ERROR_CODES: {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTH_REQUIRED: 'AUTH_REQUIRED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    SERVER_ERROR: 'SERVER_ERROR',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    DUPLICATE_ERROR: 'DUPLICATE_ERROR',
    INVALID_TOKEN: 'INVALID_TOKEN',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  },

  // Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500,
  },

  // Time Constants
  TIME: {
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000,
  },

  // Healthcare Constants
  HEALTH_ID: {
    LENGTH: 14,
    PREFIX: 'MH',
  },

  // Aadhaar
  AADHAAR: {
    LENGTH: 12,
    MASKED_LENGTH: 4,
  },
};
