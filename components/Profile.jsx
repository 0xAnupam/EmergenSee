import { useContext } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import AuthContext from "@/store/AuthContext";
import DriverAvailable from "./DriverAvailable";

export default function Profile(){
    const authCtx = useContext(AuthContext);

    return (
        <>
            <div className={styles.profileContainer}>
                <div className={styles.profileLeft}>
                    <Image src={"/profile.png"} width={300} height={300} alt="profile" className={styles.profileDp}/>
                </div>
                <div className={styles.profileRight}>
                    <span className={styles.authorName}>{authCtx.isAuthenticated && authCtx.userData.name}</span>
                    <span className={styles.authorId}>{authCtx.isAuthenticated && authCtx.userData.email}</span>
                    <span className={styles.authorId}>{authCtx.isAuthenticated && authCtx.userData._id}</span>
                    <span className={styles.authorType}>{authCtx.isAuthenticated && authCtx.userData && authCtx.userData.email==="halderarindam10000@gmail.com"?  "admin" : authCtx.userData.userType}</span>
                </div>

                {authCtx.isAuthenticated && authCtx.userData && authCtx.userData.userType==="driver" && <DriverAvailable/>}
            </div>
        </>
    )
}