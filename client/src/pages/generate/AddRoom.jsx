import Add from "../../components/Add";
import Tabs from "../../components/Tabs";
import { generateTabs } from "../../data/TabsData";
import "./Generate.css";

const AddRoom = () => {
  return (
    <>
      <Tabs tabs={generateTabs} />
      <Add parentName={"addRoom"} />
    </>
  );
};

export default AddRoom;
