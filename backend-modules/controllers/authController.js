/**
 * Authentication Controller
 * Handles user authentication, registration, and token management
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

/**
 * Register a new user
 * @route POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { email, password, role, profile } = req.body;

    // Validation
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email, password, and role are required'
        }
      });
    }

    // Check if user exists (implement with your database)
    // const existingUser = await User.findOne({ email });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 12);

    // Create user in database
    // const user = await User.create({ email, password: hashedPassword, role, profile });

    // Generate tokens
    const accessToken = generateAccessToken({ email, role });
    const refreshToken = generateRefreshToken({ email, role });

    res.status(201).json({
      success: true,
      data: {
        user: {
          email,
          role,
          // id: user.id
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Error registering user'
      }
    });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email and password are required'
        }
      });
    }

    // Find user in database
    // const user = await User.findOne({ email });

    // Verify password
    // const isValid = await bcrypt.compare(password, user.password);

    // For demo - replace with actual verification
    const accessToken = generateAccessToken({ email, role: 'patient' });
    const refreshToken = generateRefreshToken({ email, role: 'patient' });

    res.json({
      success: true,
      data: {
        user: {
          email,
          role: 'patient'
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Error logging in'
      }
    });
  }
};

/**
 * Refresh access token
 * @route POST /api/auth/refresh
 */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Refresh token required'
        }
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Generate new access token
    const accessToken = generateAccessToken({ 
      email: decoded.email, 
      role: decoded.role 
    });

    res.json({
      success: true,
      data: {
        accessToken
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired refresh token'
      }
    });
  }
};

/**
 * Logout user
 * @route POST /api/auth/logout
 */
exports.logout = async (req, res) => {
  try {
    // Implement token blacklisting or session invalidation
    // await TokenBlacklist.create({ token: req.token });

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Error logging out'
      }
    });
  }
};

/**
 * Verify email with OTP
 * @route POST /api/auth/verify-email
 */
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Verify OTP logic
    // const isValid = await verifyOTP(email, otp);

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Error verifying email'
      }
    });
  }
};

// Helper functions
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d'
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '30d'
  });
}
