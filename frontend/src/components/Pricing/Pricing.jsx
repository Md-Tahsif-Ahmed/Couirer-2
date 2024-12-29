// PricingPage.jsx
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import PricingBanner from "./PricingBanner";
import PriceCalc from "./PriceCalc";

const Pricing = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <PricingBanner />
      <PriceCalc />

      <Footer />
    </div>
  );
};

export default Pricing;
