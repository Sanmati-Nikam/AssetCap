const { Signup, Signout, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/user-verification", userVerification);
router.post("/signup", Signup);
router.post("/signout", Signout);
router.post("/login", Login);
module.exports = router;