import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLaptop, FaShieldAlt, FaInfoCircle } from "react-icons/fa";
import "./Tabs.css";

const Tabs = () => {
  const profileTabs = [
    {
      path: "/profile",
      name: "General",
      icon: <FaLaptop />,
    },
    {
      path: "/profile/security",
      name: "Security",
      icon: <FaShieldAlt />,
    },
    {
      path: "/profile/about",
      name: "About",
      icon: <FaInfoCircle />,
    },
  ];
  return (
    <>
      <div className="user-heading">
        <h2>Hello Ali</h2>
      </div>
      <div className="tabs">
        {profileTabs.map((item, index) => {
          return (
            <>
              <Link to={item.path} key={index} className="tab-item">
                <div className="tab-icon">{item.icon}</div>
                <div>{item.name}</div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
