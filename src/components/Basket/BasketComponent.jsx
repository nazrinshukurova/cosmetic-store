import React from "react";
import { useCart } from "../../context/AddToCard";
import styles from "./Basket.module.css";
import close from "../../assets/close.svg";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const BasketComponent = ({ onClose }) => {
  const {
    cartItems,
    countOfItems,
    updateQuantity,
    removeFromCart,
    totalPrice,
    shippingCost,
  } = useCart();

  return (
    <div className={styles.basket_container}>
      <div className={styles.card_container}>
        <div className={`${styles.full_container} ${styles.show}`}>
          <div className={styles.top_block_cart}>
            <div className={styles.toggle_title}>
              Shopping Cart ({countOfItems})
            </div>
            <button className={styles.onClose} onClick={onClose}>
              <img className={styles.close} src={close} alt="Close basket" />
            </button>
          </div>
          <div className={styles.wishlist_container}>
            {cartItems.length === 0 ? (
              <div className={styles.empty_basket}>Your basket is empty</div>
            ) : (
              cartItems.map((item) => (
                <div className={styles.wishlist} key={item.id || item.name}>
                  <img
                    className={styles.product_image}
                    src={
                      typeof item.images === "string"
                        ? item.images
                        : "/placeholder.jpg"
                    }
                    alt={item.name || "Product image"}
                  />
                  <div className={styles.description_box}>
                    <span className={styles.description}>{item.name}</span>
                    <div className={styles.prices_box}>
                      <span className={styles.price}>
                        {typeof item.price === "number"
                          ? `$${item.price.toFixed(1)}`
                          : "Price: N/A"}
                      </span>
                    </div>
                    {!item.isAvailable && (
                      <span className={styles.out_of_stock}>Out of stock</span>
                    )}
                    <div className={styles.quantity_controls}>
                      <div className={styles.qty}>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className={styles.qty_btn}
                        >
                          −
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className={styles.qty_btn}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={styles.delete_btn}
                      >
                        <Trash2 style={{ width: "20px", cursor: "pointer" }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.information_1}>
            <div>{countOfItems} item</div>
            <div className={styles.totalPrice}>${totalPrice.toFixed(2)}</div>
          </div>
          <div className={styles.information_2}>
            <div>Shipping:</div>
            <div className={styles.taxes}>${shippingCost.toFixed(2)}</div>
          </div>
          <div className={styles.information_3}>
            <Link style={{ textDecoration: "none" }} to="/cart">
              <div className={styles.view_cart}>View Cart</div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/address">
              {" "}
              <div className={styles.checkout}>Checkout</div>
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketComponent;
