import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema({
  verifyToken: {
    type: String,
    required: true
  },

  email: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userType'  
  },

  userType: {
    type: String,
    required: true,
    enum: ['User', 'Seller']  
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m' 
  }

}, {
  timestamps: true
});

export const EmailVerification = mongoose.model('EmailVerification', emailVerificationSchema);
