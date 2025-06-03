const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
  console.log("🛡️ Auth middleware triggered");
  try {
    // const token =
    // req.body.token || req.header("Authorization").replace("Bearer ", "");`
    const token = req.headers.authorization?.split(" ")[1];

    console.log(req.body);
    console.warn(`token : ${token}`);
    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.currentUser = decode;
      // console.warn(`currentUser : ${decode}`);
      // console.warn(`req.currentUser : ${req.currentUser}`);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token in Invalid",
        error: error.message,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
      error: error.message,
    });
  }
};

module.exports = auth;
