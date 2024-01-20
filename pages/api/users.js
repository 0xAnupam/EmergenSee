import { connectMongoDB } from "@/src/db/mongoose";
import User from "@/src/models/user";

export default async function handler(req, res) {
    if(req.method === "GET"){           // retrieve all users
        await connectMongoDB();
        const users = await User.find();
        res.status(200).send(users);
    }
    else if(req.method === "POST"){     // create new user
        const {name, email, password} = req.body;
        try{
            await connectMongoDB();
            const foundUser = await User.findOne({email});
            if(foundUser){
                return res.status(400).send({error: "Email already exists"});
            }

            const newUser = new User({
                name, email, password, userType: "user"
            });
            const savedUser = await newUser.save();
            return res.status(200).send(savedUser);
        }
        catch(err){
            console.log(err);
            res.status(400).send({msg: err});
        }
    }
}  