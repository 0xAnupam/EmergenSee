// Login Section
import { useState } from "react";
import styles from "../styles/Home.module.css";
import toast from "react-hot-toast";
import axios from "axios";

export default function Register({ onLogin, onDriver }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
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
        await axios.post("/api/users", {name, email, password});
        onLogin();
    }
    catch(err){
        toast.error(err);
    }finally{
        toast.success("User registered successfully");
    }
  };
  return (
    <>
      <div className={styles.loginContainer}>
        <h2>Register | User</h2>
        <div className={styles.loginInputBox}>
          <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

          <button onClick={register}>Register User</button>
          <div className={styles.registerText}>
            <span onClick={onDriver}>Register as Driver</span>
          </div>
          <div className={styles.registerText}>
            Already have an account? <span onClick={onLogin}>Login</span>
          </div>
        </div>
      </div>
    </>
  );
}
