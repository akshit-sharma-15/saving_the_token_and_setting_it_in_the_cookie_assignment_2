const jwt = require('jsonwebtoken');

// Encrypt: Generate a JWT with payload, secret, and optional expiry
const encrypt = (payload, secret, expiresIn = '1h') => {
  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    console.error('Error generating JWT:', error.message);
    return null;
  }
};

// Decrypt: Verify and decode a JWT
const decrypt = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token has expired');
      return { error: 'Token expired' };
    }
    console.error('Invalid token:', error.message);
    return { error: 'Invalid token' };
  }
};

// Demo function to test both encryption and decryption
const run = () => {
  const payload = { userId: 1, role: 'admin' };
  const secret = 'secret';
  const token = encrypt(payload, secret);

  console.log('Generated JWT:', token);

  const decoded = decrypt(token, secret);
  console.log('Decoded Payload:', decoded);
};

run();

module.exports = {
  encrypt,
  decrypt
};
