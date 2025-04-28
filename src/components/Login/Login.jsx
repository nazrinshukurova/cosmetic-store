// LoginForm.js
import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../client";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Supabase-dan user axtar
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", formData.email)
      .single(); // yalnız bir user gözləyirik

    if (error || !data) {
      toast.error("User does not exist.");
      return;
    }

    if (data.password !== formData.password) {
      toast.error("Incorrect password.");
      return;
    }

    login(data); // AuthContext-ə göndər

    setFormData({
      email: "",
      password: "",
      showPassword: false,
    });

    toast.success(`Welcome, ${data.name || "User"}!`);

    navigate("/"); // login-dən sonra yönləndir
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
