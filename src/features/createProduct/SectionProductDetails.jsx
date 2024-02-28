import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import SectionAbout from "./SectionAbout";
import SectionDetails from "./SectionDetails";

const SectionProductDetails = () => {
  // Control view of section
  const [view, setView] = useState(false);

  return (
    <div>
      <h2 className="bg-slate-200 p-2 flex justify-start items-center">
        {view ? (
          <FaMinus className="inline mx-2" onClick={() => setView(!view)} />
        ) : (
          <FaPlus className="inline mx-2" onClick={() => setView(!view)} />
        )}
        Details
      </h2>
      <div className={(view ? "block" : "hidden") + " p-2"}>
        <SectionAbout />
        <SectionDetails />
      </div>
    </div>
  );
};

export default SectionProductDetails;
