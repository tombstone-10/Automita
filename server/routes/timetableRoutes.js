const express = require('express');
const router = express.Router();
const {addClass, addTeacher, addCourse, getCourses, getTeachers, getClasses, getClassesFromCourse} = require('../controller/timetableController');
const { protect } = require('../middleware/authMiddleware');
// **---------------**
// **Timetable payload addition and deletion**
// **---------------**
router.route('/course/add').post(protect, addCourse);
router.route('/course/delete').delete();
router.route('/course/get').post(protect, getCourses);
router.route('/course/get_single').post(getClassesFromCourse);
router.route('/class/add').post(protect, addClass);
router.route('/class/delete').delete();
router.route('/class/get').post(protect, getClasses);
router.route('/room/add').post();
router.route('/room/delete').delete();
router.route('/teacher/add').post(protect, addTeacher);
router.route('/teacher/delete').delete();
router.route('/teacher/get').post(protect,getTeachers);



module.exports = router;
