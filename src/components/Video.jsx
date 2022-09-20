import React, { useRef } from "react";
import child from "../child.jpeg";
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
      // Don't replace items with themselves
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
        className={"border" && isOver ? "text-sky-700" : "text-[transparent]"}
      />
      <div
        className="grid grid-cols-tableGridBody text-[#696969] uppercase text-[13px] font-sans border border-[#696969] rounded-[10px] my-4 hover:cursor-move"
        key={index}
        ref={ref}
      >
        <div className="gap-4 flex items-center px-7 ">
          <div className="text-[#fff] py-1 w-4 pr-2">
            <span>{index + 1}</span>
          </div>

          <div className="flex gap-4 items-center">
            <img
              src={child}
              alt="track"
              className="my-3 rounded-[8px] h-[70px] w-[180px]"
            />
            <div className="grid ">
              <span className=" text-[15px] normal-case font-sans">
                {staticData.title}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={child} className="w-[20px] h-[20px] rounded-[50%]" alt="" />
          <span className="flex items-center text-[#DBFD51] lowercase">
            {name}
          </span>
        </div>
        <span className="flex items-center">234</span>
      </div>
    </>
  );
};

export default Video;
