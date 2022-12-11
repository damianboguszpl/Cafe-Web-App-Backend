const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            service: process.env.EMAIL_SERVICE,
            auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
            },
        });
        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
            };
        };

        // Send email
        transporter.sendMail(options(), (error, info) => {
            // console.log(info)
            if (error) {
                return error;
            } else {
                return res.status(200).json({ success: true, });
            }
        });
    } catch (error) {
        return error;
    }
};

module.exports = sendEmail;