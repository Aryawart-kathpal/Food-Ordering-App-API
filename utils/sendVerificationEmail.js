const sendEmail = require('./sendEmail');

const sendVerificationEmail= async ({name,email,verificationToken,origin})=>{
    const verifyEmail=`${origin}/api/auth/verify-email?token=${verificationToken}&email=${email}`;

    const message = `<p> Please click on the following link to verify your email <a href="${verifyEmail}"> Verify email </a> </p>`;

    return sendEmail({
        to:email,
        subject:'Verification email',
        html:`<h4> Hello ${name} </h4> <br>
                ${message}`
    });
}

module.exports=sendVerificationEmail;