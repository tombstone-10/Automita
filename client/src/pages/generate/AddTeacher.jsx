import Add from "../../components/Add";
import Tabs from "../../components/Tabs";
import { generateTabs } from "../../data/TabsData";

const AddTeacher = () => {
  return (
    <>
      <Tabs tabs={generateTabs} />
      <Add parentName={"addTeacher"} />
    </>
  );
};

export default AddTeacher;
