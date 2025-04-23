import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Eyeliner from "./pages/Eyeliner";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import { CartProvider } from "./context/AddToCard";

const App = () => {


  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eyeliner" element={<Eyeliner />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
