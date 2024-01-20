import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema(
    {
        name: String,
        location: String,
        oxygenSupport: String,
        emergencyType: String,
        patientName: String,
        dob: String,
        gender: String,
        contactNo: String,
        address: String,
        admissionReason: String
    }
);

const Ambulance = mongoose.models.Ambulance || mongoose.model("Ambulance", ambulanceSchema);
export default Ambulance;