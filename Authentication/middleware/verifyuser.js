const jwt = require("jsonwebtoken");

exports.verifyuser = async (req, res, next) => {
  try {
    console.log("Authorization header:", req.headers.authorization);
    
    let token = req.headers.authorization;
    if (!token) {
      return res.json({
        success: false,
        message: "Token not found",
      });
    }

    // Remove 'Bearer ' prefix if present
    token = token.startsWith('Bearer ') ? token.split(" ")[1] : token;
    console.log("Token after processing:", token);

    try {
      const verifyuser = jwt.verify(token, process.env.secret_key);
      if (!verifyuser) {
        return res.json({
          success: false,
          message: "Invalid token",
        });
      }
      req.user = verifyuser;
      next();
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      return res.json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Middleware error:", error);
    return res.json({
      success: false,
      message: "Authentication failed",
    });
  }
};
