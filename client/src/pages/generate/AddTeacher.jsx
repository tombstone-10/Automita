import Tabs from "../../components/Tabs";
import { generateTabs } from "../../data/TabsData";

const AddTeacher = () => {
  return (
    <>
      <Tabs tabs={generateTabs} />
      <div>Teacher Page</div>
    </>
  );
};

export default AddTeacher;
