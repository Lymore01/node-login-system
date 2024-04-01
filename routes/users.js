// handle all imports
const express = require("express");
const userRoute = express.Router();
const passport = require("../Authentication/passport");
const authenticateUser = require("../middleware/authenticateUser")
const userController = require("../controllers/userController")


// middlewares

userRoute.use(passport.initialize());
userRoute.use(passport.session());


userRoute.get('/all', userController.getAllUsers);
userRoute.get('/:id', userController.getUserById);
userRoute.post('/post-user', userController.postUser);
userRoute.post('/login',authenticateUser, passport.authenticate("local"), userController.loginUser);




module.exports = userRoute;
