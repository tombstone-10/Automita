const asyncHandler = require('express-async-handler');  //it will handle all the errors asychronously
const Class = require('../models/classModel');
const Course = require('../models/courseModel');
const Room = require('../models/roomModel');
const Teacher = require('../models/teacherModel');
const { validationResult } = require('express-validator');


// @Description    Add new class
// @route          /api/timetables/class/add
// @method          post
// @access Public

const addClass = asyncHandler(async (req, res) => {
    const errors = validationResult(req);    //validate and sanitize user inputs to prevent malicious input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, program_name, session, semester, section } = req.body;

    // Checking if there are inputs in all fields
    if (!program_name || !session || !semester || !section) {
        res.status(400);
        throw new Error('Please add all Fields');
    }

    //checking if the user alread exists or not
    const classExists = await Class.findOne({
        program_name: { $regex: new RegExp(`^${program_name}$`, 'i') },
        session: { $regex: new RegExp(`^${session}$`, 'i') },
        semester: parseInt(semester),  // Convert semester to a number
        section: { $regex: new RegExp(`^${section}$`, 'i') }
    });
    
    
    if (classExists) {
        return res.status(409).json({ error: 'Class already exists' });
    }

try{
    //creating a new User
    const newclass = await Class.create({
        email,
        program_name,
        session,
        semester,
        section,
    });

    //checking whether the user is created successfully. if yes, then appending the data to database
    if (newclass) {
        return res.status(201).json({
            email: newclass.email,
            program_name: newclass.program_name,
            session: newclass.session,
            semester: newclass.semester,
            section: newclass.section,
        });
    } else {
        return res.status(400).json({ error: 'Invalid Class Data' });
    }
}
catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
}
});
const addCourse = asyncHandler(async (req, res) => {
    const errors = validationResult(req);    //validate and sanitize user inputs to prevent malicious input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, code, name, credit_hours, class_assigned } = req.body;

    // Checking if there are inputs in all fields
    if (!code || !name || !class_assigned || credit_hours == null) {
        return res.status(400).json({ error: 'Please add all fields' });
    }

    //checking if the user alread exists or not
    const courseExists = await Course.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        code: { $regex: new RegExp(`^${code}$`, 'i') },
        credit_hours: parseInt(credit_hours), 
    });
    
    
    if (courseExists) {
        return res.status(409).json({ error: 'Course already exists' });
    }

    try{
    //creating a new Course
    const newCourse = await Course.create({
        email,
        code,
        name,
        credit_hours,
        class_assigned,
    });

    //checking whether the Course is created successfully. if yes, then appending the data to database
    if (newCourse) {
        return res.status(201).json({
            email: newCourse.email,
            code: newCourse.code,
            name: newCourse.name,
            credit_hours: newCourse.credit_hours,
            class_assigned: newCourse.class_assigned,
        });
    } else {
        return res.status(400).json({ error: 'Invalid Course Data' });
    }
}
catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
}
});
const addTeacher = asyncHandler(async (req, res) => {
    const errors = validationResult(req);    //validate and sanitize user inputs to prevent malicious input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email,id,name, course_assigned, class_assigned} = req.body;

    // Checking if there are inputs in all fields
    if (!id || !name || course_assigned == null || class_assigned==null) {
        res.status(400);
        throw new Error('Please add all Fields');
    }

try{
    //creating a new Teacher    
    const newTeacher = await Teacher.create({
        _id:id,
        email,
        name,
        course_assigned,
        class_assigned,
    });

    //checking whether the Teacher is created successfully. if yes, then appending the data to database
    if (newTeacher) {
        return res.status(201).json(newTeacher);
    } else {
        return res.status(400).json({ error: 'Invalid Teacher Data' });
    }
}
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });}
});

const getCourses = asyncHandler(async (req, res) => {
        const {email}  = req.body;
        const coursess = await Course.find({ email: email }).select('-email');  //email will be excluded from the results
        res.status(200).json(coursess);
        
});
const getClasses = asyncHandler(async (req, res) => {
    const {email}  = req.body;
    const classess = await Class.find({ email: email},{email:false});  //email will be excluded from the results
    res.status(200).json(classess);
    
});
const getTeachers = asyncHandler(async (req, res) => {
    const {email}  = req.body;
    const teacherss = await Teacher.find({ email: email},{email:false});  //email will be excluded from the results
    res.status(200).json(teacherss);
    
})

module.exports = {
    addClass,addCourse,addTeacher,getCourses,getClasses,getTeachers
}