import React, { useRef } from "react";
import child from "../child.jpeg";
import arrowUp from "../assets/arrow-up.svg";
import { useDrag, useDrop } from "react-dnd";

const Video = ({ index, moveCard, name }) => {
  const key = index;
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop({
    accept: "video",
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex !== hoverIndex) {
        moveCard(dragIndex, hoverIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const [, drag] = useDrag({
    type: "video",
    item: { type: "video", index, key },
  });
  drag(drop(ref));
  const staticData = {
    title: "Rune raises $100,000 for marketing through NFT butterflies sale",
    author: "ninjanft",
  };
  return (
    <>
      <div
        className={isOver ? "border-[#DBFD51] border" : "border-[transparent] "}
      />
      <div
        className="grid grid-cols-tableGridBody text-[#696969] uppercase text-sm font-sans border border-[#696969] rounded-[10px] my-4 hover:cursor-move"
        key={index}
        ref={ref}
      >
        <div className="gap-4 flex items-center px-7 ">
          <div className="text-white py-1 w-4 pr-2">
            <span>{index + 1}</span>
          </div>

          <div className="flex gap-4 items-center">
            <img
              src={child}
              alt="track"
              className="my-3 rounded-2 h-[70px] w-44"
            />
            <div className="grid ">
              <span className=" text-4 normal-case font-sans">
                {staticData.title}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={child} className="w-5 h-5 rounded-[50%]" alt="" />
          <span className="flex items-center text-[#DBFD51] lowercase">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="flex items-center text-white">234</span>
          <img src={arrowUp} alt="" className=" w-4 h-3" />
        </div>
      </div>
    </>
  );
};

export default Video;
