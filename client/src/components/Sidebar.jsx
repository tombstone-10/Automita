import React, { useState } from "react";
import {
  FaUserAlt,
  FaPlus,
  FaCalendar,
  FaBars,
  FaPowerOff,
  FaChevronLeft,
} from "react-icons/fa";
import logo from "../assets/png/logo-icon.png";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const sidebarNav = [
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/generate",
      name: "Generate",
      icon: <FaPlus />,
    },
    {
      path: "/view",
      name: "View",
      icon: <FaCalendar />,
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <FaPowerOff />,
    },
  ];
  return (
    <div className="sidebar-container">
      <div className={isOpen ? "sidebar" : "sidebar-close"}>
        <div className="top-section">
          <img src={logo} className={isOpen ? "sidebar-logo" : "collapsed"} />
          <h3 className={!isOpen && "collapsed"}>Automita</h3>
          <div className="sidebar-bar" onClick={toggleSidebar}>
            {isOpen ? <FaChevronLeft /> : <FaBars />}
          </div>
        </div>
        <div className="link-section">
          {sidebarNav.map((item, index) => {
            return (
              <>
                <NavLink
                  to={item.path}
                  key={index}
                  className="link"
                  activeclassName="active"
                >
                  <div className="sidebar-icon">{item.icon}</div>
                  <div className={!isOpen && "collapsed"}>{item.name}</div>
                </NavLink>
              </>
            );
          })}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
