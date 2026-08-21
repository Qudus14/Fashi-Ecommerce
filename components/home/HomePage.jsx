import React from "react";
import Banner from "./Banner";
import Footer from "../Public/Footer";
import Hero from "./Hero";

function HomePage() {
  return (
    <>
      <div className="md:px-5 px-2">
        <Hero />
        <Banner />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
