import "./GenerateTable.css";
import { FaTrash } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { TimetableContext } from "../hooks/timetableDataHook";
import axios from "axios";
const useTimeTables = () => {
  return useContext(TimetableContext);
}
const getuserTimeTable = async (url, token) => {
  if (token) {
    let id = JSON.parse(token);
    try {
      const res = await axios.post(url, { id });
      if (res.data) {
        return res.data;
      }
      else {
        return null;
      }
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }
  else {
    return null;
  }
}


const GenerateTable = ({ parentName }) => {
  const [isDelete, setDelete] = useState(false);
  const { classes_addition, set_classes_addition, course_addition, set_course_addition, teacher_addition, set_teacher_addition, room_addition, set_room_addition } = useTimeTables();
  const storedToken = sessionStorage.getItem('userToken');
   // function responsible for opening and closing delete
   const toggleDelete = () => {
    setDelete(!isDelete);
  };
  const fetchdata = async (parentName) => {
    if (parentName === "addClass") {
      const url = 'http://localhost:5000/api/timetables/class/get';
      const data = await getuserTimeTable(url, storedToken);
      await set_classes_addition(data);
    }
    else if (parentName === "addCourse") {
      const url = 'http://localhost:5000/api/timetables/course/get';
      const data = await getuserTimeTable(url, storedToken);
      await set_course_addition(data);
    }
    else if (parentName === "addTeacher") {
      const url = 'http://localhost:5000/api/timetables/teacher/get';
      const data = await getuserTimeTable(url, storedToken);
      await set_teacher_addition(data);
    }
    else if (parentName === "addRoom") {
      const url = 'http://localhost:5000/api/timetables/room/get';
      const data = await getuserTimeTable(url, storedToken);
      if(data){
      await set_room_addition(data);}
    }
  }
  useEffect(() => {
    fetchdata(parentName);
  }, []);

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
                <td>{courses.code}</td>
                <td>{courses.name}</td>
                <td>{courses.credit_hours}</td>
                <td>{courses.class_assigned.map((singleClass, index) => (
                  <div key={index}>
                    {`${singleClass.program_name}-${singleClass.session}-${singleClass.semester}-${singleClass.section}`}
                  </div>
                ))}

                </td>
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
            {teacher_addition.map((teachers, index) => (
              <tr key={index}>
                <td>{teachers.name}</td>
                <td>{teachers.class_assigned.map((singleClass, index) => (
                  <div key={index}>
                    {`${singleClass.program_name}-${singleClass.session}-${singleClass.semester}-${singleClass.section}`}
                  </div>
                ))}

                </td>
                <td>
                  <div>
                  {`${teachers.course_assigned.code} ${teachers.course_assigned.name}`}
                  </div>
                </td>
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
            {room_addition.map((rooms, index) => (
              <tr key={index}>
                <td>{rooms.rooms}</td>
                <td className="del">
                  <FaTrash />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
      {parentName == "timeSlot" && (
        <div className="table">
          <table>
            <tr>
              <th>Available Hours</th>
              <th>Day Start Time</th>
              <th>Day End Time</th>
              <th>Class Duration (Minutes)</th>
              <th></th>
            </tr>
            <tr>
              <td>10</td>
              <td>0800</td>
              <td>1800</td>
              <td>50</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
          </table>
        </div>
      )}
      {/* code responsible for delete modal */}
      {isDelete && (
        <div className="delete-container">
          <div className="delete-form">
            <div className="delete-form-row">
              <h3>Are you sure you want to delete?</h3>
            </div>
            <div className="add-form-row">
              <button onClick={toggleDelete}>No</button>
              <button type="submit">Yes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateTable;
