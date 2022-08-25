const express = require('express');
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const router = express.Router();
const { schemas } = require("../validator/schemas");
const { middleware } = require('../middleware/validatorMiddleware');
router.post('/signup', middleware(schemas.signUp), signup);
router.post("/signin", middleware(schemas.signIn), signin);
router.get("/signout", signout);

//any route containing :userId our app will first execute userById()
router.param("userId", userById);
module.exports = router;