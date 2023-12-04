import Add from "../../components/Add";
import Tabs from "../../components/Tabs";
import { generateTabs } from "../../data/TabsData";
import "./Generate.css";

const AddClass = () => {
  return (
    <>
      <Tabs tabs={generateTabs} />
      <Add parentName={"addClass"} />
      <div className="generateBtnContainer">
        <button>Generate</button>
      </div>
    </>
  );
};

export default AddClass;
