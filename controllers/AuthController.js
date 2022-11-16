const { User, PasswordResetCode } = require("../db/models");
var randomstring = require("randomstring");
const sendEmail = require("../utils/email/sendEmail");
const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = {

    request: async (req,res) => {
        if (!req?.body?.email) { return res.status(400).json({ 'message': 'Email parameter not specified.' }); }

        const user = await User.findOne({ where: { email: req.body.email } });
        
        if (!user) {
            res.json({ error: "Użytkownik nie istnieje" });
        }
        else {
            const password_reset_code = await PasswordResetCode.findOne({ where: { userId: user.id}  });
            if(password_reset_code) {
                createdAt = password_reset_code.createdAt;
                const now = new Date()
                const codeValidTime = 5*60*1000;
                if(!(codeValidTime > (now - createdAt))) {
                    await PasswordResetCode.destroy({
                        where: {
                            id: password_reset_code.id
                        }
                    })
                    console.log("Expired resetCode deleted.");
                }
                else {
                    return res.status(400).json({"error":"Email with Verification Code already sent. Code will be still valid for " + parseInt((codeValidTime - (now - createdAt))/1000,10) + " seconds;"})
                }
            }
            else {
                
            }
            const resetCode = randomstring.generate({
                length: 6,
                charset: 'numeric'
            });
            
            await PasswordResetCode.create({
                resetCode: resetCode,
                UserId: user.id
            })
            .then( (result) => {
                console.log("New resetCode created.");
                
                sendEmail(
                    user.email,
                    "Password Reset Request",
                    {
                    name: user.firstname,
                    resetCode: resetCode,
                    },
                    "./templates/requestResetPassword.handlebars"
                );
                res.json({"message": "Email with Verification Code has been sent."})
            })
        }
    },

    reset: async (req,res) => {
        if (!req?.body?.email) { return res.status(400).json({ 'message': 'Email parameter not specified.' }); }
        if (!req?.body?.resetCode) { return res.status(400).json({ 'message': 'ResetCode parameter not specified.' }); }
        if (!req?.body?.password) { return res.status(400).json({ 'message': 'Password parameter not specified.' }); }

        const user = await User.findOne({ where: { email: req.body.email } });
        
        if (!user) {
            res.json({ error: "Użytkownik nie istnieje" });
        }
        else {
            const password_reset_code = await PasswordResetCode.findOne({ where: { userId: user.id}  });
            if(password_reset_code) {
                createdAt = password_reset_code.createdAt;
                const now = new Date()
                const codeValidTime = 5*60*1000;
                if(!(codeValidTime > (now - createdAt))) {
                    res.status(403).json({ error: "ResetCode expired." });
                }
                else {
                    if(password_reset_code.resetCode == req.body.resetCode) {
                        bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                            User.update(
                            { 
                                password: hash
                            }, 
                            {
                            where: {
                                email: req.body.email
                            }
                            });
                            PasswordResetCode.destroy({
                                where: {
                                    id: password_reset_code.id
                                }
                            })
                            console.log("Expired resetCode deleted.");
                            res.json({ "message": "Password has been updated."});
                        })
                    }
                    else {
                        res.status(403).json({ error: "ResetCode incorrect." });
                    }
                }
            }
            else {
                return res.status(403).json({ error: "ResetCode incorrect." });
            }
        }
    },
}