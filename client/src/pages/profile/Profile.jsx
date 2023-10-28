import Tabs from "../../components/Tabs";
import "./Profile.css";
import gif from "../../assets/gif/profile-gif.json";
import { profileTabs } from "../../data/TabsData";
import { profilePage } from "../../data/PageData";
import UserHeading from "../../components/UserHeading";
import DefaultPage from "../../components/DefaultPage";

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
      <Tabs tabs={profileTabs} parentName={"profile"} />
      <DefaultPage currentPage={profilePage} />
    </>
  );
};

export default Profile;
