// Logout from an account:     GET /api/logout/:_id

import { connectMongoDB } from "@/src/db/mongoose";
import User from "@/src/models/user";
import Driver from "@/src/models/driver";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id, userType } = req.query;
      const cookies = cookie.parse(req.headers.cookie || "");
      const token = cookies.ambulanceAI;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Find the person by the token
      await connectMongoDB();
      if(userType==="user" || userType==="admin"){
        const user = await User.findOne({ _id: id, "tokens.token": token });

        if (user) {
          // Remove the token from the user's tokens array
          user.tokens = user.tokens.filter(
            (currElem) => currElem.token !== token
          );
          await user.save();
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }
      else{
        const driver = await Driver.findOne({ _id: id, "tokens.token": token });

        if (driver) {
          // Remove the token from the user's tokens array
          driver.tokens = driver.tokens.filter(
            (currElem) => currElem.token !== token
          );
          await driver.save();
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }

      // Clear the authentication token from the user's browser
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("ambulanceAI", "", {
          httpOnly: true,
          maxAge: 0,
          path: "/",
        })
      );

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}