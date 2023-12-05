import React, { useState } from "react";
import Select from "react-select";
import "./Add.css";
import { FaPlus } from "react-icons/fa";
import GenerateTable from "./GenerateTable";

const Add = ({ parentName }) => {
  // initially popup is not open
  const [modal, setModal] = useState(false);
  const [isSearchable, setIsSearchable] = useState(false);

  // function responsible for opening and closing modal
  const toggleModal = () => {
    setModal(!modal);
  };

  // options for multi select dropdown
  const assignClasses = [
    { value: "BSSE-F-1-A", label: "BSSE-F-1-A" },
    { value: "BSSE-F-1-B", label: "BSSE-F-1-B" },
    { value: "BSSE-F-3-A", label: "BSSE-F-3-A" },
    { value: "BSSE-F-3-B", label: "BSSE-F-3-B" },
  ];

  // options for multi select dropdown
  const assignCourses = [
    {
      value: "Data Structures & Algorithms",
      label: "Data Structures & Algorithms",
    },
    {
      value: "Mobile Application Development",
      label: "Mobile Application Development",
    },
    {
      value: "Formal Methods in Software Engineering",
      label: "Formal Methods in Software Engineering",
    },
    { value: "Big Data Analytics", label: "Big Data Analytics" },
  ];

  return (
    <>
      <div className="add-container" onClick={toggleModal}>
        <div className="add-btn">
          <div className="add-btn-icon">
            <FaPlus />
          </div>
        </div>
      </div>

      <GenerateTable parentName={parentName} />

      {/* will only render for add program page */}
      {modal && parentName == "addClass" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form">
              <div className="add-form-row">
                <label htmlFor="programName">Program Name</label>
                <select name="programName" required>
                  <option value="BSSE">BSSE</option>
                  <option value="BSAI">BSAI</option>
                  <option value="BSCGD">BSCGD</option>
                  <option value="BSDS">BSDS</option>
                </select>
              </div>
              <div className="add-form-row">
                <label htmlFor="sessionName">Choose Session</label>
                <select name="sessionName" required>
                  <option value="fall">Fall</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                </select>
              </div>
              <div className="add-form-row">
                <label htmlFor="semesterName">Choose Semester</label>
                <select name="sessionName" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div className="add-form-row">
                <label htmlFor="semesterName">Choose Section</label>
                <select name="sessionName">
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* will only render for add course page */}
      {modal && parentName == "addCourse" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form">
              <div className="add-form-row">
                <label htmlFor="courseCode">Course Code</label>
                <input
                  type="text"
                  placeholder="Enter course code"
                  name="courseCode"
                  id="courseCode"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="courseName">Course Name</label>
                <input
                  type="text"
                  placeholder="Enter course name"
                  name="courseName"
                  id="courseName"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="creditHours">Credit Hours</label>
                <input
                  type="text"
                  placeholder="Enter credit hours"
                  name="creditHours"
                  id="creditHours"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="assignToProgram">Assign to Class(es)</label>
                <Select
                  className="multi-select-dropdown"
                  options={assignClasses}
                  isMulti
                  isSearchable={isSearchable}
                  // className="basic-multi-select"
                  // classNamePrefix="select"
                />
              </div>
              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* will only render for add teacher page */}
      {modal && parentName == "addTeacher" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form">
              <div className="add-form-row">
                <label htmlFor="teacherName">Teacher Name</label>
                <input
                  type="text"
                  placeholder="Enter teacher name"
                  name="teacherName"
                  id="teacherName"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="assignToClass">Assign to Class(es)</label>
                <Select
                  className="multi-select-dropdown"
                  options={assignClasses}
                  isMulti
                  isSearchable={isSearchable}
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="assignToCourse">Assign to Course(s)</label>
                <Select
                  className="multi-select-dropdown"
                  options={assignCourses}
                  isMulti
                  isSearchable={isSearchable}
                  // className="basic-multi-select"
                  // classNamePrefix="select"
                />
              </div>
              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* will only render for add room page */}
      {modal && parentName == "addRoom" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form">
              <div className="add-form-row">
                <label htmlFor="roomName">Room Name</label>
                <input
                  type="text"
                  placeholder="Enter room name"
                  name="roomName"
                  id="roomName"
                />
              </div>
              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* will only render for add program page */}
      {modal && parentName == "timeSlot" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form">
              <div className="add-form-row">
                <label htmlFor="availableHours">Available Hours Per Day</label>
                <input
                  name="availableHours"
                  type="number"
                  min={1}
                  max={12}
                  placeholder="Enter from 1 to 12"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="startTime">Day Start Time</label>
                <input
                  name="startTime"
                  type="number"
                  placeholder="Enter Starting Time"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="endTime">Day End Time</label>
                <input
                  name="endTime"
                  type="number"
                  placeholder="Enter Ending Time"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="classDuration">Enter Class Duration</label>
                <input
                  name="classDuration"
                  type="number"
                  placeholder="Minutes for each class"
                />
              </div>

              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Add;
