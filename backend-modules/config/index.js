/**
 * Main Configuration Index
 * Exports all configuration modules
 */

const database = require('./database');
const auth = require('./auth');
const constants = require('./constants');

module.exports = {
  database,
  auth,
  constants,

  // Server config
  server: {
    port: parseInt(process.env.PORT) || 3000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development',
  },

  // CORS config
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
    credentials: true,
  },

  // Logging config
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/app.log',
    console: process.env.ENABLE_CONSOLE_LOG !== 'false',
  },
};
