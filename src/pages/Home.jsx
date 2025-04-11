import React from "react";
import ImageSlider from "../components/HomeComponents/Slider/Slider";
import TopCategories from "../components/HomeComponents/TopCategories/TopCategories";
import Card from "../shared/Card/Card";
import subbanner_1 from "../assets/sub-banner-1.jpg";
import subbanner_2 from "../assets/sub-banner-2.jpg";

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <TopCategories />
      <div className="cards">
        <Card
          src={subbanner_1}
          subbanner_text_1="Skin Care Routine"
          subbanner_text_2="With Cream"
          subbanner_title="Healthy skin
"
        />
        <Card
          src={subbanner_2}
          subbanner_text_1="Body Lotion With"
          subbanner_text_2="Almond Extract"
          subbanner_title="Skin Tightening
"
        />
      </div>
    </div>
  );
};

export default Home;
