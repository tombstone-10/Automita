import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Generate from "./generate/Generate";
import View from "../pages/view/View";
import General from "./profile/General";
import Security from "./profile/Security";
import About from "./profile/About";
import Profile from "./profile/Profile";
import { useContext } from "react";
import { UserContext } from "../hooks/LoggedUserHook";
import Logout from "../components/Logout";
import AddTeacher from "./generate/AddTeacher";
import AddCourse from "./generate/AddCourse";
import AddClass from "./generate/AddClass";
import AddRoom from "./generate/AddRoom";
import TimeSlot from "./generate/TimeSlot";
import ViewClass from "./view/ViewClass";
import ViewTeacher from "./view/ViewTeacher";
import ViewRoom from "./view/ViewRoom";

const useUser = () => {
  return useContext(UserContext);
};
const Dashboard = () => {
  const { user } = useUser();
  if (user == null) {
    return <h1>You are not Authorized.</h1>;
  }

  return (
    <>
      <Sidebar>
        <Routes>
          <Route index path="/profile" element={<Profile />} />
          <Route path="/profile/general" element={<General />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/view" element={<View />} />
          <Route path="/profile/security" element={<Security />} />
          <Route path="/profile/about" element={<About />} />
          <Route path="/generate/addClass" element={<AddClass />} />
          <Route path="/generate/addCourses" element={<AddCourse />} />
          <Route path="/generate/addTeachers" element={<AddTeacher />} />
          <Route path="/generate/addRooms" element={<AddRoom />} />
          <Route path="/generate/timeSlots" element={<TimeSlot />} />
          <Route path="/view/class" element={<ViewClass />} />
          <Route path="/view/teacher" element={<ViewTeacher />} />
          <Route path="/view/room" element={<ViewRoom />} />
          <Route path="/view/class/:id" element={<ViewClass />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<h1>404!</h1>} />
        </Routes>
      </Sidebar>
    </>
  );
};

export default Dashboard;
