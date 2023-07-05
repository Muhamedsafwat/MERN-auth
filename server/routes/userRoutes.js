//user routes : api/users
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
//import controller functions
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

//connecting routes to controller//
//login user & create token
router.post("/auth", authUser);
//create new user
router.post("/", registerUser);
//logout & destroy token
router.post("/logout", logoutUser);
//get user profile data
router.get("/profile", protect, getUserProfile);
//update user profile
router.put("/profile", protect, updateUserProfile);

module.exports = router;
