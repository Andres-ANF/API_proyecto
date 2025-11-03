const jwt = require('jsonwebtoken');

const payload = {
  id: 1,           // id de usuario simulado
  username: 'admin' // cualquier nombre
};

const secret = 'miSecretoSuperSeguro'; // mismo que tu auth.js
const options = { expiresIn: '1h' };  // caduca en 1 hora

const token = jwt.sign(payload, secret, options);
console.log("Token generado:", token);
