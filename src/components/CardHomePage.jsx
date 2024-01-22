import React from "react";
// Imported Data
import { IMAGE_URL_DEALS } from "../data/utils";

const CardHomePage = ({ cardInfo }) => {
  return (
    <div className="w-[300px] h-auto bg-slate-100 z-10">
      <h2 className="text-xl text-center font-semibold text-slate-950 bg-slate-300 px-3 py-1">
        {cardInfo.title}
      </h2>
      <img
        src={IMAGE_URL_DEALS + cardInfo.image}
        alt=""
        className="w-auto h-[250px] mx-auto"
      />
      {/* <p className="bg-slate-200 px-3 py-1 text-sky-900 rounded-b-lg">
        Show More
      </p> */}
    </div>
  );
};

export default CardHomePage;
