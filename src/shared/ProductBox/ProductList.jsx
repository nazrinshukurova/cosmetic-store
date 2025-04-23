import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../../client";
import styles from "./ProductBox.module.css";
import { Heart, Repeat, Maximize2, ExternalLink } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

const ProductList = ({ filters, productProps }) => {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const { availability, condition, brand, size } = filters;

  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      let query = supabase.from("AllProducts").select("*");

      if (availability && availability !== "All") {
        query = query.eq("isAvailable", availability === "Available");
      }

      if (condition.length) {
        query = query.in("condition", condition);
      }

      if (brand.length) {
        query = query.in("brand", brand);
      }

      const { data: productData, error: productError } = await query;
      if (productError) {
        console.error("Error fetching products:", productError.message);
        return;
      }

      setProducts(productData || []);

      const { data: pricesData, error: priceError } = await supabase
        .from("PricesForSizes")
        .select("*");

      if (priceError) {
        console.error("Error fetching prices:", priceError.message);
        return;
      }

      setPrices(pricesData || []);
    };

    fetchFilteredProducts();
  }, [filters]);

  const calcDiscountedPrice = (discount, value) => {
    const numericValue = parseFloat(value);
    return numericValue - (numericValue / 100) * discount;
  };

  const mergedProducts = useMemo(() => {
    return products
      .map((product) => {
        const matchedPrice = prices.find((price) => price.key === product.key);
        if (!matchedPrice) return null;

        const sizePrices = {
          Small: matchedPrice.smallPrice
            ? parseFloat(matchedPrice.smallPrice)
            : null,
          Medium: matchedPrice.mediumPrice
            ? parseFloat(matchedPrice.mediumPrice)
            : null,
          Large: matchedPrice.largePrice
            ? parseFloat(matchedPrice.largePrice)
            : null,
          XXL: matchedPrice.xxlPrice ? parseFloat(matchedPrice.xxlPrice) : null,
        };

        const isDiscount = matchedPrice.isDiscount;
        const discountPercent = matchedPrice.percent;

        let finalPrice = "N/A";
        let showSize = "";
        let basePrice = "";

        if (size.length) {
          const selectedSizes = size.filter(
            (sz) => sizePrices[sz] !== null && sizePrices[sz] !== undefined
          );

          if (!selectedSizes.length) return null;

          showSize = selectedSizes[0];
          basePrice = sizePrices[showSize];
          finalPrice = isDiscount
            ? calcDiscountedPrice(discountPercent, basePrice)
            : basePrice;
        } else {
          if (matchedPrice.NormalPrice != null) {
            finalPrice = parseFloat(matchedPrice.NormalPrice);
            showSize = "Price";
          } else {
            const firstAvailableSize = Object.keys(sizePrices).find(
              (sz) => sizePrices[sz] !== null && sizePrices[sz] !== undefined
            );
            if (firstAvailableSize) {
              showSize = firstAvailableSize;
              basePrice = sizePrices[firstAvailableSize];

              finalPrice = isDiscount
                ? calcDiscountedPrice(discountPercent, basePrice)
                : basePrice;
            }
          }
        }

        return {
          ...product,
          price: finalPrice,
          showSize,
          isDiscount,
          discountPercent,
          basePrice,
        };
      })
      .filter(Boolean);
  }, [products, prices, size]);

  return (
    <div>
      <div className={styles.filtered_items}>
        {mergedProducts.map((product) => (
          <div key={product.id} className={styles.item}>
            {product.isDiscount && (
              <div className={styles.discount_tag}>
                -%{product.discountPercent}
              </div>
            )}
            <img
              className={styles.item_image}
              src={product.images}
              alt={product.name}
            />
            <div className={styles.stack}>
              <button className={styles.button}>
                <Heart onClick={() => addToWishlist(product)} />
                <span className={styles.tooltip}>Like</span>
              </button>
              <button className={`${styles.button} ${styles.active}`}>
                <Repeat />
                <span className={styles.tooltip}>Repeat</span>
              </button>
              <button className={styles.button}>
                <Maximize2 />
                <span className={styles.tooltip}>Expand</span>
              </button>
              <button className={styles.button}>
                <ExternalLink />
                <span className={styles.tooltip}>Open</span>
              </button>
            </div>

            <div className={styles.brand_title}>{product.brand}</div>
            <h3 className={styles.name}>
              {product.name}
              <div className={styles.prices_box}>
                {product.isDiscount &&
                  typeof product.basePrice === "number" && (
                    <span className={styles.basePrice}>
                      ${product.basePrice.toFixed(1)}
                    </span>
                  )}
                <span className={styles.price}>
                  {typeof product.price === "number"
                    ? ` $${product.price.toFixed(1)}`
                    : "Price: N/A"}
                </span>
              </div>

              {!product.isAvailable && (
                <span className={styles.out_of_stock}>Out of stock</span>
              )}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
