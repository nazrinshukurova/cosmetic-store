import { useEffect, useState } from "react";
import styles from "./FilterSideBar.module.css";

const FilterSideBar = ({ onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState("");

  useEffect(() => {
    onFilterChange({
      availability: selectedAvailability,
      condition: selectedConditions,
      brand: selectedBrands,
      size: selectedSizes,
    });
  }, [selectedBrands, selectedConditions, selectedSizes, selectedAvailability]);

  const handleCheckbox = (option, setter, currentState) => {
    setter(
      currentState.includes(option)
        ? currentState.filter((x) => x !== option)
        : [...currentState, option]
    );
  };

  const renderCheckboxList = (
    title,
    options,
    counts,
    stateSetter,
    state,
    isSingle = false
  ) => (
    <div className={styles.section}>
      <h4>{title}</h4>
      <ul>
        {options.map((option, index) => (
          <li key={option}>
            <label>
              <input
                type="checkbox"
                checked={isSingle ? state === option : state.includes(option)}
                onChange={() =>
                  isSingle
                    ? stateSetter(option)
                    : handleCheckbox(option, stateSetter, state)
                }
              />
              {option} <span className={styles.count}>({counts[index]})</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={styles.card}>
      <h3>Filter By</h3>
      {renderCheckboxList(
        "Availability",
        ["Available", "Not Available"],
        [13, 5],
        setSelectedAvailability,
        selectedAvailability,
        true
      )}
      {renderCheckboxList(
        "Sizes",
        ["Small", "Medium", "Large", "XXL"],
        [9, 3, 5, 1],
        setSelectedSizes,
        selectedSizes
      )}
      {renderCheckboxList(
        "Brand",
        [
          "Beiersdorf",
          "Coty Inc",
          "Henkel",
          "L’Oréal",
          "Natura &Co",
          "Procter & Gamble",
          "Shiseido",
          "Unilever",
        ],
        [2, 2, 3, 2, 2, 2, 3, 2],
        setSelectedBrands,
        selectedBrands
      )}
      {renderCheckboxList(
        "Condition",
        ["New", "Refurbished", "Used"],
        [9, 3, 6],
        setSelectedConditions,
        selectedConditions
      )}
    </div>
  );
};

export default FilterSideBar;
