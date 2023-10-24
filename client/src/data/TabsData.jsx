import { FaLaptop, FaShieldAlt, FaInfoCircle } from "react-icons/fa";

export const profileTabs = [
  {
    path: "/profile/general",
    name: "General",
    icon: <FaLaptop />,
  },
  {
    path: "/profile/security",
    name: "Security",
    icon: <FaShieldAlt />,
  },
  {
    path: "/profile/about",
    name: "About",
    icon: <FaInfoCircle />,
  },
];

export const generateTabs = [
  {
    path: "/profile/general",
    name: "Assign",
    icon: <FaLaptop />,
  },
  {
    path: "/profile/security",
    name: "Add Teacher",
    icon: <FaShieldAlt />,
  },
  {
    path: "/profile/about",
    name: "Add Course",
    icon: <FaInfoCircle />,
  },
];
