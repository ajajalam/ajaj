const signupService = require('../services/auth.service');
const authService = require('../services/auth.service');

const signupController = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userPhone, countryCode,userRole } = req.body;

    const { user, accessToken, refreshToken } = await signupService.signupWithEmail({
      userName,
      userEmail,
      userPassword,
      userPhone,
      countryCode,
      userRole
    });

    res.status(201).json({
      message: 'Signup successful',
      user,
      accessToken,
      refreshToken
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.loginWithEmail(email, password);

    res.status(200).json({
      message: 'Login successful',
      user,
      accessToken,
      refreshToken
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};


const verifyEmail = async (req,res) =>{
  try{
    const {userEmail, otp} = req.body;
    console.log("1st run")
    const result = await authService.verifyEmail(otp,userEmail);
    console.log("final run");
    res.status(200).json({
      message:"user verified successfully",
    })
  }
  catch(err){
    console.log("Catched error")
    res.status(401).json({ error: err.message });res.status(401).json({ error: err.message });
  }
}

module.exports = {
  signupController,
  loginController,
  verifyEmail
};