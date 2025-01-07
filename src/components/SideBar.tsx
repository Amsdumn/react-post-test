import React from "react";
import useGlobalStore from "../store/useGlobalStore";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { status } = useGlobalStore();
  const menuItems = [
    {
      to: '/',
      text: 'Home'
    },
    {
      to: '/virtualize-list',
      text: 'Virtualized & Infinite Scroll'
    },
    {
      to: '/product-management',
      text: 'Product Management'
    },
    {
      to: '/register',
      text: 'Register'
    },
  ]

  return (
    <div
      className={`fixed top-0 left-0 w-80 h-full z-40 bg-slate-200 dark:bg-gray-800 dark:text-white py-4 transition-transform duration-300 ${
        status ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="py-4 mt-16">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
          <li key={index} className="">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 block w-full hover:bg-blue-600 hover:text-white ${
                  isActive ? "bg-blue-700 text-white" : "text-slate-900 dark:text-white"
                }`
              }
            >
              {item.text}
            </NavLink>
          </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
