import React from "react";
import EyelinerComponent from "../components/Eyeliner/Eyeliner";
import AddressForm from "../components/Address/AddressForm";
import CheckoutSummary from "../components/CheckOut/Checkout";
import globalStyles from '../styles/Global.module.css'

const Address = () => {
  return (
    <div>
      <EyelinerComponent name="Address" />
      <div className={globalStyles.address_and_checkout}>
        {" "}
        <AddressForm />
        <CheckoutSummary/>
      </div>
    </div>
  );
};

export default Address;
