// Login Section
import { useState } from "react";
import styles from "../styles/Home.module.css";
import toast from "react-hot-toast";
import axios from "axios";

export default function RegisterDriver({ onLogin, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [oxygenSupport, setOxygenSupport] = useState(false);

  const register = async () => {
    if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || hospitalName.trim().length === 0 || vehicleNo.trim().length === 0 || oxygenSupport.trim().length === 0) {
      toast.error("All fields are mandatory");
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const isEmailValid = emailRegex.test(email);
    if(!isEmailValid){
        toast.error("Invalid email input");
        return;
    }

    // register in database
    try{
        await axios.post("/api/drivers", {name, email, password, hospitalName, vehicleNo, oxygenSupport});
        onLogin();
    }
    catch(err){
        console.log(err);
        // toast.error(err);
    }finally{
        toast.success("Driver registered successfully");
    }
  };
  return (
    <>
      <div className={styles.loginContainer}>
        <h2>Register | Driver</h2>
        <div className={styles.loginInputBox}>
          <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <select name="hospital_name" value={hospitalName} onChange={(e)=>{setHospitalName(e.target.value)}}>
            <option value="" hidden>Choose hospital</option>
            <option value="techno_dama">Techno India Dama</option>
            <option value="amri">AMRI Hospital - Salt Lake</option>
            <option value="nrs">NRS Medical College & Hospital</option>
          </select>
          <input type="text" placeholder="Enter your Vehicle No." value={vehicleNo} onChange={(e)=>{setVehicleNo(e.target.value)}}/>
          <div className="o2div">
            <label htmlFor="oxygen_support" className="o2Support">Oxygen Support: </label>
            <select name="oxygen_support" value={oxygenSupport} onChange={(e)=>{setOxygenSupport(e.target.value)}} id="oxygen_support">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
          </div>

          <button onClick={register}>Register Driver</button>
          <div className={styles.registerText}>
            <span onClick={onRegister}>Register as User</span>
          </div>
          <div className={styles.registerText}>
            Already have an account? <span onClick={onLogin}>Login</span>
          </div>
        </div>
      </div>
    </>
  );
}
