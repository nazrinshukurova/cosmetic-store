import React, { useState } from "react";
import styles from "./Register.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { supabase } from "../../client";


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    offers: false,
    newsletter: false,
    privacy: false,
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthdate: "",
      offers: false,
      newsletter: false,
      privacy: false,
      terms: false,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.privacy)
      newErrors.privacy = "You must agree to data privacy.";
    if (!formData.terms) newErrors.terms = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the validation errors.");
      return;
    }

    try {
      // Emailin bazada olub olmadığını yoxla
      const { data: existingUsers, error: fetchError } = await supabase
        .from("Users")
        .select("email")
        .eq("email", formData.email);

      if (fetchError) throw fetchError;

      if (existingUsers.length > 0) {
        toast.error("User with this email already exists.");
        return;
      }

      // Yeni istifadəçini əlavə et
      const { data, error } = await supabase.from("Users").insert([
        {
          name: formData.firstName,
          surname: formData.lastName,
          email: formData.email,
          password: formData.password,
          date: formData.birthdate,
        },
      ]);

      if (error) throw error;

      toast.success("Account created successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.register_container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.have_login}>
            Already have an account?{" "}
            <Link style={{ color: "#222" }} to="/login">
              Log in instead!
            </Link>
          </p>

          <div className={styles.register_row}>
            <label>Social title:</label>
            <label>
              <input
                type="radio"
                name="title"
                value="Mr."
                onChange={handleChange}
                checked={formData.title === "Mr."}
              />{" "}
              Mr.
            </label>
            <label>
              <input
                type="radio"
                name="title"
                value="Mrs."
                onChange={handleChange}
                checked={formData.title === "Mrs."}
              />{" "}
              Mrs.
            </label>
          </div>

          <input
            className={styles.register_input}
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName}</p>
          )}

          <input
            className={styles.register_input}
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

          <input
            className={styles.register_input}
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <input
            className={styles.register_input}
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <input
            className={styles.register_input}
            name="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
          />

          <label className={styles.register_checkbox}>
            <input
              type="checkbox"
              name="offers"
              checked={formData.offers}
              onChange={handleChange}
            />
            Receive offers from our partners
          </label>

          <label className={styles.register_checkbox}>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            Sign up for our newsletter
          </label>

          <label className={styles.register_checkbox}>
            <input
              type="checkbox"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
            />
            Customer data privacy
          </label>
          {errors.privacy && <p className={styles.error}>{errors.privacy}</p>}

          <label className={styles.register_checkbox}>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            I agree to the terms and conditions
          </label>
          {errors.terms && <p className={styles.error}>{errors.terms}</p>}

          <button className={styles.save} type="submit">
            SAVE
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default RegisterForm;
