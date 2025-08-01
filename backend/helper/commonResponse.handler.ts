import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const sendEmail = async (contact: any) => {
    var sender = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    var composemail = {
        from: process.env.EMAIL_USER,
        replyTo: contact.email,
        to: "sivakumarrajaait@gmail.com",
        subject: `Welcome to My Website Contact: ${contact.subject}`,
        text: `
            Name: ${contact.name}
            Email: ${contact.email}
            Mobile Number: ${contact.mobileNumber}
            Subject: ${contact.subject}
            Message: ${contact.message}
        `,
    };


    sender.sendMail(composemail, function (error:any, info:any) {
        if (error) {
            console.error("Error sending email:", error);
           
        } else {
            console.log("Mail sent successfully:", info.response);
        }
    });
};