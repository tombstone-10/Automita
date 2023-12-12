import Add from "../../components/Add/Add";
import Tabs from "../../components/Tabs/Tabs";
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
