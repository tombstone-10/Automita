import { getClasses, getRooms, getTeachers,getCourses,getTimeSlots,getDaysOfWeek } from "../timetableController";

const daysOfWeek = getDaysOfWeek();
const timeSlots = getTimeSlots();
const teachers = getTeachers();
const classes = getClasses();
const courses = getCourses();
const classrooms = getRooms();

function generateRandomTimetable() {
    const timetable = {};
  
    for (const day of daysOfWeek) {
      timetable[day] = {};
      for (const timeSlot of timeSlots) {
        timetable[day][timeSlot] = {
          teacher: teachers[Math.floor(Math.random() * teachers.length)],
          class: classes[Math.floor(Math.random() * classes.length)],
          course: courses[Math.floor(Math.random() * courses.length)]
        };
      }
    }
  
    return timetable;
  }
  export default generateRandomTimetable;