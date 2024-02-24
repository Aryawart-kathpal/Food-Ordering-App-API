const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt=require('bcryptjs');

const phoneValidator = function(value) {
    return value.length === 10 && !isNaN(value);
};

// name,email,address,phone,password,cart,order,role
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 30,
    },
    email:{
        type:String,
        required:[true,'Plese provide email'],
        validate:{
            validator:validator.isEmail,
            message:"Please provide a valid email",
        },
        unique:true,
    },
    address:{
        type:String,
        required:[true,'Please provide address'],
    },
    phone :{
        type:String,
        required:[true,'Please provide phone number'],
        validate:{
            validator: phoneValidator,
            message:"Please provide a valid 10-digit phone number",
        }
    },
    password:{
        type:String,
        required:[true,'Please provide a passsword'],
        minlength:8,
    },
    role:{
        type:String,
        enum:['user','admin'],
    },
    verificationToken:String,
    isVerified:{
        type:Boolean,
        default:false,
    },
    passwordToken:{
        type:String,
    },
    passwordTokenExpirationDate:{
        type:Date,
    }
}, { timestamps: true });

userSchema.pre('save',async function(){
    if(!this.isModified('password')) return;
    
    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);// this order matters
    return isMatch;
};

module.exports = mongoose.model('User', userSchema);