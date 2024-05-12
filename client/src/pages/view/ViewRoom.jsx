import Tabs from "../../components/Tabs/Tabs";
import { viewTabs } from "../../data/TabsData";
import "./View.css";
import { useLocation, useParams } from "react-router-dom";
import VerticalTabs from "../../components/Tabs/VerticalTabs";
import axios from "axios";
import { useEffect, useState } from "react";
const ViewRoom = () => {
  const location = useLocation();
  const id = useParams().id;

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeslots = ["8:00AM-9:00AM", "9:00AM-10:00AM", "10:00AM-11:00AM", "11:00AM-12:00PM", "12:00PM-1:00PM", "1:00PM-2:00PM", "2:00PM-3:00PM", "3:00PM-4:00PM"];
  var url = "";
  const [timetableData, setTimetableData] = useState([]);
  useEffect(() => {
    if (id) {
      if (location.pathname.includes("/view/room")) {
        url = `http://localhost:5000/api/timetables/timetable-get/rooms/201271@students.au.edu.pk/${id}`;
        axios
          .get(url) // Initiates the GET request
          .then((response) => {
            setTimetableData(response.data); // Handles the successful response
          }) // Correctly closes the 'then' block
          .catch((error) => {
            console.error("ERROR FETCHING DATA", error); // Handles errors
          }); // Correctly closes the 'catch' block

      }
      else if (location.pathname.includes("/view/class")) {
        url = `http://localhost:5000/api/timetables/timetable-get/classes/201271@students.au.edu.pk/${id}`;
        axios
          .get(url) // Initiates the GET request
          .then((response) => {;
            setTimetableData(response.data); // Handles the successful response
          }) // Correctly closes the 'then' block
          .catch((error) => {
            console.error("ERROR FETCHING DATA", error); // Handles errors
          }); // Correctly closes the 'catch' block
      }
      else if (location.pathname.includes("/view/teacher")) {
        url = `http://localhost:5000/api/timetables/timetable-get/teachers/201271@students.au.edu.pk/${id}`;
        axios
          .get(url) // Initiates the GET request
          .then((response) => {

            setTimetableData(response.data); // Handles the successful response
          }) // Correctly closes the 'then' block
          .catch((error) => {
            console.error("ERROR FETCHING DATA", error); // Handles errors
          }); // Correctly closes the 'catch' block
      }
      else
        setTimetableData([]);

    }
  }, [id]);

  return (
    <>
      <Tabs tabs={viewTabs} />
      <div className="view-parent-container">
        <div className="view-list">
          <VerticalTabs parentName={"room"} />
        </div>
        <div className="default-timetable">
          <table className="timetable">
            <thead>
              <tr>
                <th className="timeslots">Time Slot</th>
                {days.map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeslots.map((time, timeIndex) => (
                <tr key={timeIndex}>
                  <td className="time-cell">{time}</td>
                  {days.map((day, dayIndex) => {
                    const classData = timetableData.find(
                      (item) => item.day === day && item.timeSlot === time
                    );
                    return (
                      <td key={dayIndex} className="class-cell">
                        <tr>
                          {classData ? classData.course_assigned : ""}
                        </tr>
                        <tr>
                          <td style={{ fontSize: '10px', textAlign: 'left', border: 'none' }}>{classData ? classData.name : ""}</td>
                          <td style={{ fontSize: '10px', textAlign: 'right', border: 'none' }}>{classData ? classData.room : ""}</td>
                        </tr>

                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewRoom;
