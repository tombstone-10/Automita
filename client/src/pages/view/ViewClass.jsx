import Tabs from "../../components/Tabs/Tabs";
import { viewTabs } from "../../data/TabsData";
import "./View.css";
import { useLocation } from "react-router-dom";
import VerticalTabs from "../../components/Tabs/VerticalTabs";
import gif from "../../assets/gif/profile-gif.json";
import {
  bsse1a,
  bsse1b,
  bsse3a,
  bsse3b,
  bsse5a,
  bsse5b,
  bsse7a,
  bsse7b,
} from "../../components/Timetable/TimetableClass";

const ViewClass = () => {
  const location = useLocation();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: gif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  var timetableData = [];
  if (location.pathname !== "/view/class") {
    if (location.pathname == "/view/class/bsse-i-a") {
      if (bsse1a) timetableData = bsse1a;
      else timetableData = [];
    } else if (location.pathname == "/view/class/bsse-i-b") {
      if (bsse1b) timetableData = bsse1b;
      else timetableData = [];
    } else if (location.pathname == "/view/class/bsse-iii-a") {
      if (bsse3a) timetableData = bsse3a;
      else timetableData = [];
    } else if (location.pathname == "/view/class/bsse-iii-b") {
      if (bsse3b) timetableData = bsse3b;
      else timetableData = [];
    } else if (location.pathname == "/view/class/bsse-v-a") {
      if (bsse5a) timetableData = bsse5a;
      else timetableData = [];
    } else if (location.pathname == "/view/class/bsse-v-b") {
      if (bsse5b) timetableData = bsse5b;
      else timetableData = [];
    } else if (location.pathname == "/view/class/bsse-vii-a") {
      if (bsse7a) timetableData = bsse7a;
      else timetableData = [];
    } else if (location.pathname == "/view/class/bsse-vii-b") {
      if (bsse7b) timetableData = bsse7b;
      else timetableData = [];
    }
  }

  // Days and timeslots
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeslots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <>
      <Tabs tabs={viewTabs} />
      <div className="view-parent-container">
        <div className="view-list">
          <VerticalTabs parentName={"class"} />
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
                      (item) => item.day === day && item.time === time
                    );
                    return (
                      <td key={dayIndex} className="class-cell">
                        {classData ? classData.class : ""}
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

export default ViewClass;
