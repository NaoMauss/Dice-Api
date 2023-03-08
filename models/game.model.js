const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    ID: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
      lowercase: true,
    },
    YearPublished: {
      type: String,
      required: false,
    },
    MinPlayers: {
      type: String,
      required: true,
    },
    MaxPlayers: {
      type: String,
      required: true,
    },
    PlayTime: {
      type: String,
      required: true,
    },
    MinAge: {
      type: String,
      required: true,
    },
    UsersRated: {
      type: String,
      required: true,
    },
    RatingAverage: {
      type: String,
      required: true,
    },
    BGGRank: {
      type: String,
      required: true,
    },
    ComplexityAverage: {
      type: String,
      required: true,
    },
    OwnedUsers: {
      type: String,
      required: true,
    },
    Mechanics: {
      type: String,
      required: true,
    },
    Domains: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GameModel = mongoose.model("game", gameSchema);

module.exports = GameModel;
