const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false // Don't include password in queries by default
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin', 'asha_worker'],
    default: 'patient'
  },
  healthId: {
    type: String,
    unique: true,
    sparse: true // Allow null values while maintaining uniqueness
  },
  abhaId: {
    type: String,
    unique: true,
    sparse: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer_not_to_say']
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  // For doctors
  doctorProfile: {
    licenseNumber: String,
    specialization: [String],
    qualifications: [String],
    experience: Number,
    consultationFee: Number,
    hospitalAffiliation: String,
    clinicAddress: String,
    availability: [{
      day: String,
      startTime: String,
      endTime: String
    }]
  },
  // For ASHA workers
  ashaProfile: {
    workerId: String,
    assignedArea: String,
    certificationDate: Date,
    supervisor: String,
    activePatients: { type: Number, default: 0 }
  },
  // Security
  refreshToken: {
    type: String,
    select: false
  },
  lastLogin: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  passwordResetToken: String,
  passwordResetExpiry: Date,
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  suspensionReason: String
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.refreshToken;
      delete ret.__v;
      return ret;
    }
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Generate health ID if not exists
UserSchema.methods.generateHealthId = function() {
  if (!this.healthId) {
    const prefix = 'MHI';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.healthId = `${prefix}-${timestamp}-${random}`;
  }
  return this.healthId;
};

// Check if user can perform action based on role
UserSchema.methods.hasRole = function(roles) {
  if (typeof roles === 'string') roles = [roles];
  return roles.includes(this.role);
};

// Get public profile (safe data)
UserSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    phone: this.phone,
    role: this.role,
    healthId: this.healthId,
    profilePicture: this.profilePicture,
    isVerified: this.isVerified,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', UserSchema);
