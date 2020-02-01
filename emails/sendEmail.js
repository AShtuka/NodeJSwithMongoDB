const nodeMailer = require('nodemailer');
const keys = require('../keys');
const regEmail = require('./registration');


module.exports = sendEmail = async options => {

    const transporter = nodeMailer.createTransport(
        {
            service: keys.EMAIL_SERVICE_NAME,
            auth: {
                user: keys.EMAIL_SERVICE_USER_NAME,
                pass: keys.EMAIL_SERVICE_USER_PASS
            },
            secure: false,
            tls: {
                rejectUnauthorized: false
            }
        }
    );

    return await transporter.sendMail(options);
};