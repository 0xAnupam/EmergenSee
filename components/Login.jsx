// Login Section
import { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import AuthContext from "@/store/AuthContext";

export default function Login({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("user");

  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const login = async () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      toast.error("All fields are mandatory");
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const isEmailValid = emailRegex.test(email);
    if (!isEmailValid) {
      toast.error("Invalid email input");
      return;
    }

    // logging in database
    try {
      axios.post("/api/login", { email, password, loginType }).then((response) => {
        toast.success("Logged in successfully");
        const data = response.data;
        authCtx.updateAuthenticationStatus(true);
        authCtx.updateUserData(data);
        authCtx.updateUserId(data._id);
        authCtx.updateUserType(data.userType);

        router.push("/dashboard");
      });
      // console.log(response.data);
      // const token = response.data;
      // Cookies.set('ambulanceAI', token, { expires: 1 });
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <div className={styles.loginInputBox}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="o2div">
            <label htmlFor="oxygen_support" className="o2Support">
              Login Type:{" "}
            </label>
            <select
              name="loginType"
              value={loginType}
              onChange={(e) => {
                setLoginType(e.target.value);
              }}
              id="loginType"
            >
              <option value={"user"}>User</option>
              <option value={"driver"}>Driver</option>
              <option value={"admin"}>Hospital Admin</option>
            </select>
          </div>
          <button onClick={login}>Login</button>
          <div className={styles.registerText}>
            Don't have an account? <span onClick={onRegister}>Register</span>
          </div>
        </div>
      </div>
    </>
  );
}
