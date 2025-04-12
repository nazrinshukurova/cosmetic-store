import React, { useState, useEffect } from "react";
import TrendingProducts from "./TrendingProducts/TrendingProducts";
import photo1 from "../assets/dataPhotos/brown-bear.jpg"
import photo2 from '../assets/dataPhotos/brown-bear-printed-sweater.jpg'
import photo3 from '../assets/dataPhotos/hummingbird.jpg'
import photo4 from '../assets/dataPhotos/hummingbird-printed-t-shirt.jpg'
import photo5 from '../assets/dataPhotos/the-best-is-yet-to-come.jpg'
import photo6 from '../assets/dataPhotos/the-best-is-yet-to-come-framed-poster.jpg'



const Data = () => {
  const [data, setData] = useState([]);

  const datas = [
    {
      brand: "L'Oréal",
      productName: "Elemis Superfood Glow Priming",
      price: 47.0,
      originalPrice: null,
      discount: null,
      image: photo3,
    },
    {
      brand: "Unilever",
      productName: "Essence Make Me Brow Eyebrow",
      price: 51.04,
      originalPrice: 58.0,
      discount: 12,
      image: "essence-make-me-brow.png",
    },
    {
      brand: "Procter & Gamble",
      productName: "DERPHEA Instant Face Lift Cream",
      price: 76.0,
      originalPrice: null,
      discount: null,
      image: "derphea-instant-face-lift.png",
    },
    {
      brand: "Shiseido",
      productName: "Dark Spot Remover For Body",
      price: 64.17,
      originalPrice: 69.0,
      discount: 7,
      image: "dark-spot-remover-body.png",
    },
    {
      brand: "Beiersdorf",
      productName: "L’Oreal Paris Glow Mon Amour",
      price: 94.0,
      originalPrice: null,
      discount: null,
      image: "loreal-glow-mon-amour.png",
    },
    {
      brand: "Coty Inc",
      productName: "Daubigny Makeup Brushes Dual-Ended",
      price: 48.0,
      originalPrice: null,
      discount: null,
      image: "daubigny-dual-makeup-brushes.png",
    },
    {
      brand: "Natura &Co",
      productName: "Organic Argan Oil 50 Ml Hair",
      price: 45.0,
      originalPrice: null,
      discount: null,
      image: "organic-argan-oil.png",
    },
    {
      brand: "Henkel",
      productName: "Half SKIN FOUNDATION Miracle",
      price: 86.0,
      originalPrice: null,
      discount: null,
      image: "half-skin-foundation.png",
    },
  ];

  useEffect(() => {
    setData(datas);
  }, []);

  return (
    <div>
      <TrendingProducts data={data} />
    </div>
  );
};

export default Data;
