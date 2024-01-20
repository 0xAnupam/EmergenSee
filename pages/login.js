import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Register from "@/components/Register";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import LoginRoute from "@/hoc/LoginRoute";
import RegisterDriver from "@/components/RegisterDriver";

function LoginPage() {
  const [visibleFlag, setVisibleFlag] = useState(0);

  return (
    <>
      <Navbar />
      <div className={styles.homeContainer}>
        {visibleFlag===0 && <Login onRegister={()=>{setVisibleFlag(1)}} onDriver={()=>{setVisibleFlag(2)}}/>}
        {visibleFlag===1 && <Register onLogin={()=>{setVisibleFlag(0)}} onDriver={()=>{setVisibleFlag(2)}}/>}
        {visibleFlag===2 && <RegisterDriver onLogin={()=>{setVisibleFlag(0)}} onRegister={()=>{setVisibleFlag(1)}}/>}
      </div>
    </>
  );
}

export default LoginRoute(LoginPage);