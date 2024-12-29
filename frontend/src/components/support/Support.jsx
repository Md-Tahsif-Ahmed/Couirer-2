import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import SupportBanner from "./SupportBanner";
import SupportElement from "./SupportElement";

function Support() {
  return (
    <div className="bg-white pt-8">
      <Navbar />
      <SupportBanner />
      <SupportElement />
      <Footer />
    </div>
  );
}

export default Support;
