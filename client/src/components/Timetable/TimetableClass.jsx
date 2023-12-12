import "./Timetable.css";
import ViewClass from "../../pages/view/ViewClass";
import Tabs from "../Tabs/Tabs";
import { viewTabs } from "../../data/TabsData";
import VerticalTabs from "../Tabs/VerticalTabs";

const Timetable = () => {
  return (
    <>
      <div className="main-timetable-container">
        <div className="view-container">
          <ViewClass />
        </div>
        <div className="timetable-container">I am timetable from component</div>
      </div>
    </>
  );
};

export default Timetable;
