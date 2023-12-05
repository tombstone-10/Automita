import "./GenerateTable.css";
import { FaTrash } from "react-icons/fa";
import { useState } from 'react';

const GenerateTable = ({ parentName }) => {
  const [classes_addition, set_classes_addition] = useState([{ programName: 'BSSE', session: 'Fall', semester: '1', section: 'A' },
  { programName: 'BSSE', session: 'Fall', semester: '1', section: 'A' },
  { programName: 'BSSE', session: 'Fall', semester: '3', section: 'A' },
  { programName: 'BSSE', session: 'Fall', semester: '5', section: 'A' },
  { programName: 'BSSE', session: 'Fall', semester: '7', section: 'A' },
  { programName: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
  { programName: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
  { programName: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
  { programName: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
  { programName: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
  { programName: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
  { programName: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
  { programName: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
  ]);
  const [course_addition, set_course_addition] = useState([{ course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE336', course_name: 'Mobile Application Development', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE464', course_name: 'Big Data Analytics', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE421', course_name: 'Software Project Management', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
  { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },

  ]);
  const [teacher_addition, set_teacher_addition] = useState ([{teacher_name: 'Dr. Iqbal Murtaza', assigned_classes:'BSSE-F-3-B, BSSE-F-3-A',
  assigned_courses:'Data Structures & Algorithms, Formal Methods in Software'},
  {teacher_name: 'Mr. Adnan Aslam', assigned_classes:'BSSE-F-3-B, BSSE-F-3-A',
  assigned_courses:'Mobile Application Development, Big Data Analysis'},
  {teacher_name: 'Dr. Iqbal Murtaza', assigned_classes:'BSSE-F-3-B, BSSE-F-3-A',
  assigned_courses:'Data Structures & Algorithms, Formal Methods in Software'},
  {teacher_name: 'Dr. Iqbal Murtaza', assigned_classes:'BSSE-F-3-B, BSSE-F-3-A',
  assigned_courses:'Data Structures & Algorithms, Formal Methods in Software'},


  ])
  const [room_addition, set_room_addition] = useState ([
    {room_no:'401'},
    {room_no:'402'},
    {room_no:'403'},
    {room_no:'404'},
    {room_no:'405'},
    {room_no:'406'},
    {room_no:'407'},
    {room_no:'401 - Lab'}
  ])
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
                <td>{classes.programName}</td>
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
