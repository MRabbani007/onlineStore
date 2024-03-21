import React, { useRef, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const MyCarousel = ({ children }) => {
  const [displayIndex, setDisplayIndex] = useState(0);

  const scrollRight = () => {
    if (displayIndex === children.length - 1) {
      setDisplayIndex(0);
    } else {
      setDisplayIndex((prev) => prev + 1);
    }
    carouselBody.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    if (displayIndex === 0) {
      setDisplayIndex(0);
    } else {
      setDisplayIndex((prev) => prev - 1);
    }
    carouselBody.current.scrollLeft -= 300;
  };

  const carouselBody = useRef();
  const carouselItem = useRef();

  // const scrollLeft = () => {
  // };
  // const scrollRight = () => {
  //   carouselBody.current.scrollLeft += 150 + 16;
  // };

  return (
    <div className="w-full flex flex-nowrap justify-between items-center">
      <FaArrowCircleLeft
        className="text-[30px] z-20"
        onClick={() => scrollLeft()}
      />
      <div
        ref={carouselBody}
        className="w-[90%] flex flex-row flex-nowrap justify-start items-center gap-2 overflow-x-hidden duration-200"
        style={{ transform: `translateX(${-displayIndex * 250})` }}
      >
        {children.map((item, index) => {
          return (
            <div ref={carouselItem} key={index} className="border-[1px]">
              {item}
            </div>
          );
        })}
      </div>
      <FaArrowCircleRight
        className="text-[30px] z-20"
        onClick={() => scrollRight()}
      />
    </div>
  );
};

export default MyCarousel;
