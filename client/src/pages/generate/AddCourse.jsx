import Add from "../../components/Add";
import Tabs from "../../components/Tabs";
import { generateTabs } from "../../data/TabsData";

const AddCourse = () => {
  return (
    <>
      <Tabs tabs={generateTabs} />
      <Add parentName={"addCourse"} />
    </>
  );
};

export default AddCourse;
