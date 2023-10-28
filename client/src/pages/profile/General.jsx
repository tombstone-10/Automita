import Tabs from "../../components/Tabs";
import "./Profile.css";
import bg from "../../assets/images/profile.svg";
import { profileTabs } from "../../data/TabsData";
import UserHeading from "../../components/UserHeading";

const General = () => {
  const name = "Ali Ahmed";
  const email = "201265@students.au.edu.pk";
  const role = "Student";
  const department = "Creative Technologies";
  const organization = "Air University";

  return (
    <>
      <UserHeading />
      <Tabs tabs={profileTabs} parentName={"profile"} />
      <div className="profile-container">
        <form className="profile-form">
          <div className="profile-form-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              disabled
            ></input>
          </div>
          <div className="profile-form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              disabled
            ></input>
          </div>
          <div className="profile-form-row">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={role}
              disabled
            ></input>
          </div>
          <div className="profile-form-row">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={department}
              disabled
            ></input>
          </div>
          <div className="profile-form-row">
            <label htmlFor="organization">Organization</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={organization}
              disabled
            ></input>
          </div>
        </form>
        <div className="bg-container">
          <img src={bg}></img>
        </div>
      </div>
    </>
  );
};

export default General;
