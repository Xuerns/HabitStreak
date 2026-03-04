import { useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import CustomNavLink from "./CustomNavLink";
import { useUsersStore } from "../hooks/useUsersStore";
import { useStreakTheme } from "../hooks/useStreakTheme";

interface sideBarProps {
  handleLogout: () => void;
}

export default function SideBar({ handleLogout }: sideBarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { name } = useUsersStore();
  const theme = useStreakTheme();

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${isOpen ? "min-[1000px]:w-52 min-[2000px]:w-60" : "min-[1000px]:w-18 min-[2000px]:w-18"}`}
    >
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-xl bg-[#1e1e2e] text-white shadow-lg"
      >
        <IoMenu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          bg-[#1e1e2e] flex flex-col gap-6 rounded-2xl shrink-0
          transition-all duration-300 ease-in-out overflow-hidden

          /* Mobile: slide-in drawer */
          fixed md:relative z-50 md:z-auto
          top-0 bottom-0 left-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0

          /* Width */
          w-80 md:w-auto ${isOpen ? " min-[2000px]:w-80" : " min-[2000px]:w-18"}

          /* Sticky on desktop */
          md:sticky md:top-0 md:h-[calc(100vh-12px)]

          px-3 pt-6 pb-4
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <IoClose className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="w-full flex justify-center items-center flex-col gap-1">
          <div
            className={`rounded-full ${theme.gradientBg} transition-all duration-300 shadow-lg ${theme.shadow} ${isOpen ? "w-14 h-14" : "w-10 h-10"}`}
          />
          <h5
            className={`font-bold text-lg transition-all duration-300 ${!isOpen && "md:hidden"}`}
          >
            <span className="text-white">Habit</span>
            <span className={theme.primary.replace("text-", "text-")}>
              Streak
            </span>
          </h5>
        </div>

        {/* Navigasi */}
        <div className="flex-1 flex flex-col gap-1.5 min-h-0 overflow-y-auto [scrollbar-width:none]">
          <CustomNavLink
            to="dashboard"
            variant="dashboard"
            label="Dashboard"
            isOpen={isOpen}
            onMobileClick={() => setMobileOpen(false)}
          />
          <CustomNavLink
            to="habitspage"
            variant="habits"
            label="Habits"
            isOpen={isOpen}
            onMobileClick={() => setMobileOpen(false)}
          />
          <CustomNavLink
            to="analyticspage"
            variant="analytics"
            label="Analytics"
            isOpen={isOpen}
            onMobileClick={() => setMobileOpen(false)}
          />
        </div>

        {/* Bottom Section (Profile & Actions) */}
        <div className="w-full flex flex-col gap-2 pt-4 border-t border-white/10">
          {/* User Profile */}

          {/* Toggle button — desktop only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex w-full items-center justify-center p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            {isOpen ? (
              <FaAngleDoubleLeft className="w-4 h-4" />
            ) : (
              <FaAngleDoubleRight className="w-4 h-4" />
            )}
          </button>

          <div
            className={`flex items-center ${isOpen ? "gap-3 px-2 mb-2" : "justify-center mb-2"}`}
          >
            <div
              className={`rounded-full ${theme.gradientBg} shadow-md ${theme.shadow} shrink-0 ${isOpen ? "w-9 h-9" : "w-8 h-8"}`}
            />
            {isOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-white truncate">
                  {name || "Loading.."}
                </span>
                {/* <span className="text-[10px] text-gray-400">Coming soon</span> */}
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`w-full font-semibold group flex items-center ${isOpen ? "justify-start px-4" : "justify-center md:px-0"} gap-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 py-2.5 rounded-xl transition-all duration-200 cursor-pointer`}
          >
            <FaRightFromBracket className="shrink-0 h-4 w-4" />
            <span className={`text-sm ${isOpen ? "" : "md:hidden"}`}>
              Logout
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
