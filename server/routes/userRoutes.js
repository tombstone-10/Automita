const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getMe, changePassword} = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');


router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect,getMe);
router.route('/change/password').patch(changePassword);

module.exports = router;
