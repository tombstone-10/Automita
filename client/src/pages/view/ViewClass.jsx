import Tabs from "../../components/Tabs";
import { viewTabs } from "../../data/TabsData";
import ViewList from "../../components/ViewList";
import "./View.css";

const ViewClass = () => {
  return (
    <>
      <Tabs tabs={viewTabs} />
      <ViewList />
    </>
  );
};

export default ViewClass;
