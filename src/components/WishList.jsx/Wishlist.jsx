import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import styles from "./Wishlist.module.css";
import { Trash } from "lucide-react";
import { useCart } from "../../context/AddToCard";

const WishlistComponent = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); 

  return (
    <div className={styles.full_container}>
      <div className={styles.wishlist_container}>
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div className={styles.wishlist} key={item.id}>
              <button
                className={styles.remove_button}
                onClick={() => removeFromWishlist(item.id)}
              >
                <Trash className={styles.trash} />
              </button>
              <img
                className={styles.product_image}
                src={item.images}
                alt={item.name}
              />
              <div className={styles.description_box}>
                <div className={styles.description}>{item.name}</div>
                <div className={styles.description}>{item.brand}</div>
                <div className={styles.prices_box}>
                  {item.isDiscount && typeof item.basePrice === "number" && (
                    <span className={styles.basePrice}>
                      ${item.basePrice.toFixed(1)}
                    </span>
                  )}
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
              <div className={styles.addToCartBox}>
                <button
                  className={styles.addToCart}
                  onClick={() => addToCart(item)}
                  disabled={!item.isAvailable}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyMessage}>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistComponent;
