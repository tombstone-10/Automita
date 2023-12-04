import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Generate from "./generate/Generate";
import View from "../pages/View/View";
import General from "./profile/General";
import Security from "./profile/Security";
import About from "./profile/About";
import Profile from "./profile/Profile";
import AddTeacher from "./generate/AddTeacher";
import AddCourse from "./generate/AddCourse";
import AddClass from "./generate/AddClass";
import AddRoom from "./generate/AddRoom";

const Dashboard = () => {
  return (
    <>
      <Router>
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
            <Route path="*" element={<h1>404!</h1>} />
          </Routes>
        </Sidebar>
      </Router>
    </>
  );
};

export default Dashboard;
