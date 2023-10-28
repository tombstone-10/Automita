import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Tabs.css";
import { FaLaptop, FaShieldAlt, FaInfoCircle } from "react-icons/fa";

const Tabs = ({ tabs, parentName }) => {
  return (
    <>
      <div
        className={
          parentName == "profile" || parentName == "generate"
            ? "tabs"
            : "tabs-equal-border"
        }
      >
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
