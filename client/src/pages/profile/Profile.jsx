import Tabs from "../../components/Tabs";
import "./Profile.css";
import { profileTabs } from "../../data/TabsData";
import { profilePage } from "../../data/PageData";
import UserHeading from "../../components/UserHeading";
import DefaultPage from "../../components/DefaultPage";

const Profile = () => {
  return (
    <>
      <UserHeading />
      <Tabs tabs={profileTabs} />
      <DefaultPage currentPage={profilePage} />
    </>
  );
};

export default Profile;
