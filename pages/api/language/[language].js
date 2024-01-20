// Retrieve leaderboard for a particular language

import { connectMongoDB } from "@/src/db/mongoose";
import Score from "@/src/models/ambulance";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // retrieve leaderboard for a language   GET /api/language/:language
    try {
      await connectMongoDB();
      const { language } = req.query;
      const scores = await Score.find({ language: language });
      res.status(200).send(scores);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}