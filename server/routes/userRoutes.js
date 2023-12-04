const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getMe, changePassword} = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');


router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').post(protect,getMe); //for client side (sessions) token authentication
router.route('/change/password').patch(changePassword);
// router.route('/getuser').get(getuser);

module.exports = router;
