import {  Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Generate from "../pages/Generate";
import View from "../pages/View";
import General from "./profile/General";
import Security from "./profile/Security";
import About from "./profile/About";

const Dashboard = () => {

  return (
    <>
        <Sidebar>
          <Routes>
            <Route path="/profile" index  element={<General />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/view" element={<View />} />
            <Route path="/profile/security" element={<Security />} />
            <Route path="/profile/about" element={<About />} />
            <Route path="*" element={<h1>404!</h1>} />
          </Routes>
        </Sidebar>
    </>
  );
};

export default Dashboard;
