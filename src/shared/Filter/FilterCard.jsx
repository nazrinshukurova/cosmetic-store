import React, { useState } from "react";
import FilterProducts from "./FilterProducts";
import ProductList from "../ProductBox/ProductList";
import styles from "./FilterSideBar.module.css";
import BlockCategories from "../BlockCategories/BlockCategories";

const FilterCard = () => {
  const [filters, setFilters] = useState({
    availability: "",
    condition: [],
    brand: [],
  });



  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.filter_container}>
      <div className={styles.filter_container_left}>
        <BlockCategories />
        <FilterProducts onFilterChange={handleFilterChange} />
      </div>
      <div className={styles.filter_container_right}>
        <ProductList filters={filters} />
      </div>
    </div>
  );
};

export default FilterCard;
