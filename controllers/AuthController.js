const { User, PasswordResetCode } = require("../db/models");
const jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
const sendEmail = require("../utils/email/sendEmail");
const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = {
    handleRefreshToken: async (req, res) => {
        const cookies = req.cookies;
        if (!cookies?.jwt)
            return res.sendStatus(401);
    
        const refreshToken = cookies.jwt;
    
        const user = await User.findOne({ where: { refreshToken: refreshToken }, attributes: { exclude: ['password'] } });
        if (!user)
            return res.sendStatus(403);
    
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || user.email !== decoded.email)
                    return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        "user": {
                            "email": decoded.email,
                            "RoleId": decoded.RoleId
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '3600s' }
                );
                return res.json({ user, accessToken, "isLogged": true })
            }
        );
    },

    logout: async (req, res) => {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(204);
        }
        const refreshToken = cookies.jwt;
    
        const user = await User.findOne({ where: { refreshToken: refreshToken } });
        if (!user) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }
    
        user.refreshToken = '';
        await user.save();
    
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    },

    request: async (req,res) => {
        if (!req?.body?.email) { return res.status(400).json({ 'error': 'Nie podano adresu email.' }); }

        const user = await User.findOne({ where: { email: req.body.email } });
        
        if (!user) {
            return res.json({ 'error': "Użytkownik nie istnieje" });
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
        if (!req?.body?.email) { return res.status(400).json({ 'error': 'Nie podano adresu e-mail.' }); }
        if (!req?.body?.resetCode) { return res.status(400).json({ 'error': 'Nie podano kodu resetującego hasło.' }); }
        if (!req?.body?.password) { return res.status(400).json({ 'error': 'Nie podano hasła.' }); }

        const user = await User.findOne({ where: { email: req.body.email } });
        
        if (!user) {
            return res.json({ 'error': "Użytkownik nie istnieje" });
        }
        else {
            const password_reset_code = await PasswordResetCode.findOne({ where: { userId: user.id}  });
            if(password_reset_code) {
                createdAt = password_reset_code.createdAt;
                const now = new Date()
                const codeValidTime = 5*60*1000;
                if(!(codeValidTime > (now - createdAt))) {
                    return res.status(400).json({ 'error': "Upłynął czas na zmianę hasła. Rozpocznij proces od początku." });
                }
                else {
                    bcrypt.compare(req.body.resetCode, password_reset_code.resetCode).then( async (match) => {
                        if (!match) {
                            return res.status(400).json({ 'error': "Kod resetujący hasło jest niepoprawny." });
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
                                return res.json({ 'message': "Hasło zostało zaktualizowane."});
                            });
                        }
                    });
                }
            }
            else {
                return res.status(400).json({ 'error': "Kod resetujący hasło jest niepoprawny." });
            }
        }
    },
}