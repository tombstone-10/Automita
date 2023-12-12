import Tabs from "../../components/Tabs/Tabs";
import "./Profile.css";
import gif from "../../assets/gif/profile-gif.json";
import { profileTabs } from "../../data/TabsData";
import { profilePage } from "../../data/PageData";
import UserHeading from "../../components/UserHeading";
import DefaultPage from "../../components/DefaultPage/DefaultPage";

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
      <DefaultPage currentPage={profilePage} />
    </>
  );
};

export default Profile;
