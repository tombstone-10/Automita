import "./GenerateTable.css";
import { FaTrash } from "react-icons/fa";

const GenerateTable = () => {
  return (
    <>
      <div className="table">
        <table>
          <tr>
            <th>Program Name</th>
            <th>Session</th>
            <th>Semester</th>
            <th></th>
          </tr>
          <tr>
            <td>BSSE</td>
            <td>Fall</td>
            <td>1</td>
            <td className="del">
              <FaTrash />
            </td>
          </tr>
          <tr>
            <td>BSSE</td>
            <td>Fall</td>
            <td>3</td>
            <td className="del">
              <FaTrash />
            </td>
          </tr>
          <tr>
            <td>BSSE</td>
            <td>Fall</td>
            <td>5</td>
            <td className="del">
              <FaTrash />
            </td>
          </tr>
          <tr>
            <td>BSSE</td>
            <td>Fall</td>
            <td>7</td>
            <td className="del">
              <FaTrash />
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default GenerateTable;
