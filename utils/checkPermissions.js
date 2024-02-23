const CustomError =require('../errors');

// if the user is not admin and is trying to access the id other than its own, then error is to be thrown
//requestUser is the (req.user) of the current user, and resourceUserId is the id the current user is going to get
const checkPermissions =(requestUser,resourceUserId)=>{
    // as  resourceUserId is of the mongoose Object data type therefore we have to convert it toString()
    if(requestUser.role==='admin') return;
    if(requestUser.userId === resourceUserId.toString()) return;
    throw new CustomError.UnauthorizedError('Not authorized to access this route');
}

module.exports=checkPermissions;