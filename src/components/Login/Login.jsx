// LoginForm.js
import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === formData.email);

    if (!user) {
      toast.error("User does not exist.");
      return;
    }

    if (user.password !== formData.password) {
      toast.error("Incorrect password.");
      return;
    }

    login(user); 

    setFormData({
      email: "",
      password: "",
    });

    toast.success(`Welcome, ${user.firstName || "User"}!`);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.label_and_input}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.label_and_input}>
          <label className={styles.label}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={togglePasswordVisibility}
            >
              SHOW
            </button>
          </div>
        </div>

        <p className={styles.forgot}>Forgot your password?</p>

        <button className={styles.signInBtn} type="submit">
          SIGN IN
        </button>

        <div className={styles.createAccount}>
          No account?{" "}
          <Link to="/registration" className={styles.createLink}>
            Create one here
          </Link>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LoginForm;
