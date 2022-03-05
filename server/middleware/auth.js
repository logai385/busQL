const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization") 
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token)
    return res
      .sendStatus(401)
      .json({ success: false, message: "Access denied. No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    return res
      .sendStatus(403)
      .json({ success: false, message: "Invalid token" });
  }
};
module.exports = verifyToken;