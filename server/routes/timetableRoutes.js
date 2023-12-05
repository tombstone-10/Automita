const express = require('express');
const router = express.Router();
const {addClass, addTeacher, addCourse, getCourses, getTeachers, getClasses} = require('../controller/timetableController');

// **---------------**
// **Timetable payload addition and deletion**
// **---------------**
router.route('/course/add').post(addCourse);
router.route('/course/delete').delete();
router.route('/course/get').get(getCourses);
router.route('/class/add').post(addClass);
router.route('/class/delete').delete();
router.route('/class/get').get(getClasses);
router.route('/room/add').post();
router.route('/room/delete').delete();
router.route('/teacher/add').post(addTeacher);
router.route('/teacher/delete').delete();
router.route('/teacher/get').get(getTeachers);



module.exports = router;
