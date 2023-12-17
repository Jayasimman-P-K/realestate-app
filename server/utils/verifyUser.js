const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "UnAuthorized"));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden Entry"));

    req.user = user;
    next();
  });
};
