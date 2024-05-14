const jwt = require('jsonwebtoken');

const authenticateToken = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) {
    return res.sendStatus(401);
  }
  jwt.verify(authHeader, 'duardoNIcola', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
