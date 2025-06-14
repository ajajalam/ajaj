const signupService = require('../services/auth.service');
const authService = require('../services/auth.service');

const signupController = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userPhone, countryCode } = req.body;

    const { user, accessToken, refreshToken } = await signupService.signupWithEmail({
      userName,
      userEmail,
      userPassword,
      userPhone,
      countryCode
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

module.exports = {
  signupController,
  loginController
};