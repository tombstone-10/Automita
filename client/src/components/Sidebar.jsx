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
import Loading from "./Loading";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);
  const sidebarNav = [
    {
      id: 1,
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      id: 2,
      path: "/generate",
      name: "Generate",
      icon: <FaPlus />,
    },
    {
      id: 3,
      path: "/view",
      name: "View",
      icon: <FaCalendar />,
    },
    {
      id: 4,
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
          <div
            className={isOpen ? "sidebar-left" : "sidebar-bar"}
            onClick={toggleSidebar}
          >
            {isOpen ? <FaChevronLeft /> : <FaBars />}
          </div>
        </div>
        <div className="link-section">
          {sidebarNav.map((item, index) => {
            return (
              <>
                <NavLink to={item.path} key={item.id} className="link">
                  <div className="sidebar-icon">{item.icon}</div>
                  <div className={!isOpen && "collapsed"}>{item.name}</div>
                </NavLink>
              </>
            );
          })}
        </div>
      </div>

      <main>
        {/* {isLoading ? (
          <div className="loading">
            <Loading />
          </div>
        ) : (
          { children }
        )} */}
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
