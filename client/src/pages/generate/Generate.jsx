import Tabs from "../../components/Tabs";
import { generateTabs } from "../TabsData";

const Generate = () => {
  return (
    <>
      <Tabs tabs={generateTabs} parentName="generate" />
      <h2>Generate Timetable</h2>
    </>
  );
};

export default Generate;
