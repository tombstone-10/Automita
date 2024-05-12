import { useEffect, useState } from "react";
import "./VerticalTabs.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const VerticalTabs = ({ parentName }) => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const urlTeacher = "http://localhost:5000/api/timetables/teachers-get/201271@students.au.edu.pk";
  const urlClass = "http://localhost:5000/api/timetables/classes-get/201271@students.au.edu.pk";
  const urlRoom = "http://localhost:5000/api/timetables/rooms-get/201271@students.au.edu.pk";
  useEffect(() => {
    if (parentName == "class") {
      axios
        .get(urlClass)
        .then((response) => {
          setAllClasses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    else if (parentName == "teacher") {
      axios
        .get(urlTeacher)
        .then((response) => {
          setAllTeachers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    else if (parentName == "room") {
      axios
        .get(urlRoom)
        .then((response) => {
          setAllRooms(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

  }, [parentName]);
  return (
    <>
      {parentName == "class" && (
        <div className="view-container">
          <div className="list-left-panel">
            {allClasses.map((list, index) => {
              return (
                <>
                  <div className="list-row">
                    <NavLink to={`/view/class/${list}`} key={index} className="list-text">
                      <div className="list">{list}</div>
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
            {allTeachers.map((list, index) => {
              return (
                <>
                  <div className="list-row">
                    <NavLink to={`/view/teacher/${list}`} key={index} className="list-text">
                      <div className="list">{list}</div>
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
            {allRooms.map((list, index) => {
              return (
                <>
                  <div className="list-row">
                    <NavLink to={`/view/room/${list}`} key={index} className="list-text">
                      <div className="list">{list}</div>
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
