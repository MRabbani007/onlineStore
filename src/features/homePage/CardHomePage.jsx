import React from "react";
// Imported Hooks
import useGlobal from "../../hooks/useGlobal";
// Imported Data
import { IMAGE_URL_DEALS } from "../../data/utils";

const CardHomePage = ({ cardInfo }) => {
  const { handleSearchSubmit } = useGlobal();

  return (
    <div
      className="w-[300px] h-auto  z-10 rounded-lg shadow-xl shadow-yellow-300"
      onClick={() => {
        handleSearchSubmit("", cardInfo.value);
      }}
    >
      <h2 className="text-xl text-center font-semibold rounded-t-lg text-zinc-900 bg-zinc-400 px-3 py-1">
        {cardInfo.title}
      </h2>
      <img
        src={IMAGE_URL_DEALS + cardInfo.image}
        alt=""
        className="w-auto h-[250px] mx-auto rounded-b-lg"
      />
    </div>
  );
};

export default CardHomePage;
