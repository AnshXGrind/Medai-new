/**
 * Input Validation Middleware
 * Validates and sanitizes request data
 */

/**
 * Validate required fields
 */
exports.validateRequired = (fields) => {
  return (req, res, next) => {
    const missing = [];

    for (const field of fields) {
      if (!req.body[field]) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Missing required fields',
          details: { missing }
        }
      });
    }

    next();
  };
};

/**
 * Validate email format
 */
exports.validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_EMAIL',
        message: 'Invalid email format'
      }
    });
  }

  next();
};

/**
 * Validate password strength
 */
exports.validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next();
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'WEAK_PASSWORD',
        message: 'Password must be at least 8 characters long'
      }
    });
  }

  // Check for at least one uppercase, one lowercase, one number
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'WEAK_PASSWORD',
        message: 'Password must contain uppercase, lowercase, and numbers'
      }
    });
  }

  next();
};

/**
 * Sanitize input to prevent XSS
 */
exports.sanitizeInput = (req, res, next) => {
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/[<>]/g, '')
      .trim();
  };

  const sanitizeObject = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = sanitizeString(obj[key]);
      } else if (typeof obj[key] === 'object') {
        sanitizeObject(obj[key]);
      }
    }
  };

  if (req.body) {
    sanitizeObject(req.body);
  }

  if (req.query) {
    sanitizeObject(req.query);
  }

  next();
};

/**
 * Validate Health ID format
 */
exports.validateHealthId = (req, res, next) => {
  const { healthId } = req.body || req.params;

  if (!healthId) {
    return next();
  }

  // Health ID format: 14 digits
  const healthIdRegex = /^\d{14}$/;

  if (!healthIdRegex.test(healthId)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_HEALTH_ID',
        message: 'Health ID must be 14 digits'
      }
    });
  }

  next();
};

/**
 * Validate file upload
 */
exports.validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'NO_FILE',
        message: 'No file uploaded'
      }
    });
  }

  const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || [
    'image/jpeg',
    'image/png',
    'application/pdf'
  ];

  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_FILE_TYPE',
        message: 'File type not allowed',
        details: { allowed: allowedTypes }
      }
    });
  }

  const maxSize = parseInt(process.env.MAX_FILE_SIZE) || 10485760; // 10MB

  if (req.file.size > maxSize) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: `File size exceeds ${maxSize / 1048576}MB`
      }
    });
  }

  next();
};

/**
 * Compose validators for registration
 */
exports.validateRegistration = [
  exports.validateRequired(['email', 'password', 'fullName', 'phone']),
  exports.validateEmail,
  exports.validatePassword,
  exports.sanitizeInput
];

/**
 * Compose validators for login
 */
exports.validateLogin = [
  exports.validateRequired(['email', 'password']),
  exports.validateEmail,
  exports.sanitizeInput
];

