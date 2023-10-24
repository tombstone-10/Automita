import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Tabs.css";
import { FaLaptop, FaShieldAlt, FaInfoCircle } from "react-icons/fa";

const Tabs = ({ tabs }) => {
  return (
    <>
      <div className="tabs">
        {tabs.map((item, index) => {
          return (
            <>
              <NavLink to={item.path} key={index} className="tab-item">
                <div className="tab-icon">{item.icon}</div>
                <div>{item.name}</div>
              </NavLink>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
