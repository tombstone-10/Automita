//how teachers data will be stored in the database
const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the schema for a single timetable entry
const timetableEntrySchema = new Schema({
    name: { type: String, required: true },
    course_assigned: { type: String, required: true },
    class_assigned: { type: String, required: true },
    day: { type: String, required: true },
    timeSlot: { type: String, required: true },
    room: { type: String, required: true }
});


// Define the schema for the optimal timetable response
const optimalTimetableSchema = new Schema({
    email: { type: String, required: true },
    timetable: [timetableEntrySchema] // An array of timetable entries
});

// Create the model for the optimal timetable
const Timetable = mongoose.model('Timetable', optimalTimetableSchema);

module.exports = Timetable;