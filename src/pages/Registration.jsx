import React from "react";
import EyelinerComponent from "../components/Eyeliner/Eyeliner";
import RegisterForm from "../components/Register/Register";
import globalStyles from '../styles/Global.module.css'

const Registration = () => {
  return (
    <div>
      <EyelinerComponent />
      <div className={globalStyles.register_container}>
        {" "}
        <RegisterForm />
      </div>{" "}
    </div>
  );
};

export default Registration;
