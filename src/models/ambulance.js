import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema({
  name: String,
  location: String,
  oxygenSupport: String,
  emergencyType: String,
  patientName: String,
  dob: String,
  gender: String,
  contactNo: String,
  address: String,
  admissionReason: String,
  hospital_name: String,
  vehicle_no: String,
  driver_phone: String,
});

const Ambulance =
  mongoose.models.Ambulance || mongoose.model("Ambulance", ambulanceSchema);
export default Ambulance;
