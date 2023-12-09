const express = require('express');
const router = express.Router();
const {addClass, addTeacher, addCourse, getCourses, getTeachers, getClasses, getClassesFromCourse,addrooms, getRooms, deleteCourse, deleteClass, deleteRoom, deleteTeacher} = require('../controller/timetableController');
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



module.exports = router;
