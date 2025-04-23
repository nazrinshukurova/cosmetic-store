import React, { useState } from "react";
import logo from "../../assets/logo-1692272836.jpg";
import { FaSearch, FaUserAlt, FaHeart, FaShoppingCart } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/AddToCard";
import BasketComponent from "../../components/Basket/BasketComponent";

const Navbar = () => {
  const { countOfwishes } = useWishlist();
  const { countOfItems, totalPrice } = useCart();
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const toggleBasket = () => {
    setIsBasketVisible(!isBasketVisible);
  };

  return (
    <>
      <header>
        <nav className={styles.navbar}>
          <div>
            <img className={styles.logo} src={logo} alt="Logo" />
          </div>
          <div className={styles.navbar_right}>
            <div className={styles.header_left}>
              <ul className={styles.navlinks}>
                <li className={styles.link}>
                  <Link
                    style={{ textDecoration: "none", color: "#222" }}
                    to="/"
                    className={styles.navlink}
                  >
                    Makeup
                  </Link>
                </li>
                <li className={styles.link}>
                  <Link
                    style={{ textDecoration: "none", color: "#222" }}
                    to="/eyeliner"
                    className={styles.navlink}
                  >
                    Eyeliner
                  </Link>
                </li>
                <li className={styles.link}>StainLip</li>
                <li className={styles.link}>ALL BRANDS</li>
                <li className={styles.link}>MORE</li>
              </ul>
            </div>
            <div className={styles.header_right}>
              <div className={styles.icon}>
                <FaSearch size={20} />
              </div>
              <div className={styles.icon}>
                <FaUserAlt size={20} />
              </div>
              <Link to="/wishlist" className={styles.icon}>
                <FaHeart style={{ color: "#222" }} size={20} />
                <span className={styles.badge}>{countOfwishes}</span>
              </Link>
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={toggleBasket}
                className={styles.icon}
              >
                <FaShoppingCart size={20} />
                <span className={styles.badge}>{countOfItems}</span>
              </button>
              <div className={styles.totalPrice}>${totalPrice.toFixed(2)}</div>
            </div>
          </div>
        </nav>
      </header>
      {isBasketVisible && <BasketComponent onClose={toggleBasket} />}
    </>
  );
};

export default Navbar;
