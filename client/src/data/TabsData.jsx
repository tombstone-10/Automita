import {
  FaLaptop,
  FaShieldAlt,
  FaInfoCircle,
  FaGraduationCap,
  FaBook,
  FaChalkboardTeacher,
  FaSchool,
} from "react-icons/fa";

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
    path: "/generate/addPrograms",
    name: "Add Programs",
    icon: <FaGraduationCap />,
  },
  {
    path: "/profile/security",
    name: "Add Courses",
    icon: <FaBook />,
  },
  {
    path: "/profile/about",
    name: "Add Teachers",
    icon: <FaChalkboardTeacher />,
  },
  {
    path: "/profile/about",
    name: "Add Rooms",
    icon: <FaSchool />,
  },
];
