const { User, PasswordResetCode } = require("../db/models");
var randomstring = require("randomstring");
const sendEmail = require("../utils/email/sendEmail");
const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = {

    logout: async (req, res) => {
        // On client, also delete the accessToken
    
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            console.log("cookie not set")
            return res.sendStatus(204); //No content
        }
            
        const refreshToken = cookies.jwt;
    
        // Is refreshToken in db?
        const user = await User.findOne({ where: { refreshToken: refreshToken } });
        if (!user) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            // return res.sendStatus(204);
            return res.status(200).json({ message: "Wylogowano" });
        }
    
        // Delete refreshToken in db
        user.refreshToken = '';
        const result = await user.save();
        console.log(result);
    
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    },

    request: async (req,res) => {
        if (!req?.body?.email) { return res.status(400).json({ error: 'Email parameter not specified.' }); }

        const user = await User.findOne({ where: { email: req.body.email } });
        
        if (!user) {
            return res.json({ error: "Użytkownik nie istnieje" });
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
                    // console.log("Expired resetCode deleted.");
                }
                else {
                    return res.status(200).json({"message":"Wiadomość e-mail z kodem resetującym została już wysłana. Kod będzie jeszcze ważny przez " + parseInt((codeValidTime - (now - createdAt))/1000,10) + " sekund."})
                }
            }
            else {
                
            }
            const resetCode = randomstring.generate({
                length: 6,
                charset: 'numeric'
            });
            
            bcrypt.hash(resetCode, saltRounds).then((hashedResetCode) => {
                PasswordResetCode.create({
                    resetCode: hashedResetCode,
                    UserId: user.id
                })
                .then( (result) => {
                    // console.log("New resetCode created.");
                    
                    sendEmail(
                        user.email,
                        "Password Reset Request",
                        {
                        name: user.firstname,
                        resetCode: resetCode,
                        },
                        "./templates/requestResetPassword.handlebars"
                    );
                    return res.json({"message": "Email z kodem resetującym hasło został wysłany."})
                })
            });
        }
    },

    reset: async (req,res) => {
        if (!req?.body?.email) { return res.status(400).json({ error: 'Atrybut Email nie został określony.' }); }
        if (!req?.body?.resetCode) { return res.status(400).json({ error: 'Atrybut ResetCode nie został określony.' }); }
        if (!req?.body?.password) { return res.status(400).json({ error: 'Atrybut Password nie został określony.' }); }

        const user = await User.findOne({ where: { email: req.body.email } });
        
        if (!user) {
            return res.json({ error: "Użytkownik nie istnieje" });
        }
        else {
            const password_reset_code = await PasswordResetCode.findOne({ where: { userId: user.id}  });
            if(password_reset_code) {
                createdAt = password_reset_code.createdAt;
                const now = new Date()
                const codeValidTime = 5*60*1000;
                if(!(codeValidTime > (now - createdAt))) {
                    return res.status(400).json({ error: "Upłynął czas na zmianę hasła. Rozpocznij operację od początku." });
                }
                else {
                    bcrypt.compare(req.body.resetCode, password_reset_code.resetCode).then( async (match) => {
                        if (!match) {
                            return res.status(400).json({ error: "Kod resetujący hasło jest niepoprawny." });
                        }
                        else {
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
                                // console.log("Expired resetCode deleted.");
                                return res.json({ 'message': "Hasło zostało zaktualizowane."});
                            });
                        }
        
                    });
                }
            }
            else {
                return res.status(400).json({ error: "Kod resetujący hasło jest niepoprawny." });
            }
        }
    },
}