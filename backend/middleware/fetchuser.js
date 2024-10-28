// middleware/fetchuser.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'WelcometoInotebook$$$$user';

const fetchuser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('auth-token');

  // If there is no token, return an unauthorized response
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  try {
    // Verify the token and extract the user payload
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = fetchuser;
