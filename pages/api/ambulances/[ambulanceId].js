import { connectMongoDB } from "@/src/db/mongoose";
import User from "@/src/models/user";
import Ambulance from "@/src/models/ambulance";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { ambulanceId } = req.query;
    const { hospital_name, vehicle_no, driver_phone } = req.body;

    await connectMongoDB();
    const ambulance = await Ambulance.findOne({ _id: ambulanceId });
    console.log(hospital_name, vehicle_no);
    ambulance.hospital_name = hospital_name;
    ambulance.vehicle_no = vehicle_no;
    ambulance.driver_phone = driver_phone;
    await ambulance.save();
    res.status(200).send(ambulance);
  }
}
