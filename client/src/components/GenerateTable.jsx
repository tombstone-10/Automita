import "./GenerateTable.css";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { TimetableContext } from "../hooks/timetableDataHook";
const useTimeTables = () => {
  return useContext(TimetableContext);
}
const GenerateTable = ({ parentName }) => {
  const { classes_addition, course_addition, teacher_addition, room_addition } = useTimeTables();
  
  return (
    <>
      {parentName == "addClass" && (
        <div className="table">
          <table>
            <tr>
              <th>Program Name</th>
              <th>Session</th>
              <th>Semester</th>
              <th>Section</th>
              <th></th>
            </tr>
            {classes_addition.map((classes, index) => (
              <tr key={index}>
                <td>{classes.program_name}</td>
                <td>{classes.session}</td>
                <td>{classes.semester}</td>
                <td>{classes.section}</td>
                <td className="del">
                  <FaTrash />
                </td>
              </tr>
            ))}

          </table>
        </div>
      )}

      {parentName == "addCourse" && (
        <div className="table">
          <table>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credit Hour</th>
              <th>Assigned To</th>
              <th></th>
            </tr>
            {course_addition.map((courses, index) => (
              <tr key={index}>
                <td>{courses.course_code}</td>
                <td>{courses.course_name}</td>
                <td>{courses.credit_hour}</td>
                <td>{courses.assigned_to}</td>
                <td className="del">
                  <FaTrash />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}

      {parentName == "addTeacher" && (
        <div className="table">
          <table>
            <tr>
              <th>Teacher Name</th>
              <th>Assigned Class(es)</th>
              <th>Assigned Course(es)</th>
              <th></th>
            </tr>
            {teacher_addition.map((teachers,index)=> (
              <tr key={index}>
              <td>{teachers.teacher_name}</td>
              <td>{teachers.assigned_classes}</td>
              <td>{teachers.assigned_courses}</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            ))}
          </table>
        </div>
      )}

      {parentName == "addRoom" && (
        <div className="table">
          <table>
            <tr>
              <th>Room Name</th>
              <th></th>
            </tr>
            {room_addition.map((rooms,index) => (
              <tr key={index}>
                <td>{rooms.room_no}</td>
                <td className="del">
                <FaTrash />
              </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </>
  );
};

export default GenerateTable;
