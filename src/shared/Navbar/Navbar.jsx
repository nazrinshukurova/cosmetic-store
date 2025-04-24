import React, { useState } from "react";
import logo from "../../assets/logo-1692272836.jpg";
import { FaSearch, FaUserAlt, FaHeart, FaShoppingCart } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/AddToCard";
import BasketComponent from "../../components/Basket/BasketComponent";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { countOfwishes } = useWishlist();
  const { countOfItems, totalPrice } = useCart();
  const { user, logout } = useAuth();

  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleBasket = () => {
    setIsBasketVisible(!isBasketVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
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
                <li className={styles.link}>Stain Lip</li>
                <li className={styles.link}>ALL BRANDS</li>
                <li className={styles.link}>MORE</li>
              </ul>
            </div>
            <div className={styles.header_right}>
              <div className={styles.icon}>
                <FaSearch size={20} />
              </div>

              {user ? (
                <div className={styles.userSection}>
                  <div
                    className={styles.icon}
                    onClick={toggleDropdown}
                    style={{ cursor: "pointer" }}
                  >
                    <FaUserAlt style={{ color: "#222" }} size={20} />
                  </div>
                  {isDropdownVisible && (
                    <div className={styles.dropdownMenu}>
                      <p className={styles.username}>
                        {` ${user.firstName} ${user.lastName}`}
                        {}
                      </p>
                      <button className={styles.logoutButton} onClick={logout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <div className={styles.icon}>
                    <FaUserAlt style={{ color: "#222" }} size={20} />
                  </div>
                </Link>
              )}

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
