const { ObjectId } = require("mongodb");
const GameModel = require("../models/game.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllGames = async (req, res) => {
  const games = await GameModel.find();
  res.status(200).json(games);
};

module.exports.getGame = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  GameModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("ID unknow :" + err);
  });
};

module.exports.updateGame = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    await GameModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          Name: req.body.Name,
          YearPublished: req.body.YearPublished,
          MinPlayers: req.body.MinPlayers,
          MaxPlayers: req.body.MaxPlayers,
          PlayTime: req.body.PlayTime,
          MinAge: req.body.MinAge,
          UsersRated: req.body.UsersRated,
          RatingAverage: req.body.RatingAverage,
          BGGRank: req.body.BGGRank,
          ComplexityAverage: req.body.ComplexityAverage,
          OwnedUsers: req.body.OwnedUsers,
          Mechanics: req.body.Mechanics,
          Domains: req.body.Domains,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteGame = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    await GameModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.createGame = async (req, res) => {
  const newGame = new GameModel({
    Name: req.body.Name,
    YearPublished: req.body.YearPublished,
    MinPlayers: req.body.MinPlayers,
    MaxPlayers: req.body.MaxPlayers,
    PlayTime: req.body.PlayTime,
    MinAge: req.body.MinAge,
    UsersRated: req.body.UsersRated,
    RatingAverage: req.body.RatingAverage,
    BGGRank: req.body.BGGRank,
    ComplexityAverage: req.body.ComplexityAverage,
    OwnedUsers: req.body.OwnedUsers,
    Mechanics: req.body.Mechanics,
    Domains: req.body.Domains,
  });

  try {
    const game = await newGame.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
