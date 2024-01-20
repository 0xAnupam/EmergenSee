"use client";

import React, { useContext, useState } from "react";
import styles from "./BookAmbulance.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import AuthContext from "@/store/AuthContext";

const BookAmbulance = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [oxygenSupport, setOxygenSupport] = useState(false);

  const authCtx = useContext(AuthContext);
  // console.log(authCtx);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name.trim().length == 0 ||
      location.trim().length === 0 ||
      emergencyType.trim().length === 0
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    try {
      await axios.post("/api/ambulances", {
        name,
        location,
        oxygenSupport,
        emergencyType,
        email: authCtx.userData.email,
      });
      setName("");
      setLocation("");
      setEmergencyType("");
      setOxygenSupport(false);
      toast.success("Finding nearby ambulance");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Book Ambulance</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="location" className={styles.label}>
            Location:
          </label>
          <input
            type="text"
            value={location}
            name="location"
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="oxygen" className={styles.label}>
            Need Oxygen Cylinder:
          </label>
          <input
            type="checkbox"
            checked={oxygenSupport}
            onChange={() => setOxygenSupport(!oxygenSupport)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="emergency" className={styles.label}>
            Emergency Type:
          </label>
          <input
            type="text"
            value={emergencyType}
            name="emergency"
            onChange={(e) => setEmergencyType(e.target.value)}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Book Ambulance
        </button>
      </form>
    </div>
  );
};

export default BookAmbulance;
