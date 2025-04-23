import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((el) => el.id !== productId));
  };

  const countOfwishes = wishlist.length;
  console.log(wishlist)

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, countOfwishes }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

