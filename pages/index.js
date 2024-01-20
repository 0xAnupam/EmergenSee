import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";

export default function IndexPage(){

  
  return (
    <>
      <Navbar/>
      <div className={styles.homeContainer}>
        <h2>Welcome to Ambulance.AI</h2>
      </div>
    </>
  )
}