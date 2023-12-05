//how teachers data will be stored in the database
const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    teacher:{
        type: mongoose.Schema.Types.ObjectId,   //for unique course ID
        ref: 'Teacher',
    },
    email:{
        type: String,
        required: [true, 'Please add an email'], 
    },
    name:{
        type: String,
        required: [true, 'Please add a Course Name'],
    },
    course_assigned: [{
        type: mongoose.Schema.Types.ObjectId, // Reference to courseModel
        ref: 'Course', // Specify the referenced model
        required: [true, 'Please add a reference to a course'],
    }], 
    class_assigned: [{
        type: mongoose.Schema.Types.ObjectId, // Reference to classModel
        ref: 'Class', // Specify the referenced model
        required: [true, 'Please add a reference to a class'],
    }], 
},
{
    timestamps: true,  // mongoose will add "create at date & time" automatically
}
);


module.exports = mongoose.model('Course', userSchema);