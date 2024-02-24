const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication');

const {register,login,logout,verifyEmail,forgotPassword,resetPassword}=require('../controllers/authController');

router.route('/register').post(register);
router.route('/login').post(login);
// in the logout functionallity we also want to remove the Token along with the logging out, so to remove the token we have to get the user that is logged is i.e. the req.user, which only comes from the authenctication
router.route('/logout').delete(authenticateUser,logout);
router.route('/verify-email').post(verifyEmail);// verify-email has to be post request
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);

module.exports=router;