import Tabs from "../../components/Tabs";
import "./Profile.css";
import bg from "../../assets/images/profile.svg";
import axios from "axios";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const General = () => {
  let name = "Umar Rasheed";
  let email = "201271@students.au.edu.pk";
  let role = "Student";
  let department = "Creative Technologies";
  let organization = "Air University";

  const getMe = async () => {
    const url = 'http://localhost:5000/api/users/me';
    try {
      const id = sessionStorage.getItem('userToken');
      if (id) {
        console.log(id);
        const response = await axios.get(url, {
          params: {
            id: id
          }
        });
        console.log(response);
        const data = response.data;
        console.log(data);
        if (data) {
          name, email, role, department = data;
        }
      }
      else {
        toast.error("You are not authorized!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
    catch (err) {
      console.log(err.response.data);
      toast.error("You are not authorized!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  return (
    <>
      <Tabs />
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
      <button onClick={getMe}>Get Request</button>
    </>
  );
};

export default General;
