import { useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";
import CustomNavLink from "./CustomNavLink";

interface sideBarProps {
  handleLogout: () => void;
}

export default function SideBar({ handleLogout }: sideBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav
      className={`px-2 pt-8 pb-3 overflow-hidden inline-flex flex-col h-full shadow-sm shadow-black/60 rounded ease-in-out gap-7 transition-all duration-500 ${isOpen ? "w-60" : "w-14"}`}
    >
      {/* Logo */}
      <div className="w-full flex justify-center items-center flex-col">
        <div
          className={`rounded-full bg-amber-200 transition-all duration-500 ${isOpen ? "w-20 h-20" : "w-10 h-10"}`}
        ></div>
        <h5 className={`font-bold text-xl ${!isOpen && "hidden"}`}>
          <span>Habit</span>
          <span className="text-amber-500">Streak</span>
        </h5>
      </div>

      {/* Navigasi */}
      <div className="flex-1 flex flex-col gap-2">
        <CustomNavLink
          to="dashboard"
          variant="dashboard"
          label="Dashboard"
          isOpen={isOpen}
        />
        <CustomNavLink
          to="habitspage"
          variant="habits"
          label="Habits"
          isOpen={isOpen}
        />
        <CustomNavLink
          to="analyticspage"
          variant="analytics"
          label="Analytics"
          isOpen={isOpen}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        {/* Button sidebar*/}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-400 rounded`}
        >
          {isOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
        {/* Button Logout */}
        <button
          onClick={handleLogout}
          className={`w-full font-bold group flex items-center justify-center gap-1 bg-gray-200/70 hover:bg-red-300 px-2 py-3 rounded`}
        >
          <FaRightFromBracket
            className={`shrink-0 h-5 w-5 group-hover:fill-white`}
          />
          <span className={`group-hover:text-white ${isOpen ? "" : "hidden"}`}>
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
}
