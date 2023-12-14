import Tabs from "../../components/Tabs/Tabs";
import { viewTabs } from "../../data/TabsData";
import "./View.css";
import { useLocation } from "react-router-dom";
import VerticalTabs from "../../components/Tabs/VerticalTabs";
import Lottie from "react-lottie";
import gif from "../../assets/gif/profile-gif.json";
import { bsse1a, bsse1b, bsse3a, bsse3b, bsse5a, bsse5b, bsse7a, bsse7b, } from "../../components/Timetable/TimetableClass";
const ViewTeacher = () => {
  const location = useLocation();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeslots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  var timetableData = [];
  if (location.pathname !== "/view/teacher") {
    if (location.pathname === '/view/teacher/dr-iqbal-murtaza') {
      if (bsse1a)
        timetableData = bsse1a;
      else
        timetableData = [];
    }
  }
  else {
    timetableData = [];
  }

  return (
    <>
      <Tabs tabs={viewTabs} />
      <div className="view-parent-container">
        <div className="view-list">
          <VerticalTabs parentName={"teacher"} />
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
                    const classData = timetableData.find(item => item.day === day && item.time === time);
                    return (
                      <td key={dayIndex} className="class-cell">
                        {classData ? classData.class : ''}
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

export default ViewTeacher;
