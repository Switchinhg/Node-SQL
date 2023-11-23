/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const tweetsRouter = express.Router();

const tweetsController = require("../controllers/tweetsController");

// userRouter.delete("/:id", userController.getUserById);

tweetsRouter.get("/", tweetsController.getAll );
tweetsRouter.post("/new", tweetsController.newTweet );


module.exports = tweetsRouter;

