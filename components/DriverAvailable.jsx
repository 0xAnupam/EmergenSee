import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import AuthContext from "@/store/AuthContext";
import "react-toggle/style.css" // for ES6 modules
import Toggle from "react-toggle";
import axios from "axios";
import toast from "react-hot-toast";

export default function DriverAvailable(){
    const authCtx = useContext(AuthContext);
    const [available, setAvailable] = useState(false);
    useEffect(()=>{
        if(authCtx.userData && authCtx.userData.available){
            setAvailable(true);
        }
        else setAvailable(false);
    }, [])

    const toggleAvailabiity = ()=>{
        axios.patch(`/api/users/${authCtx.userId}?userType=${authCtx.userType}`).then((res) => {
            toast.success("Availability updated successfully");
            setAvailable(!available);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <>
            <Toggle checked={available} onChange={toggleAvailabiity}/>
        </>
    )
}