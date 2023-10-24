import Tabs from "../../components/Tabs";
import UserHeading from "../../components/UserHeading";
import { profileTabs } from "../../data/TabsData";

const About = () => {
  return (
    <>
      <UserHeading />
      <Tabs tabs={profileTabs} />
      <h2>About Page</h2>
    </>
  );
};

export default About;
