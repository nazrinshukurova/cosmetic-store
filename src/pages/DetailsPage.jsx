import React from "react";
import EyelinerComponent from "../components/Eyeliner/Eyeliner";
import Details from "../components/Details/Details";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { name } = useParams();

  return (
    <div>
      <EyelinerComponent name={name} />
      <Details />
    </div>
  );
};

export default DetailsPage;
