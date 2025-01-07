import nodemailer from 'nodemailer';
import registerTemlate from '../MailTemplates/registrationTemplate.js';
import verifyEmailTemplate from '../MailTemplates/verifyEmailTemplate.js';




//SEND AN email

const sendMail = async ({email,subject,username})=>{
    

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
            from:`"Bloog" <vikashkumargauravdss@gmail.com>`,
            to:email,
            subject:subject,
            html:registerTemlate({username})
        }
    } else if( subject === "verifyEmail"){

        mailContent={
            from:`"Bloog" <vikashkumargauravdss@gmail.com>`,
            to:email,
            subject:subject,
            html:verifyEmailTemplate()
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