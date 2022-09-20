import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import SnackBar from "../components/SnackBar";
import MkdSDK from "../utils/MkdSDK";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Video from "../components/Video";
import arrowDown from "../assets/arrow-down.svg";
import user from "../assets/user.svg";

const AdminDashboardPage = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const month = new Date().toLocaleString("default", { month: "long" });
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const minutes = new Date().getMinutes();
  const hour = new Date().getHours();
  const { dispatch } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const limit = 10;

  const [da, setDa] = useState([
    { name: "ninjanft" },
    { name: "deniscrypto" },
    { name: "meta_world98" },
    { name: "kingdom43world" },
    { name: "sjkj3987423kjbdfsf" },
    { name: "coleworld" },
    { name: "bastiliy" },
    { name: "Interic" },
    { name: "christianna" },
    { name: "legion" },
  ]);

  useEffect(() => {
    let sdk = new MkdSDK();
    // sdk
    //   .callRestAPI({ payload: { page, limit }, method: "GET" })
    //   .then((response) => {});
  }, [dispatch, limit, page]);

  const paginate = (type) => {
    if (type === "prev") {
      setPage(page - 1);
      if (page - 1 < 10) {
        setShowNext(true);
      }
      if (page - 1 === 1) {
        setShowPrev(false);
      }
    }
    if (type === "next") {
      setPage(page + 1);
      if (page + 1 > 1) {
        setShowPrev(true);
      }
      if (page + 1 === 10) {
        setShowNext(false);
      }
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const currentTime = () => {
    const modifiedMin = ("0" + minutes).slice(-2);
    return hour + ":" + modifiedMin;
  };
  const currentDate = () => {
    return day + " " + month.toString("en-us") + " " + year;
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = da[dragIndex];
      setDa(
        update(da, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [da]
  );
  return (
    <>
      {/* Toast Log In */}
      <SnackBar />

      {/* Page Top Navigation */}
      <div className="w-screen h-full text-gray-700 px-10 bg-black">
        <div className="flex justify-between py-8 items-center">
          <span className="font-black text-[48px] text-white leading-5 rounded-[50%]">
            APP
          </span>
          <button
            className="border-0 text-[10px] bg-[#9BFF00] w-34 h-9 px-6 py-3 rounded-[40px] flex items-center justify-center gap-2"
            onClick={() => logout()}
          >
            <img src={user} alt="" className=" w-4 h-3" />
            <span>Logout</span>
          </button>
        </div>

        <div className="mt-6 md:mt-20 mb-4 block relative">
          <div className="grid sm:flex justify-center sm:justify-between items-center gap-4 sm:gap-0 ">
            <span className="leading-10 text-[40px] text-white font-[100]">
              Today's leaderboard
            </span>
            <div className="flex justify-center items-center gap-2 bg-[#1D1D1D] px-4 py-2 rounded-xl">
              <div className="flex space-x-1 text-white">
                <span>{currentDate()}</span>
              </div>
              <span className="pb-2 text-white">.</span>
              <button className="uppercase border-0 text-[10px] bg-[#9BFF00] w-36 h-7 md:h-4 px-2 py-2 rounded-[40px] flex items-center justify-center">
                submissions open
              </button>
              <span className="pb-2 text-white">.</span>
              <div className="flex space-x-1 text-white">
                <span>{currentTime()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className>
          {/* Table Heading */}
          <div className="grid grid-cols-tableGridHead text-[#696969] capitalize text-[13px] px-7 font-sans  pt-2">
            <div className="gap-4 flex items-center">
              <span className="text-[15px] font-bold">#</span>
              <span className=" cursor-default">title</span>
            </div>
            <span className=" cursor-default">author</span>
            <div className="flex items-center gap-1">
              <span className=" cursor-default capitalized">most liked</span>
              <img src={arrowDown} alt="" className=" w-4 h-3" />
            </div>
          </div>

          {/* Table Body */}
          <DndProvider backend={HTML5Backend}>
            {da.map(({ name }, index) => (
              <Video
                key={index}
                index={index}
                moveCard={moveCard}
                name={name}
              />
            ))}
          </DndProvider>
        </div>

        {/* Page Controller */}

        <div className="flex gap-3 py-8 items-center">
          {showPrev && (
            <button
              className="border-0 text-[14px] bg-[#9BFF00] hover:bg-[#12FF00] w-[128px] h-[38px] px-[12px] py-[12px] rounded-[40px] flex items-center justify-center"
              onClick={() => paginate("prev")}
            >
              previous page
            </button>
          )}
          {showNext && (
            <button
              className="border-0 text-[14px] bg-[#9BFF00] hover:bg-[#12FF00] w-[128px] h-[38px] px-[12px] py-[12px] rounded-[40px] flex items-center justify-center"
              onClick={() => paginate("next")}
            >
              next page
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
