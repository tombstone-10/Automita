const express = require('express');
const router = express.Router();
const {addClass, addTeacher, addCourse, getCourses, getTeachers, getClasses, getClassesFromCourse,addrooms, getRooms, deleteCourse, 
    deleteClass, deleteRoom, deleteTeacher, generateTimetable, getTimetable
    , getAllTeachers, getAllClasses, getAllCourses, getAllRooms, TeacherTimetableByNames, ClassTimetableByNames, RoomTimetableByNames } = require('../controller/timetableController');
const { protect } = require('../middleware/authMiddleware');

// **---------------**
// **Timetable payload addition and deletion**
// **---------------**
router.route('/course/add').post(protect, addCourse);
router.route('/course/delete').delete(deleteCourse);
router.route('/course/get').post(protect, getCourses);
router.route('/course/get_single').post(getClassesFromCourse);
router.route('/class/add').post(protect, addClass);
router.route('/class/delete').delete(deleteClass);
router.route('/class/get').post(protect, getClasses);
router.route('/room/add').post(protect, addrooms);
router.route('/room/delete').delete(deleteRoom);
router.route('/room/get').post(protect, getRooms);
router.route('/teacher/add').post(protect, addTeacher);
router.route('/teacher/delete').delete(deleteTeacher);
router.route('/teacher/get').post(protect,getTeachers);
router.route('/generate/:email').get( generateTimetable);
router.route('/:email').get(getTimetable);
router.route('/teachers-get/:email').get(getAllTeachers);
router.route('/classes-get/:email').get(getAllClasses);
router.route('/courses-get/:email').get(getAllCourses);
router.route('/rooms-get/:email').get(getAllRooms);
router.route('/timetable-get/teachers/:email/:name').get(TeacherTimetableByNames);
router.route('/timetable-get/classes/:email/:name').get(ClassTimetableByNames);
router.route('/timetable-get/rooms/:email/:name').get(RoomTimetableByNames);




module.exports = router;
