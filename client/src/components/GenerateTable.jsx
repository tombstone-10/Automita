import { useState } from "react";
import "./GenerateTable.css";
import { FaTrash } from "react-icons/fa";

const GenerateTable = ({ parentName }) => {
  const [isDelete, setDelete] = useState(false);

  // function responsible for opening and closing delete
  const toggleDelete = () => {
    setDelete(!isDelete);
  };

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
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>1</td>
              <td>A</td>
              <td className="del" onClick={toggleDelete}>
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>3</td>
              <td>A</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>5</td>
              <td>A</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>A</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>BSSE</td>
              <td>Fall</td>
              <td>7</td>
              <td>B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
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
            <tr>
              <td>SE301</td>
              <td>Software Re-Engineering</td>
              <td>3</td>
              <td>BSSE-7-A, BSSE-7-B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>SE336</td>
              <td>Mobile Application Development</td>
              <td>3</td>
              <td>BSSE-7-A, BSSE-7-B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>SE464</td>
              <td>Big Data Analytics</td>
              <td>3</td>
              <td>BSSE-7-A, BSSE-7-B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>SE421 </td>
              <td>Software Project Management</td>
              <td>3</td>
              <td>BSSE-7-A, BSSE-7-B</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
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
            <tr>
              <td>Dr. Iqbal Murtaza</td>
              <td>BSSE-F-3-B, BSSE-F-3-A</td>
              <td>
                Data Structures & Algorithms, Formal Methods in Software
                Engineering
              </td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>Mr. Adnan Aslam</td>
              <td>BSSE-F-7-A, BSSE-F-7-B</td>
              <td>Mobile Application Development, Big Data Analytics</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
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
            <tr>
              <td>401</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>402</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>403</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>404</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>405</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>406</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
            <tr>
              <td>407</td>
              <td className="del">
                <FaTrash />
              </td>
            </tr>
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
