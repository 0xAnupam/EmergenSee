import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import Profile from "@/components/Profile";
// import ProtectedRoute from "@/hoc/ProtectedRoute";
import BookAmbulance from "@/components/BookAmbulance/BookAmbulance";
import AdmissionForm from "@/components/Admission/AdmissionForm";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/store/AuthContext";
import axios from "axios";

function Booking() {
  const [requests, setRequests] = useState([])
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function findRequests() {
      if (authCtx.isAuthenticated) {
        // setRequests(authCtx.userData.requests);
        const reqIds = [];
        for (let i = 0; i < authCtx.userData.requests.length; i++) {
        // console.log(authCtx.userData.requests[i]._id)
          await axios.get(`/api/ambulances/${authCtx.userData.requests[i]._id}`).then((res)=>{
            reqIds.push(res.data);
            // console.log(res.data);
          }).catch((err)=>{
            console.log(err);
          })
          
        }
        // console.log(reqIds)
        setRequests(reqIds);
      }
    }
    findRequests();

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
      {/* {
        requests && requests.map((data) => {
          return (
            <div >
              <h2>hello</h2>
              <button></button>
            </div>
          )
        })
      } */}
    </>
  );
}

export default Booking;
