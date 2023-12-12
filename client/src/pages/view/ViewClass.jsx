import Tabs from "../../components/Tabs/Tabs";
import { viewTabs } from "../../data/TabsData";
import "./View.css";
import { useLocation } from "react-router-dom";
import VerticalTabs from "../../components/Tabs/VerticalTabs";
import Lottie from "react-lottie";
import gif from "../../assets/gif/profile-gif.json";
import { FaCheck } from "react-icons/fa";

const ViewClass = () => {
  const location = useLocation();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: gif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const locationFinder = () => {
    if (location.pathname == "/view/class") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Tabs tabs={viewTabs} />
      <div className="view-parent-container">
        <div className="view-list">
          <VerticalTabs parentName={"class"} />
        </div>
        <div className="default-timetable">
          {locationFinder() ? (
            <>
              <div className="view-side">
                <div className="view-text">
                  <FaCheck className="view-icon" />
                  <p>Click on respective class to view its timetable.</p>
                </div>
                <div>
                  <Lottie options={defaultOptions} height={300} width={500} />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ViewClass;
