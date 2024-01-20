import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import Profile from "@/components/Profile";
import ProtectedRoute from "@/hoc/ProtectedRoute";

function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <Profile/>
      </div>
    </>
  );
}

export default ProtectedRoute(DashboardPage);
