import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useCart } from "../../context/AddToCard";
import { supabase } from "../../client";
import { Link, useLocation } from "react-router-dom";

const CheckoutSummary = () => {
  const [promoVisible, setPromoVisible] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const { countOfItems, totalPrice, shippingCost } = useCart();

  const applyPromoCode = async () => {
    setPromoError("");

    if (isPromoApplied) {
      setDiscountPercent(0);
      setIsPromoApplied(false);
      setPromoCode("");
      return;
    }

    let { data, error } = await supabase.from("Promocodes").select("*");

    if (error || !data || data.length === 0) {
      setPromoError("Failed to apply promo code");
      return;
    }

    const codes = data[0];
    if (promoCode === codes.percent30) {
      setDiscountPercent(30);
      setIsPromoApplied(true);
    } else if (promoCode === codes.percent40) {
      setDiscountPercent(40);
      setIsPromoApplied(true);
    } else if (promoCode === codes.percent20) {
      setDiscountPercent(20);
      setIsPromoApplied(true);
    } else if (promoCode === codes.percent50) {
      setDiscountPercent(40);
      setIsPromoApplied(true);
    } else if (promoCode === codes.percent60) {
      setDiscountPercent(40);
      setIsPromoApplied(true);
    } else {
      setPromoError("Invalid promo code");
      setDiscountPercent(0);
      setIsPromoApplied(false);
    }
  };

  const discountedTotal = totalPrice * (1 - discountPercent / 100);
  const finalTotal = discountedTotal + shippingCost;
  const discount = totalPrice - discountedTotal;

  console.log(totalPrice - discountedTotal); //98
  console.log(finalTotal, "vergili qiymet");
  console.log(discountedTotal, "vergisiz qiymet");

  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        {" "}
        <div className={styles.row}>
          <span>{countOfItems} items</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className={styles.totalSection}>
          <div className={styles.row}>
            <span>Total (tax excl.)</span>
            <span>${discountedTotal.toFixed(2)}</span>
          </div>
          <div className={styles.row}>
            <span>Total (tax incl.)</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
          <div className={styles.row}>
            <span>Discount:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        </div>
        {!promoVisible && (
          <p className={styles.link} onClick={() => setPromoVisible(true)}>
            Have a promo code?
          </p>
        )}
        {promoVisible && (
          <div className={styles.promoSection}>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className={styles.input}
              disabled={isPromoApplied} 
            />
            <button onClick={applyPromoCode} className={styles.addButton}>
              {isPromoApplied ? "REMOVE" : "ADD"}
            </button>
            <p className={styles.link} onClick={() => setPromoVisible(false)}>
              Close
            </p>
            {promoError && <p className={styles.error}>{promoError}</p>}
          </div>
        )}
        <p className={styles.offers}>
          Take advantage of our exclusive offers:
          <span className={styles.promoHighlight}> PROMO </span> -{" "}
          <span className={styles.promoText}>Promo Code</span>
        </p>
        {location.pathname !== "/address" && (
          <Link style={{ textDecoration: "none" }} to="/address">
            <button className={styles.checkoutButton}>
              PROCEED TO CHECKOUT
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
