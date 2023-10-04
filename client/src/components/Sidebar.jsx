import React from "react";
import { FaUserAlt, FaBars } from "react-icons/fa";
import logo from "../assets/png/logo-icon.png";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const sidebarNav = [
    {
      path: "/profile",
      name: "Profile",
    },
    {
      path: "/generate",
      name: "Generate",
    },
    {
      path: "/view",
      name: "View",
    },
  ];
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="top-section">
          <img src={logo} className="sidebar-logo" />
          <h1>Automita</h1>
          <div className="bars">
            <FaBars />
          </div>
        </div>
        {sidebarNav.map((item, index) => {
          return (
            <>
              <NavLink to={item.path}>
                <div>{item.name}</div>
              </NavLink>
            </>
          );
        })}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
