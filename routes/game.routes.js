const rooterGame = require("express").Router();
const { Router } = require("express");
const authController = require("../controller/game.controller");

rooterGame.get("/", authController.getAllGames);
rooterGame.get("/:id", authController.getGame);
rooterGame.put("/:id", authController.updateGame);
rooterGame.delete("/:id", authController.deleteGame);

module.exports = rooterGame;
