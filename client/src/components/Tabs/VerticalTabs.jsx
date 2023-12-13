import { classesList, roomsList } from "../../data/ViewListData";
import { teachersList } from "../../data/ViewListData";
import "./VerticalTabs.css";
import { Link, NavLink } from "react-router-dom";

const VerticalTabs = ({ parentName }) => {
  return (
    <>
      {parentName == "class" && (
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
        </div>
      )}

      {parentName == "teacher" && (
        <div className="view-container">
          <div className="list-left-panel">
            {teachersList.map((list, index) => {
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
        </div>
      )}

      {parentName == "room" && (
        <div className="view-container">
          <div className="list-left-panel">
            {roomsList.map((list, index) => {
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
        </div>
      )}
    </>
  );
};

export default VerticalTabs;
