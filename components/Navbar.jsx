// Navbar section
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/store/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { confirmDialog } from "primereact/confirmdialog";

export default function Navbar() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const logout = async () => {
    await axios
      .get(`/api/logout/${authCtx.userId}?userType=${authCtx.userType}`)
      .then(() => {
        toast.success("Logged out successfully");
        authCtx.updateUserId(null);
        authCtx.updateUserData(null);
        authCtx.updateUserType(null);
        authCtx.updateAuthenticationStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutConfirm = (event) => {
    confirmDialog({
      trigger: event.currentTarget,
      message: "Are you sure you want to log out?",
      header: "Logout",
      icon: "pi pi-exclamation-triangle",
      accept: () => logout(),
      reject: () => {},
    });
  };

  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.leftPart}>
          <Link href={"/"} className={styles.navLogoName}>
            <b className={styles.navLogoColor}>Ambulance.</b>AI
          </Link>
        </div>
        <div className={styles.rightPart}>
          <div className={styles.navBullets}>
            <Link
              href={"/dashboard"}
              className={
                router.pathname === "/dashboard"
                  ? "selectedNavBullet"
                  : "navBullet"
              }
            >
              Dashboard
            </Link>

            {!authCtx.isAuthenticated && (
              <Link
                href={"/login"}
                className={
                  router.pathname === "/login"
                    ? "selectedNavBullet"
                    : "navBullet"
                }
              >
                Login
              </Link>
            )}
            {authCtx.isAuthenticated && (
              <div className="navBullet" onClick={logoutConfirm}>
                Logout
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
