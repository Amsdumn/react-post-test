import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";
import useGlobalStore from "../store/useGlobalStore";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { status, setStatus } = useGlobalStore();

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center">
        <button
          onClick={() => setStatus(!status)}
          className="py-1 px-2 rounded-md bg-transparent border-none outline-none focus:outline-none"
        >
          <div className="flex justify-center">
            {!status ? (
              <FaBars className="text-2xl leading-none" />
            ) : (
              <IoClose className="text-2xl leading-none" />
            )}
          </div>
          <span className="uppercase text-xs text-slate-900 dark:text-white leading-none block">
            {!status ? (
              "menu"
            ) : (
              "close"
            )}
          </span>
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white ml-4">My App</h1>
      </div>
      <div className="flex items-center">
        <NavLink to="/register" className={`px-4 py-2 bg-purple-950 text-white rounded-md mr-4 hover:text-white hover:brightness-110`}>Register</NavLink>
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 dark:bg-blue-900 text-white bg-blue-300 focus:border-white focus:outline-none"
        >
          <FaSun className={`${!isDarkMode ? "block" : "hidden"} text-yellow-200`} />
          <FaMoon className={`${isDarkMode ? "block" : "hidden"} text-blue-200`} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
