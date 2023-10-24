import Tabs from "../../components/Tabs";
import { useContext } from "react";
import "./Profile.css";
import bg from "../../assets/images/profile.svg";
import { profileTabs } from "../../data/TabsData";
import UserHeading from "../../components/UserHeading";
import { UserContext } from "../../hooks/LogedUserHook";
import 'react-toastify/dist/ReactToastify.css';

const useUser = () => {
  return useContext(UserContext);
}

const General = () => {
  // const name = "Umar Rasheed";
  // const email = "201271@students.au.edu.pk";
  // const role = "Student";
  // const department = "Creative Technologies";
  // const organization = "Air University";
  const {user} = useUser();
  if(user == null){
    return <h1>You are not authorized.</h1>
  }
  return (
    <>
      <UserHeading />
      <Tabs tabs={profileTabs} />
      <div className="profile-container">
        <form className="profile-form">
          <div className="profile-form-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              disabled
            ></input>
          </div>
          <div className="profile-form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              disabled
            ></input>
          </div>
          <div className="profile-form-row">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={user.role}
              disabled
            ></input>
          </div>
          <div className="profile-form-row">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={user.department}
              disabled
            ></input>
          </div>
          <div className="profile-form-row">
            <label htmlFor="organization">Organization</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={user.organization}
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
