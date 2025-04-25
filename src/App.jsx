import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Eyeliner from "./pages/Eyeliner";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/AddToCard";
import DetailsPage from "./pages/DetailsPage";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/eyeliner" element={<Eyeliner />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/address" element={<Address />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/details/:name/:id" element={<DetailsPage />} />
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
