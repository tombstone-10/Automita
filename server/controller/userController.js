const asyncHandler = require('express-async-handler');  //it will handle all the errors asychronously
const bcrypt = require('bcryptjs'); //used to encrypt the password
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET;
// const sessions = {};

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

// @Description    Register new User
// @route          /api/users/
// @method          post
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);    //validate and sanitize user inputs to prevent malicious input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { name, email, password, department, role, organization } = req.body;

    // Checking if there are inputs in all fields
    if (!name || !email || !password || !department || !role || !organization) {
        res.status(400);
        throw new Error('Please add all Fields');
    }

    //checking if the user alread exists or not
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(409).json({ error: 'User already exists' });
    }

    //Encrypting the password if user does not exist
    const salt = await bcrypt.genSalt(10);   //generating salt to encrypt the password
    const hashedPassword = await bcrypt.hash(password, salt);   //password encrypted


    //creating a new User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        department,
        role,
        organization,
    });

    //checking whether the user is created successfully. if yes, then appending the data to database
    if (user) {
        const token = generateToken(user._id);
        return res.status(201).json({
            name: user.name,
            email: user.email,
            department: user.department,
            role: user.role,
            organization: user.organization,
            token,
        });
    } else {
        return res.status(400).json({ error: 'Invalid User Data' });
    }
});


// @Description    Authenticate user Login
// @route          /api/users/login
// @method         post
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //checking if the user has signed up
    const usr = await User.findOne({ email });
    if (usr && (await bcrypt.compare(password, usr.password))) {
        const token = generateToken(usr._id);
        // const userID = usr._id;
        // sessions[token] = {email, userID};
        // res.set('Set-Cookie', `session=${token}`);
        return res.status(200).json({
            name: usr.name,
            email: usr.email,
            department: usr.department,
            role: usr.role,
            organization: usr.organization,
            token
        });
    } else {
        return res.status(401).json({ error: 'Invalid Credentials' });
    }
});


// @Description    GET Logged in User Data
// @route          /api/users/me
// @method         get
// @access Public

const getMe = asyncHandler(async (req, res) => {

    res.status(200).json(req.user)
})

// const getuser = asyncHandler(async (req, res) => {
//     const token = req.headers.cookie.split('=')[1];
//     const userSession = sessions[token];
//     if(!userSession){
//         return res.status(401).json({ error: 'Invalid Session' });
//     }
//     const email = userSession.email;
//     const usr = await User.findOne({ email });
//     if(usr){
//         const token = generateToken(usr._id);
//         return res.status(200).json({
//             name: usr.name,
//             email: usr.email,
//             department: usr.department,
//             role: usr.role,
//             organization: usr.organization,
//             token
//         });
//     }
// });

// @Description    Patch change password of logged user
// @route          /api/users/change/password
// @method         patch
// @access Public
const changePassword = asyncHandler(async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
        return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Generate a new salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(204).end();
});


module.exports = {
    registerUser, loginUser, getMe, changePassword
}