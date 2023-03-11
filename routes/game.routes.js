const { Router } = require("express");
const rooterGame = require("express").Router();
const gameController = require("../controller/game.controller");

rooterGame.get("/", gameController.getAllGames);
rooterGame.get("/:id", gameController.getGame);
rooterGame.put("/:id", gameController.updateGame);
rooterGame.delete("/:id", gameController.deleteGame);
rooterGame.post("/", gameController.createGame);

module.exports = rooterGame;
