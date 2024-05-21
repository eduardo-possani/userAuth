const jwt = require('jsonwebtoken');
const secretKey = '53fffebd-1eaf-4dc1-b67b-13e5a45e847a';

const authenticateToken = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'].split(' ')[1];
  console.log(authHeader);
  if (authHeader == null) {
    return res.status(401).json({err: "Access denied"});
  }
  jwt.verify(authHeader, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({err: "Access denied"});
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
