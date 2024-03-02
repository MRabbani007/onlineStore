import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const Paginnation = ({ pages, activePage, handlePage }) => {
  const [pagesArray, setPagesArray] = useState([1]);

  const loadPagesArray = () => {
    let tempArray = [];
    for (let i = 1; i <= pages; i++) {
      tempArray.push(i);
    }
    setPagesArray(tempArray);
  };

  const handlePrev = () => {
    if (activePage > 1) {
      handlePage(activePage - 1);
    }
  };

  const handleNext = () => {
    if (activePage < pages) {
      handlePage(activePage + 1);
    }
  };

  useEffect(() => {
    loadPagesArray();
  }, [pages]);

  return (
    <ul className="flex my-3 mx-auto text-slate-950 w-fit paginnation">
      <li className="min-w-[30px] text-center px-2 py-1 " onClick={handlePrev}>
        Prev
      </li>
      {pagesArray.map((page, index) => {
        if (page === activePage) {
          return (
            <li
              key={index}
              onClick={() => handlePage(page)}
              className="min-w-[30px] text-center active-page px-2 py-1 "
            >
              {page}
            </li>
          );
        } else {
          return (
            <li
              key={index}
              onClick={() => handlePage(page)}
              className="min-w-[30px] text-center px-2 py-1 "
            >
              {page}
            </li>
          );
        }
      })}
      {/* <li className="min-w-[30px] text-center px-2 py-1 ">...</li> */}
      <li className="min-w-[30px] text-center px-2 py-1 " onClick={handleNext}>
        Next
      </li>
    </ul>
  );
};

export default Paginnation;
