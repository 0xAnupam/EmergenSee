import { connectMongoDB } from "@/src/db/mongoose";
import User from "@/src/models/user";
import Ambulance from "@/src/models/ambulance";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // retrieve all users
    await connectMongoDB();
    const users = await Ambulance.find();
    res.status(200).send(users);
  } else if (req.method === "POST") {
    // create new user
    const { name, location, oxygenSupport, emergencyType, email } = req.body;
    // console.log(req.body.email);
    try {
      await connectMongoDB();
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(400).send({ error: "User does not exist" });
      }
      const newAmbulance = new Ambulance({
        name,
        location,
        oxygenSupport,
        emergencyType,
      });
      const savedAmbulance = await newAmbulance.save();
      foundUser.requests = foundUser.requests.concat({
        ambulance: savedAmbulance,
      });
      return res.status(200).send(savedAmbulance);
    } catch (err) {
      console.log(err);
      res.status(400).send({ msg: err });
    }
  }
  else if(req.method === "PATCH"){
    const { id, patientName, dob, gender, contactNo, address, admissionReason } = req.body;
    console.log(req.body);

    await connectMongoDB();
    const ambulance = await Ambulance.findOne({_id: id});
    ambulance.patientName = patientName;
    ambulance.dob = dob;
    ambulance.gender = gender;
    ambulance.contactNo = contactNo;
    ambulance.address = address;
    ambulance.admissionReason = admissionReason;
    await ambulance.save();
    res.status(200).send(ambulance);
  }
}
