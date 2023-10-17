import Tabs from "../../components/Tabs";
import Lottie from "react-lottie";
import "./Profile.css";
import gif from "../../assets/gif/profile-gif.json";
import { FaCheck } from "react-icons/fa";
import { profileTabs } from "../TabsData";
import UserHeading from "../../components/UserHeading";

const Profile = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: gif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <UserHeading />
      <Tabs tabs={profileTabs} />
      <div className="profile-container">
        <div className="profile-sub-container">
          <div className="profile-form">
            <h2 className="profile-heading">Let's get started!</h2>
            <div className="profile-intro-row">
              <div className="profile-box">
                <div className="profile-box-icon">
                  <FaCheck />
                </div>
                <p>Add courses, teachers, programs.</p>
              </div>
            </div>
            <div className="profile-intro-row">
              <div className="profile-box">
                <div className="profile-box-icon">
                  <FaCheck />
                </div>
                <p>Assign the courses, teachers to programs.</p>
              </div>
            </div>
            <div className="profile-intro-row">
              <div className="profile-box">
                <div className="profile-box-icon">
                  <FaCheck />
                </div>
                <p>Simply generate timetable.</p>
              </div>
            </div>
            <div className="profile-intro-row">
              <div className="profile-box">
                <div className="profile-box-icon">
                  <FaCheck />
                </div>
                <p>
                  View the timetable with respect to programs, classrooms,
                  teachers.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-container">
            <Lottie options={defaultOptions} height={300} width={600} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
