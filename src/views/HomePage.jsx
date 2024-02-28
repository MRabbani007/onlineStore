import React from "react";
// Imported Components
import CardHomePage from "../components/CardHomePage";
import Brands from "../components/Brands";
// Imported Data
import { cardData1, cardData2, cardData3 } from "../data/homepage";

const HomePage = () => {
  return (
    <div
      className={`pt-[15%] pb-[80px] text-slate-950 flex flex-wrap justify-center gap-5 relative`}
    >
      <div
        className={`md:h-[25%] h-[30vh] absolute top-[-20px] left-0 right-0 bg-[url("/images/background/background-1.jpg")] bg-no-repeat bg-cover bg-origin-content z-0`}
      ></div>
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
  );
};

export default HomePage;
