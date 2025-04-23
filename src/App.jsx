import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Eyeliner from "./pages/Eyeliner";
import { WishlistProvider } from "./context/WishlistContext";


const App = () => {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eyeliner" element={<Eyeliner />} />
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
};

export default App;
