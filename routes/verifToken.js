const jwt = require("jsonwebtoken");

const veriyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({
      status: res.statusCode,
      msg: "Access Denied",
    });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({
      status: res.statusCode,
      message: "Token tidak valid",
    });
  }
};

module.exports = veriyToken;
