const asyncHandler = require('express-async-handler');  //it will handle all the errors asychronously
const bcrypt = require('bcryptjs'); //used to encrypt the password
const User = require('../models/userModel');



// @Description    Register new User
// @route          /api/users
// @method          post
// @access Public

const registerUser = asyncHandler(async(req, res) => {
    const {name,email,password,department,role} = req.body;

    // Checking if there are inputs in all fields
    if(!name || !email || !password || !department || !role){
        res.send(400);
        throw new Error('Please add all Fields');
    }

    //checking if the user alread exists or not
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    //Encrypting the password if user does not exist
    const salt = await bcrypt.genSalt(10);   //generating salt to encrypt the password
    const hashedPassword = await bcrypt.hash(password,salt);   //password encrypted


    //creating a new User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        department,
        role,
    });

    //checking whether the user is created successfully. if yes, then appending the data to database
    if(user){
        res.status(201);
        
        //showing the data as a response
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            department: user.department,
            role: user.role,
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid User Data");
    } 
});


// @Description    Authenticate user Login
// @route          /api/users/login
// @method         post
// @access Public

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    //checking if the user has signed up
    const usr = await User.findOne({email});
    if(usr){

        if( await bcrypt.compare(password,usr.password)){
            res.status(201);
            res.json({
                _id : usr._id,
                name: usr.name,
                email: usr.email,
                department: usr.department,
                role: usr.role,
            })
        }
        else {
            res.status(400);
            throw new Error ('Invalid Credentials');
        }
    }
    else {
        res.status(400);
        throw new Error ('Invalid Credentials');
    }
});


// @Description    GET Logged in User Data
// @route          /api/users/me
// @method         get
// @access Public

const getMe = asyncHandler(async (req, res) => {

    const {_id,name,email,department,role} = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name: name,
        email: email,
        department: department,
        role: role,
    })

});

module.exports = {
    registerUser, loginUser, getMe,
}