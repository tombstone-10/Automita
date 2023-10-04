import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Profile from "../pages/Profile";
import Generate from "../pages/Generate";
import View from "../pages/View";

const Dashboard = () => {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/" index element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Sidebar>
    </Router>
  );
};

export default Dashboard;
