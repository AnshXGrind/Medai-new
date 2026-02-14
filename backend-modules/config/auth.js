/**
 * Authentication Configuration
 * JWT and authentication settings
 */

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiry: process.env.JWT_EXPIRY || '7d',
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
    issuer: 'medai-app',
  },

  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret',
    expiry: process.env.REFRESH_TOKEN_EXPIRY || '30d',
  },

  bcrypt: {
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 12,
  },

  session: {
    secret: process.env.SESSION_SECRET || 'session-secret',
    expiry: parseInt(process.env.SESSION_EXPIRY) || 86400000, // 24 hours
  },

  otp: {
    length: 6,
    expiry: 5 * 60 * 1000, // 5 minutes
    maxAttempts: 3,
  },

  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
};
