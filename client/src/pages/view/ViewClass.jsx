import Tabs from "../../components/Tabs";
import { viewTabs } from "../../data/TabsData";
import ViewList from "../../components/VerticalTabs";
import "./View.css";
import Sidebar from "../../components/Sidebar";

const ViewClass = () => {
  return (
    <>
      <Tabs tabs={viewTabs} />
      <ViewList />
    </>
  );
};

export default ViewClass;
