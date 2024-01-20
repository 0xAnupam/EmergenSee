import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import Profile from "@/components/Profile";
// import ProtectedRoute from "@/hoc/ProtectedRoute";
import BookAmbulance from "@/components/BookAmbulance/BookAmbulance";
import AdmissionForm from "@/components/Admission/AdmissionForm";

function Booking() {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <BookAmbulance />

      <br />
      <br />

      <AdmissionForm />

      <br />
      <br />
    </>
  );
}

export default Booking;
