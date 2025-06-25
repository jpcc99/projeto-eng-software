const jwt = require('jsonwebtoken');
require('dotenv').config()

// Gen with crypto.randomBytes(64).toString('hex')
const JWT_SECRET =
  process.env.JWT_SECRET ||
  '12a3c334957b2c1c8324d2f0e49cadfb51aa1af7aa8ce515d2f2588a842b3942c4ea8a0e2f6bd66c9ba3b844e3be40b563bd429ada2665b718d4d10de6e5e430';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const gerarToken = (matricula, tipoUsuario) => {
  return jwt.sign({ matricula, tipoUsuario }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const veirificarToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  gerarToken,
  veirificarToken,
  JWT_SECRET,
};

