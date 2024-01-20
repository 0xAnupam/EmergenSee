import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
export default function IndexPage() {


  return (
    <>
      <Navbar />
      <div className={styles.homeContainer}>
        <h2>Welcome to</h2>
        <section>
          <div class="content">
            <h2>Ambulance.AI</h2>
            <h2>Ambulance.AI</h2>
          </div>
        </section>
      </div>
    </>
  )
}