import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import child from "../child.jpeg";
import SnackBar from "../components/SnackBar";
import { GlobalContext, showToast } from "../globalContext";
import MkdSDK from "../utils/MkdSDK";

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

  const da = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    let sdk = new MkdSDK();
    sdk
      .callRestAPI({ payload: { page, limit }, method: "GET" })
      .then((response) => {});
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

  const staticData = {
    title: "Rune raises $100,000 for marketing through NFT butterflies sale",
    author: "ninjanft",
  };

  const currentTime = () => {
    return hour + ":" + minutes;
  };
  const currentDate = () => {
    return day + " " + month.toString("en-us") + " " + year;
  };
  return (
    <>
      {/* Toast Log In */}
      <SnackBar />

      {/* Page Top Navigation */}
      <div className="w-screen h-full text-gray-700 px-10 bg-black">
        <div className="flex justify-between py-8 items-center">
          <span className="font-black text-[48px] text-white leading-5 rounded-[50%] ">
            APP
          </span>
          <button
            className="border-0 text-[10px] bg-[#9BFF00] w-[128px] h-[38px] px-[24px] py-[12px] rounded-[40px]"
            onClick={() => logout()}
          >
            <span>Logout</span>
          </button>
        </div>

        <div className="mt-6 md:mt-20 mb-4 block relative">
          <div className="flex justify-between items-center">
            <span className="leading-[48px] text-[40px] text-white font-[100]">
              Today's leaderboard
            </span>
            <div className="flex justify-center items-center gap-2 bg-[#1D1D1D] px-4 py-2 rounded-[10px]">
              <div className="flex space-x-1 text-white">
                <span>{currentDate()}</span>
              </div>
              <span className="pb-2 text-white">.</span>
              <button className="uppercase border-0 text-[10px] bg-[#9BFF00] w-[136px] h-[17px] px-2 py-1 rounded-[40px] flex items-center justify-center">
                submissions open
              </button>
              <span className="pb-2 text-[#1D1D1D]">.</span>
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
            <span className=" cursor-default capitalized">most liked</span>
          </div>

          {/* Table Body */}
          {da.map((d) => (
            <div className="grid grid-cols-tableGridBody text-[#696969] uppercase text-[13px] font-sans border border-[#696969] rounded-[10px] my-4">
              <div className="gap-4 flex items-center px-7 ">
                <div className="text-[#fff] py-1 w-4 pr-2">
                  <span>01</span>
                </div>

                <div className="hover:text-[#fff] cursor-default flex gap-4 items-center">
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
                <img
                  src={child}
                  className="w-[20px] h-[20px] rounded-[50%]"
                  alt=""
                />
                <span className="flex items-center text-[#DBFD51] lowercase">
                  ninja
                </span>
              </div>
              <span className="flex items-center">234</span>
            </div>
          ))}
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
