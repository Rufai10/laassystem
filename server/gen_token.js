const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = jwt.sign({ id: '893de465-c0b4-43bd-b05f-72a762944244' }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

console.log(token);
