const router = require("express").Router();
//Validation stuffs
const {
  signup,
  login,
  getAuthenticatedUser,
} = require("../handlers/usersHandler");

//Sign up route
router.post("/signup", signup);
router.post("/login", login);
// router.get("/user", getAuthenticatedUser);

module.exports = router;
