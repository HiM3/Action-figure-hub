const signup_users = require("../models/loginSchema");
const { HashPassword, PlainPassword } = require("../utils/password");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  const checkUser = await signup_users.findOne({ email });
  if (checkUser) {
    res.json({
      success: false,
      message: "Email already exists",
    });
  } else {
    if (password === confirmpassword) {
      const HashPass = await HashPassword(password);
      await signup_users.create({ username, email, password: HashPass });
      res.json({
        success: true,
        message: "Account created Successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Password should be same as confirm password",
      });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await signup_users.findOne({ email });
  if (!checkUser) {
    res.json({
      success: false,
      message: "Email not found please Signup",
    });
  } else if (checkUser) {
    const PlainPass = await PlainPassword(password, checkUser.password);
    if (!PlainPass) {
      res.json({
        success: false,
        message: "password not match",
      });
    }
    const payload = {
      id: checkUser._id,
      username: checkUser.username,
      email: checkUser.email,
      password: checkUser.password
    };
    const token = jwt.sign(payload, process.env.secret_key, {
      expiresIn: "1h",
    });
    res.header("user", token);
    res.json({
      success: true,
      message: "Login Successfully",
      token,
      checkUser
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.user.authorization;
    if (!token) {
      return res.json({
        success: false,
        message: "Token not found",
      });
    }
    res.clearCookie("user");
    res.removeHeader("user");
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    console.log(req.user)
    const id = req.user.id;
    const { current_password, new_password, confirmpassword } = req.body;

    const checkUser = await signup_users.findById(id);
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const match = await PlainPassword(current_password, checkUser.password);
    if (!match) {
      return res.json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (new_password === confirmpassword) {
      const HashPass = await HashPassword(new_password);
      await signup_users.findByIdAndUpdate(id, {
        password: HashPass,
      });
      return res.json({
        success: true,
        message: "Password Updated Successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "New password and confirm password don't match",
      });
    }
  } catch (error) {
    console.error("Change password error:", error);
    return res.json({
      success: false,
      message: "Something went wrong while changing password",
    });
  }
};
