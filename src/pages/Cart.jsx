import React from "react";
import { useCart } from "../context/AddToCard";
import EyelinerComponent from "../components/Eyeliner/Eyeliner";
import { Trash2 } from "lucide-react";
import styles from "../styles/Cart.module.css";
import CheckoutSummary from "../components/CheckOut/Checkout";

const Cart = () => {
  const {
    cartItems,
    countOfItems,
    updateQuantity,
    removeFromCart,
    totalPrice,
    shippingCost,
  } = useCart();

  return (
    <div>
      <EyelinerComponent name="Shopping Cart" />
      <div className={styles.checkout_and_cart}>
        <div className={styles.common_container}>
          <div className={styles.wishlist_container}>
            {cartItems.length === 0 ? (
              <div className={styles.empty_basket}>Your basket is empty</div>
            ) : (
              cartItems.map((item) => (
                <div className={styles.wishlist} key={item.id || item.name}>
                  <div className={styles.image_box}>
                    <img
                      className={styles.product_image}
                      src={
                        typeof item.images === "string"
                          ? item.images
                          : "/placeholder.jpg"
                      }
                      alt={item.name || "Product image"}
                    />
                  </div>
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
                  </div>
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
              ))
            )}
          </div>
        </div>
        <div className={styles.checkout_summary_wrapper}>
          <CheckoutSummary totalPrice={totalPrice} shipping={shippingCost} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
