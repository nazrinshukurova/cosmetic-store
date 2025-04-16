import React from "react";
import Navbar from "./shared/Navbar/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Eyeliner from "./pages/Eyeliner";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/eyeliner" element={<Eyeliner />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
