import Add from "../../components/Add/Add";
import Tabs from "../../components/Tabs/Tabs";
import { generateTabs } from "../../data/TabsData";

const TimeSlot = () => {
  return (
    <>
      <Tabs tabs={generateTabs} />
      <Add parentName={"timeSlot"} />
    </>
  );
};

export default TimeSlot;
