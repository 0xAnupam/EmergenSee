"use client";

import React, { useState } from "react";
import styles from "./AdmissionForm.module.css";
import toast from "react-hot-toast";
import axios from "axios";

const AdmissionForm = () => {
  const [patientName, setPatientName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [admissionReason, setAdmissionReason] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/ambulances", {
        id,
        patientName,
        dob,
        gender,
        contactNo,
        address,
        admissionReason,
      });
      toast.success("Form submitted successfully");

      setPatientName("");
      setDob("");
      setGender("");
      setContactNo("");
      setAddress("");
      setAdmissionReason("");
      setId("");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Hospital Admission Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="id" className={styles.label}>
            Input ID:
          </label>
          <input
            type="text"
            value={id}
            name="id"
            onChange={(e) => setId(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Patient Name:
          </label>
          <input
            type="text"
            value={patientName}
            name="name"
            onChange={(e) => setPatientName(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="dob" className={styles.label}>
            Date of Birth:
          </label>
          <input
            type="date"
            value={dob}
            name="dob"
            onChange={(e) => setDob(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={styles.input}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="contactNo" className={styles.label}>
            Contact Number:
          </label>
          <input
            type="tel"
            value={contactNo}
            name="contactNo"
            onChange={(e) => setContactNo(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="address" className={styles.label}>
            Address:
          </label>
          <input
            type="text"
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="reason" className={styles.label}>
            Admission Reason:
          </label>
          <input
            type="text"
            value={admissionReason}
            name="reason"
            onChange={(e) => setAdmissionReason(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit Admission Form
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
