import nodemailer from 'nodemailer';
import registerTemlate from '../MailTemplates/registrationTemplate.js';
import verifyEmailTemplate from '../MailTemplates/verifyEmailTemplate.js';
import otpverification from '../MailTemplates/otpverification.js'




//SEND AN email

const sendMail = async ({email,subject,username,otp})=>{
    

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL,
            pass:process.env.MAIL_PASSWORD
        },
    });


    let mailContent;

    if(subject === "registration"){
        mailContent={
            from:`"Blog.." <vikashkumargauravdss@gmail.com>`,
            to:email,
            subject:subject,
            html:registerTemlate({username})
        }
    } else if( subject === "verifyEmail"){

        mailContent={
            from:`"Blog" <vikashkumargauravdss@gmail.com>`,
            to:email,
            subject:subject,
            html:verifyEmailTemplate()
        } 
    } else if (subject === 'otp verification') {
        mailContent={
            from:`"Blog * here we go darling" <vikashkumargauravdss@gmail.com>`,
            to:email,
            subject:subject,
            html:otpverification({email,username,otp})
        } 
    }
    
    try {

       
         

        const info = await transporter.sendMail(mailContent);
        console.log(`Email sent to ${email}`); // Success message
        
        
    } catch (error) {
        console.log(`error from sendMail ${error}`);
        
    }
}
export default sendMail;