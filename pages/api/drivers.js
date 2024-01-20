import { connectMongoDB } from "@/src/db/mongoose";
import Driver from "@/src/models/driver";

export default async function handler(req, res) {
    if(req.method === "GET"){           // retrieve all drivers
        await connectMongoDB();
        const drivers = await Driver.find();
        res.status(200).send(drivers);
    }
    else if(req.method === "POST"){     // create new driver
        const {name, email, password, hospitalName, vehicleNo, oxygenSupport} = req.body;
        try{
            await connectMongoDB();
            const foundDriver = await Driver.findOne({email});
            if(foundDriver){
                return res.status(400).send({error: "Email already exists"});
            }

            const newDriver = new Driver({
                name, email, password, hospitalName, vehicleNo, oxygenSupport, userType: "driver", available: false
            });
            const savedDriver = await newDriver.save();
            return res.status(200).send(savedDriver);
        }
        catch(err){
            console.log(err);
            res.status(400).send({msg: err});
        }
    }
}