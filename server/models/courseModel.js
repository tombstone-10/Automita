    //how courses data will be stored in the database
    const mongoose = require('mongoose');

    const courseSchema = mongoose.Schema({
        course:{
            type: mongoose.Schema.Types.ObjectId,   //for unique course ID
            ref: 'Course',
        },
        email:{
            type: String,
            required: [true, 'Please add an email'], 
        },
        code:{
            type: String,
            required: [true, 'Please add a Course code'],
        },
        
        name:{
            type: String,
            required: [true, 'Please add a Course Name'],
        },
        credit_hours: {
            type: Number,
            required: [true, 'Please add course(s) credit hours'],
        },
        class_assigned: [{
            type: mongoose.Schema.Types.ObjectId, // Reference to classModel
            ref: 'Class', 
            required: [true, 'Please add a reference to a class'],
        }], 
    },
    {
        timestamps: true,  // mongoose will add "create at date & time" automatically
    }
    );


    module.exports = mongoose.model('Course', courseSchema);