import React from "react";

const CardHomePage = ({ cardInfo, imgURL }) => {
  return (
    <div className="w-[300px] h-auto bg-slate-100">
      <h2 className="text-xl text-center font-semibold text-slate-950 bg-slate-300 px-3 py-1">
        {cardInfo.title}
      </h2>
      <img
        src={imgURL + cardInfo.image}
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
