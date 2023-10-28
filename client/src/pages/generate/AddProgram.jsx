import Tabs from "../../components/Tabs";
import { generateTabs } from "../../data/TabsData";

const AddProgram = () => {
  return (
    <>
      <Tabs tabs={generateTabs} />
      <div>Program Page</div>
    </>
  );
};

export default AddProgram;
