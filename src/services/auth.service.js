const bcrypt = require('bcryptjs');
const User = require('../../models/user.models'); // Adjust the path to your User model
const tokenService = require('../../utlis/token.service'); // Your token service
const { sendEmail } = require('../../utlis/sendEmail config');
const { generateOTP } = require('../../utlis/otp.server');

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
  if(user.userRole == 'supplier'){
    if(!user.companyId){
      throw Error("please Create a company to continue")
    }
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
  console.log(userData)
  const { userName, userEmail, userPassword, userPhone, countryCode,userRole ='user' } = userData;

  // Check if user already exists by email or phone
  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userPhone }]
  });
  console.log(existingUser)
  if (existingUser) {
    throw new Error('User with this email or phone already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  const otp = generateOTP(6,5)
  // Create user
  const newUser = new User({
    userName,
    userEmail,
    userPassword: hashedPassword,
    userPhone,
    countryCode,
    userRole,
    isVerifiied: false,
    otp :{
      code:otp.otp,
      expiresAt:otp.expiresAt
    },
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
  const subject = 'Welcome to Our Platform!';
  const text = `Hi ${userName}, welcome! Please verify your email to get started.`;
  const html = `<p>Hi <strong>${userName}</strong>,</p><p>Welcome! Please verify your email this is your otp ${otp.otp}to get started.</p>`;
  sendEmail(userEmail,subject,text,html).catch(console.error)

  return {
    user: newUser,
    accessToken,
    refreshToken
  };
};

const verifyEmail = async (Otp,userEmail) =>{
  const existing_user = await User.findOne({userEmail}) 
  if(!existing_user){
    throw Error("User not found")
  }
  console.log(existing_user.otp,"user found")
  if(existing_user.isVerified){
    throw Error("user already verified ")
  }
  if(existing_user.otp.code == Otp){
    console.log("first run")
    existing_user.isVerified = true;
    console.log("second run")
    await existing_user.save()
    console.log("third run")
    return true;
  }
  else{
    console.log("forth")
    throw Error("OTP is wrong ")
  }

}

const createCompany = async()=>{

}
``


module.exports = {
  loginWithEmail,signupWithEmail,verifyEmail
};