import React from "react";
import logo from "../../assets/logo-1692272836.jpg";
import { FaSearch, FaUserAlt, FaHeart, FaShoppingCart } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext"; // ✅ Import the hook

const Navbar = () => {
  const { countOfwishes } = useWishlist(); // ✅ Use the hook to get the wishlist count

  return (
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
                  to="/"
                  style={{ textDecoration: "none", color: "#222" }}
                  className={styles.navlink}
                >
                  Makeup
                </Link>
              </li>
              <li className={styles.link}>
                <Link
                  to="/eyeliner"
                  style={{ textDecoration: "none", color: "#222" }}
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
            <div className={styles.icon}>
              <FaHeart size={20} />
              <span className={styles.badge}>{countOfwishes}</span>
            </div>
            <div className={styles.icon}>
              <FaShoppingCart size={20} />
              <span className={styles.badge}>0</span>
            </div>
            <div className={styles.totalPrice}>$0.00</div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
