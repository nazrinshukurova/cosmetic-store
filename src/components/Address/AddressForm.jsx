import React, { useState, useEffect } from "react";
import styles from "./AddressForm.module.css";
import { Link } from "react-router-dom";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    alias: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    addressComplement: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
    useForInvoice: true,
  });

  const states = ["California", "New York", "Texas", "Florida", "Illinois"];

  useEffect(() => {
    const savedData = localStorage.getItem("addressFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("addressFormData", JSON.stringify(formData));
    console.log("Form submitted and saved:", formData);
  };

  return (
    <div className={styles.full_form}>
      {" "}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.personal_information}>Personal Information ✔ </h2>
        <p>
          The selected address will be used for personal and delivery purposes.
        </p>

        <label className={styles.address_label}>
          First name
          <input
            className={styles.address_input}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>

        <label className={styles.address_label}>
          Last name
          <input
            className={styles.address_input}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>

        <label className={styles.address_label}>
          Company
          <input
            className={styles.address_input}
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </label>

        <label className={styles.address_label}>
          Address
          <input
            className={styles.address_input}
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>

        <label className={styles.address_label}>
          Address Complement
          <input
            className={styles.address_input}
            name="addressComplement"
            value={formData.addressComplement}
            onChange={handleChange}
          />
        </label>

        <label className={styles.address_label}>
          City
          <input
            className={styles.address_input}
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>

        <label className={styles.address_label}>
          State
          <select
            className={styles.address_select}
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Please choose</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.address_label}>
          Zip/Postal Code
          <input
            className={styles.address_input}
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </label>

        <label className={styles.address_label}>
          Country
          <select
            className={styles.address_select}
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
        </label>

        <label className={styles.address_label}>
          Phone
          <input
            className={styles.address_input}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label className={styles.checkbox}>
          <input
            className={styles.address_input}
            type="checkbox"
            name="useForInvoice"
            checked={formData.useForInvoice}
            onChange={handleChange}
          />
          Use this address for invoice too
        </label>

        <button type="submit" className={styles.continue}>
          Continue
        </button>
      </form>
      <Link style={{ textDecoration: "none", color: "#222" }} to="/cart">
        <h2
          style={{ marginTop: "20px", fontSize: "17px" }}
          className={styles.personal_information}
        >
          Back
        </h2>
      </Link>{" "}
    </div>
  );
};

export default AddressForm;
