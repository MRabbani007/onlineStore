import React from "react";
// Imported Components
import Navbar from "../components/Navbar";
import CardHomePage from "../components/CardHomePage";
import Brands from "../components/Brands";
// Imported Data
import { cardData1, cardData2, cardData3 } from "../data/homepage";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div
        className={`w-full min-h-screen pt-[25%] pb-[80px] text-slate-950 px-5 flex flex-wrap justify-center gap-5 bg-[url("/images/background/background-1.jpg")] bg-no-repeat bg-contain`}
      >
        {/* <Brands category={"Beauty & Personal Care"} /> */}
        {cardData1.map((item, index) => {
          return <CardHomePage cardInfo={item} key={index} />;
        })}
        {/* <Brands category={"Fashion"} /> */}
        {cardData2.map((item, index) => {
          return <CardHomePage cardInfo={item} key={index} />;
        })}
        <Brands category={"Electronics"} />
        {cardData3.map((item, index) => {
          return <CardHomePage cardInfo={item} key={index} />;
        })}
      </div>
    </>
  );
};

export default HomePage;
