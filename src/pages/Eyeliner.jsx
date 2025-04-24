import React from "react";
import EyelinerComponent from "../components/Eyeliner/Eyeliner";
import FilterSidebar from "../shared/Filter/FilterCard";

const Eyeliner = () => {
  return (
    <div>
      <EyelinerComponent name="Eyeliner" />
      <FilterSidebar />
    </div>
  );
};

export default Eyeliner;
