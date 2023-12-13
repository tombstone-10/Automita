import {
  FaLaptop,
  FaShieldAlt,
  FaInfoCircle,
  FaGraduationCap,
  FaBook,
  FaChalkboardTeacher,
  FaSchool,
  FaClock,
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
    path: "/generate/addClass",
    name: "Add Classes",
    icon: <FaGraduationCap />,
  },
  {
    path: "/generate/addCourses",
    name: "Add Courses",
    icon: <FaBook />,
  },
  {
    path: "/generate/addTeachers",
    name: "Add Teachers",
    icon: <FaChalkboardTeacher />,
  },
  {
    path: "/generate/addRooms",
    name: "Add Rooms",
    icon: <FaSchool />,
  },
  {
    path: "/generate/timeSlots",
    name: "Time Slots",
    icon: <FaClock />,
  },
];

export const viewTabs = [
  {
    path: "/view/class",
    name: "View Classes Timetable",
    icon: <FaGraduationCap />,
  },
  {
    path: "/view/teacher",
    name: "View Teachers Timetable",
    icon: <FaChalkboardTeacher />,
  },
  {
    path: "/view/room",
    name: "View Rooms Timetable",
    icon: <FaSchool />,
  },
];
