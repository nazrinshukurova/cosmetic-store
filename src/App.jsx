import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Eyeliner from "./pages/Eyeliner";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import { CartProvider } from "./context/AddToCard";
import Cart from "./pages/Cart";
import Address from "./pages/Address";

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eyeliner" element={<Eyeliner />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />

          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
