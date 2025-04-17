import React from "react";
import EyelinerComponent from "../components/Eyeliner/Eyeliner";
import BlockCategories from "../shared/BlockCategories/BlockCategories";
import FilterSidebar from "../shared/Filter/FilterCard";

const Eyeliner = () => {
  return (
    <div>
      <EyelinerComponent />
      <FilterSidebar />
    </div>
  );
};

export default Eyeliner;
