import React, { useState } from "react";
import "./Add.css";
import { FaPlus } from "react-icons/fa";
import GenerateTable from "./GenerateTable";

const Add = ({ parentName }) => {
  // initially popup is not open
  const [modal, setModal] = useState(false);

  // function responsible for opening and closing modal
  const toggleModal = () => {
    setModal(!modal);
    console.log("i am clicked");
  };

  return (
    <>
      <div className="add-container" onClick={toggleModal}>
        <div className="add-btn">
          <div className="add-btn-icon">
            <FaPlus />
          </div>
        </div>
      </div>

      <GenerateTable />

      {/* will only render for add program page */}
      {modal && parentName == "addProgram" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form">
              <div className="add-form-row">
                <label htmlFor="programName">Program Name</label>
                <select name="programName">
                  <option value="BSSE">BSSE</option>
                  <option value="BSAI">BSAI</option>
                  <option value="BSCGD">BSCGD</option>
                  <option value="BSDS">BSDS</option>
                </select>
              </div>
              <div className="add-form-row">
                <label htmlFor="sessionName">Choose Session</label>
                <select name="sessionName">
                  <option value="fall">Fall</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                </select>
              </div>
              <div className="add-form-row">
                <label htmlFor="semesterName">Choose Semester</label>
                <select name="sessionName">
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
                <label htmlFor="assignToProgram">Assign to Program(s)</label>
                <select name="assignToProgram" id="assignToProgram" multiple>
                  <option value="BSSE">BSSE</option>
                  <option value="BSAI">BSAI</option>
                  <option value="BSCGD">BSCGD</option>
                  <option value="BSDS">BSDS</option>
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
    </>
  );
};

export default Add;
