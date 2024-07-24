import nodemailer from 'nodemailer';
import crypto from 'crypto';
import db from './db/db';

function generateToken(userId:any,length:number) {
  const hash = crypto.createHash('sha256').update(userId.toString()).digest('base64');

  const alphanumericHash = hash.replace(/[^a-zA-Z0-9]/g, '');

  return alphanumericHash.slice(0, length);
}

export const sendEmail = async (email:string) => {

    try{
        const hashedToken = generateToken(email,10)
        console.log("token generated: ",hashedToken)
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const user = await db.user.update({
            where: {
              email: email,
            },
            data: {
              reset_password_token: hashedToken,
              reset_password_expire_date: expiryDate,
            },
          });
        console.log("user updated: ", user)
          
        var transport = nodemailer.createTransport({
            // host: "sandbox.smtp.mailtrap.io",
            // port: 2525,
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.MAIL_ID,
              pass: process.env.GOOGLE_APP_PASS
            }
          });
        
        const mailOptions = {
            from:"no-reply@gmail.com",
            to: email,
            subject:"Reset your password",
            html: `
            <html>
              <body style="font-family: Arial, sans-serif; margin: 20px; padding: 20px;">
                <h2>Password Reset Request</h2>
                <p>Hello user,</p>
                <p>We received a request to reset your password. Please click the link below to create a new password:</p>
                <button><a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}" style="color: #1a73e8; text-decoration: none;">Reset Password</a></button>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Thank you!</p>
                <p>Gourav garg</p>
              </body>
            </html>
          `
        }

        const mail = await transport.sendMail(mailOptions, (error: any, info: { response: any; }) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
          })
        return mail;
    }catch(err){
        console.log(err)
        return err;
    }

}