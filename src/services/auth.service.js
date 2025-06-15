const bcrypt = require('bcryptjs');
const User = require('../../models/user.models'); // Adjust the path to your User model
const tokenService = require('../../utlis/token.service'); // Your token service

const loginWithEmail = async (email, password) => {
  const user = await User.findOne({ userEmail: email });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.isBlocked) {
    throw new Error('User is blocked');
  }

  if (!user.isVerified) {
    throw new Error('Email is not verified');
  }

  const isMatch = await bcrypt.compare(password, user.userPassword);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  // Update login status and last login
  user.isLogin = true;
  user.lastLogin = new Date();
  await user.save();

  const payload = {
    userId: user._id,
    role: user.userRole,
    userType: user.userType // if you added this in schema
  };

  const accessToken = tokenService.generateAccessToken(payload);
  const refreshToken = tokenService.generateRefreshToken(payload);

  return {
    user,
    accessToken,
    refreshToken
  };
};
const signupWithEmail = async (userData) => {
  const { userName, userEmail, userPassword, userPhone, countryCode } = userData;

  // Check if user already exists by email or phone
  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userPhone }]
  });

  if (existingUser) {
    throw new Error('User with this email or phone already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(userPassword, 10);

  // Create user
  const newUser = new User({
    userName,
    userEmail,
    userPassword: hashedPassword,
    userPhone,
    countryCode,
    isVerifiied: false,
    userRole: 'user',  // or set dynamically if needed
    isLogin: true,
    lastLogin: new Date()
  });

  await newUser.save();

  const payload = {
    userId: newUser._id,
    role: newUser.userRole,
    userType: newUser.userType // if you added this in schema
  };

  const accessToken = tokenService.generateAccessToken(payload);
  const refreshToken = tokenService.generateRefreshToken(payload);

  return {
    user: newUser,
    accessToken,
    refreshToken
  };
};

module.exports = {
  loginWithEmail,signupWithEmail
};