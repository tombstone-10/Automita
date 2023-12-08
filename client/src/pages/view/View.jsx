import Tabs from "../../components/Tabs";
import DefaultPage from "../../components/DefaultPage";
import { viewPage } from "../../data/PageData";
import { viewTabs } from "../../data/TabsData";
import "./View.css";

const View = () => {
  return (
    <>
      <Tabs tabs={viewTabs} />
      <DefaultPage currentPage={viewPage} parentName={"view"} />
    </>
  );
};

export default View;
