const User = require('../models/User');
const{StatusCodes}=require('http-status-codes');
const { checkPermissions } = require('../utils');
const CustomError = require('../errors');

const getAllUsers = async(req,res)=>{
    const users= await User.find({role:'user'}).select('-password');
    res.status(StatusCodes.OK).json({users,count:users.length});
}

const getSingleUser = async(req,res)=>{
    const {id :userId} = req.params;
    const user = await User.findOne({_id:userId});
    if(!user){
        throw new CustomError.notFoundError('User not found');
    }
    
    checkPermissions(req.user,user._id);
    return res.status(StatusCodes.OK).json({user});
}

const updateUser = async(req, res) => {
    const {name, email, address, phone} = req.body;
    if(!name && !email && !address && !phone) {
        throw new CustomError.BadRequestError('Please provide the data you want to update');
    }
    const user = await User.findOne({_id: req.user.userId});
    ['name', 'email', 'address', 'phone'].forEach(property => {
        if(req.body[property] !== undefined) {
            user[property] = req.body[property];
        }
    })
    //So, in your case, req.body[property] is the correct syntax because property is a variable holding the name of the property you want to access. Using req.body.property would look for a property named "property" in req.body, which is not what you intend.
    await user.save();
    res.status(StatusCodes.OK).json({user});
};

const deleteUser = async(req,res)=>{
    const{id:userId}=req.params;
    res.cookie('accessToken','delete',{
        expiresIn: new Date(Date.now()),
        httpOnly:true,
    });

    res.cookie('refreshToken','delete',{
        expiresIn: new Date(Date.now()),
        httpOnly:true,
    })
    await User.findOneAndDelete({_id:userId});
    res.status(StatusCodes.OK).json({msg:"User deleted successfully"});
}

const updatePassword = async(req,res)=>{
    const {oldPassword,newPassword} = req.body;
    const {userId}=req.user;

    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('Please provide old and new Password');
    }

    const user = await User.findOne({_id:userId});
    
    if(!user.comparePassword(oldPassword)){
        throw new CustomError.BadRequestError('Wrong password entered');
    }
    
    user.password=newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({msg:"Password successfully modified"});
}

module.exports={getAllUsers,getSingleUser,updatePassword,updateUser,deleteUser};