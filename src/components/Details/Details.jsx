import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../context/AddToCard";
import { useWishlist } from "../../context/WishlistContext";
import { supabase } from "../../client";
import styles from "./Details.module.css";
import { useAuth } from "../../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { user } = useAuth();
  const [selectedSize, setSelectedSize] = useState("Small"); // Default size

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);

      const { data: productData, error: productError } = await supabase
        .from("AllProducts")
        .select("*")
        .eq("id", id)
        .single();

      if (productError) {
        console.error("Error fetching product:", productError.message);
        return;
      }

      const { data: pricesData, error: priceError } = await supabase
        .from("PricesForSizes")
        .select("*")
        .eq("key", productData.key);

      if (priceError) {
        console.error("Error fetching prices:", priceError.message);
        return;
      }

      setProduct(productData);
      setPrices(pricesData);
      setLoading(false);
    };

    fetchProductDetails();
  }, [id]);

  const calcDiscountedPrice = (discount, value) => {
    const numericValue = parseFloat(value);
    return numericValue - (numericValue / 100) * discount;
  };

  const displayedPrice = useMemo(() => {
    if (!prices.length) return null;

    const priceInfo = prices[0];

    const sizePrices = {
      Small: priceInfo.smallPrice ? parseFloat(priceInfo.smallPrice) : null,
      Medium: priceInfo.mediumPrice ? parseFloat(priceInfo.mediumPrice) : null,
      Large: priceInfo.largePrice ? parseFloat(priceInfo.largePrice) : null,
      XXL: priceInfo.xxlPrice ? parseFloat(priceInfo.xxlPrice) : null,
    };

    const basePrice = sizePrices[selectedSize];

    if (priceInfo.isDiscount) {
      return {
        finalPrice: calcDiscountedPrice(priceInfo.percent, basePrice),
        basePrice,
        showSize: selectedSize,
        discountPercent: priceInfo.percent,
      };
    }

    return {
      finalPrice: basePrice,
      basePrice,
      showSize: selectedSize,
      discountPercent: 0,
    };
  }, [prices, selectedSize]);

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("Please log in to add to wishlist.");
      return;
    }
    addToWishlist(product);
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add to cart.");
      return;
    }
    addToCart(product);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size); // Set the selected size and update the price
  };

  if (loading || !product || !displayedPrice) return <p>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <div>
        <img
          className={styles.detail_image}
          src={product.images}
          alt={product.name}
        />
      </div>
      <div className={styles.information}>
        <h2 className={styles.detail_name}>{product.name}</h2>
        <div className={styles.detail_brand}>
          Brand: <span>{product.brand}</span>
        </div>
        <div className={styles.detail_brand}>
          Condition: <span>{product.condition}</span>
        </div>
        <div className={styles.detail_brand}>
          {product.isAvailable ? "In Stock" : "Out of Stock"}
        </div>
        <div className={styles.sizes}>
          {["Small", "Medium", "Large", "XXL"].map((size) => (
            <button
              key={size}
              className={`${styles.sizeButton} ${
                selectedSize === size ? styles.selected : ""
              }`}
              onClick={() => handleSizeClick(size)}
              disabled={!prices[0]?.[`${size.toLowerCase()}Price`]}
            >
              {size}
            </button>
          ))}
        </div>

        <div className={styles.prices}>
          <span>
            {/* ${displayedPrice.finalPrice.toFixed(2)}{" "} BURA BAXACAM */}
            {displayedPrice.discountPercent > 0 && (
              <span className={styles.discounted_price}>
                {" "}
                ${displayedPrice.basePrice} 
              </span>
            )}
          </span>
        </div>
        {user ? (
          <div>
            <button
              className={styles.addToCart}
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
            >
              Add to Cart
            </button>
          </div>
        ) : (
          <div>
            <button className={styles.addToCart} disabled>
              ADD TO CART
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
