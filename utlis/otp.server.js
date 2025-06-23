const crypto = require('crypto');

function generateOTP(length = 6, expiryMinutes = 10) {
  const otp = Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);
  return { otp, expiresAt };
}

module.exports = {
  generateOTP
};