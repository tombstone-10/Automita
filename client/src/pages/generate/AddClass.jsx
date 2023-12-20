import { useState } from "react";
import Add from "../../components/Add/Add";
import Tabs from "../../components/Tabs/Tabs";
import { generateTabs } from "../../data/TabsData";
import "./Generate.css";
import Loading from "../../components/Loading";

const AddClass = () => {
  const [modal, setModal] = useState(false);
  const generatePop = () => {
    setModal(!modal);
  }
  return (
    <>
      <div className="scroll-container">
        <Tabs tabs={generateTabs} />
        <div className="generateBtnContainer">
          <a href="#generate">
          <button  onClick={generatePop}>Generate</button>
          </a>
        </div>
        {modal && (<div className="popup-container">
          <div className="generate-form">
          <div className="gen">
            <Loading/>
            <h3 className="gen-h">Generating Timetable...</h3>
            <h4 className="gen-h">Please Wait</h4>
            <a href="#cancel">
              <button className="cancel-btn" onClick={generatePop}>Cancel</button>
            </a>
          </div>
          </div>
          
        </div>)}
        <Add parentName={"addClass"} />
        
      </div>
    </>
  );
};

export default AddClass;
