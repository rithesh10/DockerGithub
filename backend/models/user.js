// ===== MODELS/USER.JS =====
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'consumer'],
    default: 'consumer',
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
