import React from "react";
import WishlistComponent from "../components/WishList.jsx/Wishlist";
import Navbar from "../shared/Navbar/Navbar";

const Wishlist = () => {
  return (
    <div>
      <Navbar />
      <WishlistComponent />
    </div>
  );
};

export default Wishlist;
