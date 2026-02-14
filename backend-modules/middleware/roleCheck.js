/**
 * Role-Based Access Control Middleware
 * Restricts access based on user roles
 */

/**
 * Check if user has required role(s)
 * @param {string|string[]} roles - Required role(s)
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'AUTH_REQUIRED',
          message: 'Authentication required'
        }
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions'
        }
      });
    }

    next();
  };
};

/**
 * Patient only access
 */
exports.patientOnly = exports.authorize('patient');

/**
 * Doctor only access
 */
exports.doctorOnly = exports.authorize('doctor');

/**
 * Admin only access
 */
exports.adminOnly = exports.authorize('admin');

/**
 * Doctor or Admin access
 */
exports.doctorOrAdmin = exports.authorize('doctor', 'admin');

/**
 * All authenticated users
 */
exports.authenticated = exports.authorize('patient', 'doctor', 'admin');

/**
 * Check if user owns the resource
 * @param {string} resourceIdParam - Parameter name for resource ID
 * @param {string} userIdField - Field name in resource for user ID
 */
exports.isOwner = (resourceIdParam = 'id', userIdField = 'userId') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdParam];
      const userId = req.user.id;

      // Fetch resource and check ownership
      // This is a template - implement with your actual database
      // const resource = await Model.findById(resourceId);
      
      // if (!resource || resource[userIdField] !== userId) {
      //   return res.status(403).json({
      //     success: false,
      //     error: {
      //       code: 'FORBIDDEN',
      //       message: 'You do not have permission to access this resource'
      //     }
      //   });
      // }

      req.resource = {}; // Attach resource to request
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Authorization error'
        }
      });
    }
  };
};

/**
 * Check if user has consent to access another user's data
 */
exports.hasConsent = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const doctorId = req.user.id;

    // Check if consent exists
    // const consent = await Consent.findOne({
    //   patientId,
    //   doctorId,
    //   status: 'active',
    //   expiresAt: { $gt: new Date() }
    // });

    // if (!consent) {
    //   return res.status(403).json({
    //     success: false,
    //     error: {
    //       code: 'NO_CONSENT',
    //       message: 'Patient consent required'
    //     }
    //   });
    // }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Consent verification error'
      }
    });
  }
};

/**
 * Emergency access override (logs access)
 */
exports.emergencyAccess = async (req, res, next) => {
  try {
    const { emergencyCode, reason } = req.body;

    // Verify emergency code
    // const isValid = await verifyEmergencyCode(emergencyCode);

    // Log emergency access
    // await AuditLog.create({
    //   userId: req.user.id,
    //   action: 'EMERGENCY_ACCESS',
    //   resourceId: req.params.id,
    //   reason,
    //   timestamp: new Date()
    // });

    req.emergencyAccess = true;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Emergency access verification error'
      }
    });
  }
};
