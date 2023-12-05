//how classes data will be stored in the database
const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    class:{
        type: mongoose.Schema.Types.ObjectId,   //for unique class ID
        ref: 'Class',
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
    },
    program_name:{
        type: String,
        required: [true, 'Please add a program name'],
    },
    
    session:{
        type: String,
        required: [true, 'Please add a session (Fall / Spring / Summer)'],
    },
    semester: {
        type: Number,
        required: [true, 'Please add a semester'],
    },
    section: {
        type: String,
        required: [true, 'Please add your Section'],
    }
},
{
    timestamps: true,  // mongoose will add "create at date & time" automatically
}
);


module.exports = mongoose.model('Class', classSchema);