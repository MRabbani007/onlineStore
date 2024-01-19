import React, { useRef } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const MyCarousel = ({ children }) => {
  const carouselBody = useRef();
  const carouselItem = useRef();
  const scrollLeft = () => {
    carouselBody.current.scrollLeft -= 150 + 16;
  };
  const scrollRight = () => {
    carouselBody.current.scrollLeft += 150 + 16;
  };

  return (
    <div className="w-full flex flex-nowrap justify-between items-center">
      <FaArrowCircleLeft className="text-[30px]" onClick={() => scrollLeft()} />
      <div
        ref={carouselBody}
        className="w-[90%] flex flex-row flex-nowrap justify-evenly items-start gap-2 overflow-x-hidden"
      >
        {children.map((item, index) => {
          return (
            <div
              ref={carouselItem}
              key={index}
              className="w-fit inline-block m-0"
            >
              {item}
            </div>
          );
        })}
      </div>
      <FaArrowCircleRight
        className="text-[30px]"
        onClick={() => scrollRight()}
      />
    </div>
  );
};

export default MyCarousel;
