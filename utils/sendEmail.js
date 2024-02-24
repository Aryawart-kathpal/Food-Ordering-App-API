const nodemailer=require('nodemailer');
const nodemailerConfig=require('./nodemailerConfig');

const sendEmail = async({to,html,subject})=>{
    // const testAccount = await nodemailer.createTestAccount();
    const transporter=nodemailer.createTransport(nodemailerConfig);
    
    return transporter.sendMail({
        from:'"Aryawart Kathpal" <aryawart.kathpal2909@gmail.com>',
        to,subject,html
    }/*,(err)=>{console.log(err);}*/);
}

module.exports=sendEmail;