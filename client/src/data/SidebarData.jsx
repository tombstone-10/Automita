import {
  FaUserAlt,
  FaPlus,
  FaCalendar,
  FaBars,
  FaPowerOff,
  FaChevronLeft,
} from "react-icons/fa";

export const sidebarNav = [
  {
    id: 1,
    path: "/profile",
    name: "Profile",
    icon: <FaUserAlt />,
  },
  {
    id: 2,
    path: "/generate",
    name: "Generate",
    icon: <FaPlus />,
  },
  {
    id: 3,
    path: "/view",
    name: "View",
    icon: <FaCalendar />,
  },
  {
    id: 4,
    path: "/logout",
    name: "Logout",
    icon: <FaPowerOff />,
  },
];
