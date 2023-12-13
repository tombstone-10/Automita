import { useState } from "react";
import { useContext } from "react";
import Select from "react-select";
import "./Add.css";
import { FaPlus } from "react-icons/fa";
import GenerateTable from "../Generate/GenerateTable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TimetableContext } from "../../hooks/timetableDataHook";
const useTimeTables = () => {
  return useContext(TimetableContext);
};
const getClassForCourse = async (id) => {
  const url = "http://localhost:5000/api/timetables/course/get_single";
  try {
    const res = await axios.post(url, { id: id });
    if (res.data) return res.data;
    else return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
const Add = ({ parentName }) => {
  // initially popup is not open
  const [modal, setModal] = useState(false);
  const [isSearchable, setIsSearchable] = useState(false);
  const [programName, setProgramName] = useState("");
  const [session, setSession] = useState("Fall");
  const [semester, setSemester] = useState("1");
  const [section, setSection] = useState("");
  const { classes_addition, course_addition } = useTimeTables();
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [TeacherName, setTeacherName] = useState("");
  const [selectedClassesTeachers, setSelectedClassesTeachers] = useState(null);
  const [selectedCoursesTeachers, setSelectedCoursesTeachers] = useState(null);
  const [prevselectedCoursesTeachers, setprevSelectedCoursesTeachers] =
    useState(null); // to check if the course changes in ADD TEACHERS
  const [rooms, setRooms] = useState(null);
  // function responsible for opening and closing modal
  const toggleModal = () => {
    setModal(!modal);
  };
  const [assignClassesForTeachers, setassignClassesForTeachers] = useState([]);
  if (selectedCoursesTeachers !== prevselectedCoursesTeachers) {
    let somefunction = async () => {
      try {
        const response = await getClassForCourse(selectedCoursesTeachers.id);
        if (response) {
          setassignClassesForTeachers(
            response.map((singleClass) => ({
              id: singleClass._id,
              value: `${singleClass.program_name}-${singleClass.session}-${singleClass.semester}-${singleClass.section}`,
              label: `${singleClass.program_name}-${singleClass.session}-${singleClass.semester}-${singleClass.section}`,
            }))
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    somefunction();

    setprevSelectedCoursesTeachers(selectedCoursesTeachers);
  }
  // options for multi select dropdown
  const assignClasses = classes_addition.map((clas) => ({
    id: clas._id,
    value: `${clas.program_name}-${clas.session}-${clas.semester}-${clas.section}`,
    label: `${clas.program_name}-${clas.session}-${clas.semester}-${clas.section}`,
  }));

  // options for multi select dropdown
  const assignCourses = course_addition.map((course) => ({
    id: course._id,
    value: `${course.code}`,
    label: `${course.code}`,
  }));

  const handleProgramNameChange = (event) => {
    setProgramName(event.target.value);
  };
  const handleSessionChange = (event) => {
    setSession(event.target.value);
  };
  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };
  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };
  const handleClassAddition = async (e) => {
    e.preventDefault();
    toggleModal();
    const url = "http://localhost:5000/api/timetables/class/add";
    const token = sessionStorage.getItem("userToken");
    if (token) {
      let id = JSON.parse(token);
      try {
        const res = await axios.post(url, {
          id: id,
          program_name: programName,
          session: session.toUpperCase(),
          semester: semester,
          section: section.toUpperCase(),
        });
        if (res.data) {
          toast.success("Class Added Successfully");
          setProgramName("");
          setSection("");
          setSemester("1");
          setSession("Fall");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          toast.error("Class Added Error");
        }
      } catch (err) {
        toast.error("Class Added Error");
        console.log(err);
      }
    } else {
      return null;
    }
  };
  const handleCourseCodeChange = (event) => {
    setCourseCode(event.target.value);
  };
  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };
  const handleCreditHoursChnage = (event) => {
    setCreditHours(event.target.value);
  };
  const handleClassesSelectChange = (selectedOptions) => {
    setSelectedClasses(selectedOptions);
  };
  const handleClassesSelectChangeForTeachers = (selectedOptions) => {
    setSelectedClassesTeachers(selectedOptions);
  };
  const handleCourseAddition = async (e) => {
    e.preventDefault();
    toggleModal();
    const url = "http://localhost:5000/api/timetables/course/add";
    const token = sessionStorage.getItem("userToken");
    if (token) {
      let id = JSON.parse(token);
      try {
        const classIDs = selectedClasses.map(
          (selectedClass) => selectedClass.id
        );
        const res = await axios.post(url, {
          id: id,
          code: courseCode,
          name: courseName,
          credit_hours: creditHours,
          class_assigned: classIDs,
        });
        if (res.data) {
          toast.success("Course Added Successfully");
          setCourseCode("");
          setCourseName("");
          setCreditHours("");
          setSelectedClasses([]);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          toast.error("Course Added Error");
        }
      } catch (err) {
        toast.error("Course Added Error");
        console.log(err);
      }
    } else {
      return null;
    }
  };
  const handleCoursesSelectChangeForTeachers = (selectedOptions) => {
    setSelectedCoursesTeachers(selectedOptions);
  };
  const handleTeacherNameChange = (e) => {
    setTeacherName(e.target.value);
  };
  const hanldeTeacherAddition = async (e) => {
    e.preventDefault();
    toggleModal();
    if (
      TeacherName != null &&
      TeacherName != "" &&
      selectedClassesTeachers != null &&
      selectedClassesTeachers != [] &&
      selectedCoursesTeachers !== null
    ) {
      const url = "http://localhost:5000/api/timetables/teacher/add";
      const token = sessionStorage.getItem("userToken");
      if (token) {
        let id = JSON.parse(token);
        try {
          const classIDs = selectedClassesTeachers.map(
            (selectedClass) => selectedClass.id
          );
          const res = await axios.post(url, {
            id: id,
            name: TeacherName,
            course_assigned: selectedCoursesTeachers.id,
            class_assigned: classIDs,
          });
          if (res.data) {
            toast.success("Teacher Added Successfully");
            setTeacherName("");
            setSelectedCoursesTeachers([]);
            setSelectedClassesTeachers([]);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            toast.error("Course Added Error");
          }
        } catch (err) {
          toast.error("Course Added Error");
          console.log(err);
        }
      } else {
        return null;
      }
    } else {
      toast.error("ADD ALL FIELDS!!");
    }
  };
  const handleRoomsChange = (e) => {
    setRooms(e.target.value);
  };
  const handleRoomsAddition = async (e) => {
    e.preventDefault();
    toggleModal();
    if (rooms != null) {
      const url = "http://localhost:5000/api/timetables/room/add";
      const token = sessionStorage.getItem("userToken");
      if (token) {
        let id = JSON.parse(token);
        try {
          const res = await axios.post(url, { id: id, rooms: rooms });
          if (res.data) {
            toast.success("Room Added Successfully");
            setRooms(null);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            toast.error("Room Added Error");
          }
        } catch (err) {
          toast.error("Room Added Error");
          console.log(err);
        }
      } else {
        return null;
      }
    } else {
      toast.error("ADD ALL FIELDS!!");
    }
  };

  return (
    <>
      <div className="add-container" onClick={toggleModal}>
        <div className="add-btn">
          <div className="add-btn-icon">
            <FaPlus />
          </div>
        </div>
      </div>

      <GenerateTable parentName={parentName} />

      {/* will only render for add program page */}
      {modal && parentName == "addClass" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form" onSubmit={handleClassAddition}>
              <div className="add-form-row">
                <label htmlFor="programName">Program Name</label>
                <input
                  type="text"
                  name="programName"
                  value={programName}
                  onChange={handleProgramNameChange}
                  required
                  placeholder="BSSE"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="sessionName">Choose Session</label>
                <select
                  name="sessionName"
                  value={session}
                  onChange={handleSessionChange}
                  required
                >
                  <option value="fall">Fall</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                </select>
              </div>
              <div className="add-form-row">
                <label htmlFor="semesterName">Choose Semester</label>
                <select
                  name="sessionName"
                  value={semester}
                  onChange={handleSemesterChange}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div className="add-form-row">
                <label>Section</label>
                <input
                  type="text"
                  value={section}
                  onChange={handleSectionChange}
                  placeholder="A"
                />
              </div>
              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* will only render for add course page */}
      {modal && parentName == "addCourse" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form" onSubmit={handleCourseAddition}>
              <div className="add-form-row">
                <label htmlFor="courseCode">Course Code</label>
                <input
                  type="text"
                  placeholder="Enter course code"
                  name="courseCode"
                  value={courseCode}
                  onChange={handleCourseCodeChange}
                  id="courseCode"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="courseName">Course Name</label>
                <input
                  type="text"
                  placeholder="Enter course name"
                  name="courseName"
                  value={courseName}
                  onChange={handleCourseNameChange}
                  id="courseName"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="creditHours">Credit Hours</label>
                <input
                  type="number"
                  placeholder="Enter credit hours"
                  name="creditHours"
                  value={creditHours}
                  onChange={handleCreditHoursChnage}
                  id="creditHours"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="assignToProgram">Assign to Class(es)</label>
                <Select
                  className="multi-select-dropdown"
                  options={assignClasses}
                  isMulti
                  isSearchable={isSearchable}
                  value={selectedClasses}
                  onChange={handleClassesSelectChange}
                />
              </div>
              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* will only render for add teacher page */}
      {modal && parentName == "addTeacher" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form" onSubmit={hanldeTeacherAddition}>
              <div className="add-form-row">
                <label htmlFor="teacherName">Teacher Name</label>
                <input
                  type="text"
                  placeholder="Enter teacher name"
                  value={TeacherName}
                  name="teacherName"
                  id="teacherName"
                  onChange={handleTeacherNameChange}
                />
              </div>

              <div className="add-form-row">
                <label htmlFor="assignToCourse">Assign to Course(s)</label>
                <Select
                  className="multi-select-dropdown"
                  options={assignCourses}
                  isSearchable={isSearchable}
                  value={selectedCoursesTeachers}
                  onChange={handleCoursesSelectChangeForTeachers}
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="assignToClass">Assign to Class(es)</label>
                <Select
                  className="multi-select-dropdown"
                  options={assignClassesForTeachers}
                  isMulti
                  isSearchable={isSearchable}
                  value={selectedClassesTeachers}
                  onChange={handleClassesSelectChangeForTeachers}
                />
              </div>
              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* will only render for add room page */}
      {modal && parentName == "addRoom" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form" onSubmit={handleRoomsAddition}>
              <div className="add-form-row">
                <label htmlFor="roomName">Room Name</label>
                <input
                  type="text"
                  placeholder="Enter room name"
                  name="roomName"
                  id="roomName"
                  value={rooms}
                  onChange={handleRoomsChange}
                />
              </div>
              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* will only render for add program page */}
      {modal && parentName == "timeSlot" && (
        <div className="add-form-container">
          <div className="main-form">
            <form className="add-form">
              <div className="add-form-row">
                <label htmlFor="availableHours">Available Hours Per Day</label>
                <input
                  name="availableHours"
                  type="number"
                  min={1}
                  max={12}
                  placeholder="Enter from 1 to 12"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="startTime">Day Start Time</label>
                <input
                  name="startTime"
                  type="number"
                  placeholder="Enter Starting Time"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="endTime">Day End Time</label>
                <input
                  name="endTime"
                  type="number"
                  placeholder="Enter Ending Time"
                />
              </div>
              <div className="add-form-row">
                <label htmlFor="classDuration">Enter Class Duration</label>
                <input
                  name="classDuration"
                  type="number"
                  placeholder="Minutes for each class"
                />
              </div>

              <div className="add-form-row">
                <button onClick={toggleModal}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Add;
