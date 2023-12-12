import { classesList } from "../data/ViewListData";
import Timetable from "./Timetable";
import "./VerticalTabs.css";
import { Link, NavLink } from "react-router-dom";
import ViewListRoutes from "./ViewListRoutes";

const viewList = () => {
  return (
    <>
      <div className="view-container">
        <div className="list-left-panel">
          {classesList.map((list, index) => {
            return (
              <>
                <div className="list-row">
                  <NavLink to={list.name} key={index} className="list-text">
                    {list.name}
                  </NavLink>
                </div>
              </>
            );
          })}
        </div>
        <div className="timetable">
          <Timetable />
        </div>
      </div>
    </>
  );
};

export default viewList;
