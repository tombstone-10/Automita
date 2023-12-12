import { classesList } from "../data/ViewListData";
import Timetable from "./Timetable";
import "./VerticalTabs.css";
import { Link, NavLink } from "react-router-dom";

const viewList = () => {
  return (
    <>
      <div className="view-container">
        <div className="list-left-panel">
          {classesList.map((list, index) => {
            return (
              <>
                <div className="list-row">
                  <NavLink to={list.path} key={index} className="list-text">
                    <div className="list">{list.name}</div>
                  </NavLink>
                </div>
              </>
            );
          })}
        </div>
        <div className="timetable"></div>
      </div>
    </>
  );
};

export default viewList;
