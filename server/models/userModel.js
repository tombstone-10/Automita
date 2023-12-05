//how Users data will be stored in the database
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,   //for unique user ID
        ref: 'User',
    },
    name:{
        type: String,
        required: [true, 'Please add a name'],
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        uniqure: true,  
    },
    password:{
        type: String,
        required: [true, 'Please add a Password'],
    },
    department: {
        type: String,
        required: [true, 'Please add a Department'],
    },
    role: {
        type: String,
        required: [true, 'Please add your Role'],
    },
    organization: {
        type: String,
        required: [true, 'Please add your Organization'],
    }
},
{
    timestamps: true,  // mongoose will add "create at date & time" automatically
}
);


module.exports = mongoose.model('User', userSchema);