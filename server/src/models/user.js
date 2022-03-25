const connectToAtlas = require('../configs/connectDB');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    default: null,
  },
  facebookId: {
    type: String,
    default: null,
  },
  githubId: {
    type: String,
    default: null,
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'facebook', 'github'],
    default: 'local',
  },
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    
    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hashSync(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isMatchPassword = async function (password) {
  try {
    return await bcryptjs.compareSync(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = connectToAtlas.model('Users', userSchema);

module.exports = User;
