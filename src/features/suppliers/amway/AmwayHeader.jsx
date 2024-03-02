import React from "react";
import Logo from "../../../../public/suppliers/logo-amway-white.png";

const AmwayHeader = () => {
  return (
    <div className="bg-sky-700 w-full h-16 flex items-center px-5">
      <img src={Logo} alt="Amway" className="w-20" />
    </div>
  );
};

export default AmwayHeader;
