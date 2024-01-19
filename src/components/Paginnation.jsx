import React, { useEffect, useState } from "react";

const Paginnation = ({ pages = 3, activePage = 1, handlePage }) => {
  const [pagesArray, setPagesArray] = useState([1]);

  const loadPagesArray = () => {
    let tempArray = [];
    for (let i = 1; i <= pages; i++) {
      tempArray.push(i);
    }
    setPagesArray(tempArray);
  };

  useEffect(() => {
    loadPagesArray();
  }, [pages]);

  return (
    <ul className="flex my-3 mx-auto border-[1px] text-slate-950 border-slate-400 w-fit">
      <li className="min-w-[30px] text-center border-r-[1px] border-slate-400 px-2 py-1 cursor-pointer">
        Prev
      </li>
      {pagesArray.map((page, index) => {
        if (page === activePage) {
          return (
            <li
              key={index}
              onClick={() => handlePage(page)}
              className="min-w-[30px] text-center border-r-[1px] border-slate-400 bg-yellow-400 px-2 py-1 cursor-pointer"
            >
              {page}
            </li>
          );
        } else {
          return (
            <li
              key={index}
              onClick={() => handlePage(page)}
              className="min-w-[30px] text-center border-r-[1px] border-slate-400 px-2 py-1 cursor-pointer"
            >
              {page}
            </li>
          );
        }
      })}
      <li className="min-w-[30px] text-center border-r-[1px] border-slate-400 px-2 py-1 cursor-pointer">
        ...
      </li>
      <li className="min-w-[30px] text-center px-2 py-1 cursor-pointer">
        Next
      </li>
    </ul>
  );
};

export default Paginnation;
