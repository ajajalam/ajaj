const nodemailer = require('nodemailer');
async function sendEmail(to, subject, text, html = null) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure:true,
            auth: {
                user: "alamajaj813@gmail.com",
                pass: "fmkl fway cygk msbv",
            }, 
            tls: {
                rejectUnauthorized: false,
            }
        });
        const mailOptions = {
            from: "alamajaj813@gmail.com",
            to,
            subject,
            text,
            html,
        };
        setImmediate(async () => {
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);
                return info;
            } catch (error) {
                console.error('Error sending email:', error);
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = {sendEmail};