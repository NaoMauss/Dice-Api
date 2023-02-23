const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trimp: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 6,
    },
    links: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const GameModel = mongoose.model("game", gameSchema);

module.exports = GameModel;
