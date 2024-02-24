const express = require('express');
const router = express.Router();

const {getAllUsers,getSingleUser,updatePassword,updateUser,deleteUser}=require('../controllers/userController');
const { authenticateUser,authorizePermissions } = require('../middleware/authentication');

// register only if logged out

router.route('/').get([authenticateUser,authorizePermissions('admin')],getAllUsers);
router.route('/update-password').patch(authenticateUser,updatePassword);
router.route('/update-user').patch(authenticateUser,updateUser);
router.route('/:id').get(authenticateUser,getSingleUser).delete(authenticateUser,deleteUser);

module.exports=router;