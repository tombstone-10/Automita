//how teachers data will be stored in the database
const mongoose = require('mongoose');

const roomsSchema = mongoose.Schema({
    room:{
        type: mongoose.Schema.Types.ObjectId,   //for unique course ID
        ref: 'Rooms',
    },
    email:{
        type: String,
        required: [true, 'Please add an email'], 
    },
    rooms:{
        type: String,
        required: [true, 'Please add a Course Name'],
    },
    
},
{
    timestamps: true,  // mongoose will add "create at date & time" automatically
}
);


module.exports = mongoose.model('Rooms', roomsSchema);