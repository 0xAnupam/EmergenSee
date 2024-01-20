import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import Profile from "@/components/Profile";
// import ProtectedRoute from "@/hoc/ProtectedRoute";
import BookAmbulance from "@/components/BookAmbulance/BookAmbulance";
import AdmissionForm from "@/components/Admission/AdmissionForm";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/store/AuthContext";

function Booking() {
  const [requests, setRequests] = useState([])
  const authCtx = useContext(AuthContext);
  useEffect(()=>{
    if(authCtx.isAuthenticated){
      setRequests(authCtx.userData.requests);
      // authCtx.userData.requests.map
    }
  }, [authCtx.isAuthenticated])

  
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
      {
        requests && requests.map((data)=>{
          return (
            <div>
            <h2>hello</h2>
              <button></button>
            </div>
          )
        })
      }
    </>
  );
}

export default Booking;
