import { connectMongoDB } from "@/src/db/mongoose";
import User from "@/src/models/user";
import Driver from "@/src/models/driver";

export default async function handler(req, res) {
    const {userId, userType} = req.query;
    if(req.method === "GET"){           // retrieve particular user data
        await connectMongoDB();
        if(userType==="user" || userType==="admin"){
            const user = await User.findOne({_id: userId});
            res.status(200).send({_id: user._id, name: user.name, email: user.email, requests: user.requests});
        }
        else{
            const driver = await Driver.findOne({_id: userId});
            res.status(200).send({_id: driver._id, name: driver.name, email: driver.email, hospitalName: driver.hospitalName, vehicleNo: driver.vehicleNo, oxygenSupport: driver.oxygenSupport});
        }
    }
    else if(req.method==="PATCH"){
        await connectMongoDB();
        if(userType==="driver"){
            const driver = await Driver.findOne({_id: userId});
            driver.available = !driver.available;
            await driver.save();
            res.status(200).send(driver);
        }
    }
}