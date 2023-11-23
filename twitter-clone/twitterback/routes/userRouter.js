/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");

// userRouter.delete("/:id", userController.getUserById);

userRouter.post("/login", userController.login );
userRouter.post("/register", userController.register );

module.exports = userRouter;
