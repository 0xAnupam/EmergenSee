// Save & Retrieve Record for a particular user

import { connectMongoDB } from "@/src/db/mongoose";
import Score from "@/src/models/ambulance";
import User from "@/src/models/user";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // retrieve all records for a user     GET /api/scores/:_id
    await connectMongoDB();
    const { id } = req.query;
    const users = await User.findOne({ _id: id });
    res.status(200).send(users.scoreboard);
  } else if (req.method === "POST") {
    // create new record for a user         POST /api/scores/:_id
    const {
      language,
      difficulty,
      quantity,
      yourScore,
      totalScore,
      rating,
      userId,
    } = req.body;
    const { id } = req.query;
    try {
      await connectMongoDB();
      const authUser = await User.findOne({ _id: id });
      if (!authUser) {
        return res
          .status(400)
          .send({ error: "Unauthorized: Please authenticate yourself" });
      }

      const createdScore = new Score({
        language,
        difficulty,
        quantity,
        userId,
        user: authUser._id,
        yourScore,
        totalScore,
      });
      const newCreatedScore = await createdScore.save();

      const newScore = {
        language,
        difficulty,
        quantity,
        yourScore,
        totalScore,
        rating,
        userId,
        _id: newCreatedScore._id,
      };

      authUser.scoreboard = authUser.scoreboard.concat(newScore);
      const savedUser = await authUser.save();

      return res.status(200).send(savedUser);
    } catch (err) {
      console.log(err);
      res.status(400).send({ msg: err });
    }
  } else if (req.method === "DELETE") {
    await connectMongoDB();

    const { id } = req.query;
    const score = await Score.findOne({ _id: id });
    const userId = score.user;

    const user = await User.findOne({ _id: userId });

    if (user) {
      // Remove the score from the user's scoreboard array
      user.scoreboard = user.scoreboard.filter((currElem) => currElem._id.toString() !== id);
      await user.save();
      await Score.deleteOne({_id: id});
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).send(score);
  }
}
