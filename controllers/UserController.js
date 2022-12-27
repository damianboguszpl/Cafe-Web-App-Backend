const { User, Role } = require("../db/models")
const { sign } = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = {
    getAll: async (req, res) => {
        const users = await User.findAll({ attributes: { exclude: ['password', 'refreshToken'] } });
        if (!users.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Użytkowników.' });
        return res.json(users);
    },

    getById: async (req, res) => {
        const id = req.params.id
        const user = await User.findOne({ where: { id: id}, attributes: { exclude: ['password', 'refreshToken'] }  });
        if(!user)
            return res.status(404).json({ 'message': `Nie znaleziono Użytkownika o Id ${req.params.id}.` });
        return res.json(user);
    },

    register: async (req, res) => {
        if (!req?.body?.email || !req?.body?.password || !req?.body?.firstname || !req?.body?.lastname 
            || !req?.body?.phoneNumber || !req?.body?.sex)
            return res.status(400).json({ 'error': 'Nie podano wszystkich wymaganych danych.' });
        
        var passwordRegExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/);
        if (!passwordRegExp.test(req.body.password)) {
            return res.status(400).json({ 'error': "Hasło nie spełnia zasad bezpieczeństwa." });
        }

        const client_role = await Role.findOne({ where: { name: "Klient" } });
        var user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).json({ 'error': "Użytkownik z podanym adresem email już istnieje." });
        }
        else {
            var user2 = await User.findOne({ where: { phone: req.body.phoneNumber } });
            if (user2) {
                return res.status(400).json({ 'error': "Użytkownik z podanym numerem telefonu już istnieje." });
            }
            else {
                bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                    User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        phone: req.body.phoneNumber,
                        sex: req.body.sex,
                        points: 0,
                        password: hash,
                        RoleId: client_role.id
                    })
                })
                return res.json({'message': `Utworzono nowe konto.`});
            }
        }
    },

    create: async (req, res) => {
        if (!req?.body?.email)
            return res.status(400).json({ 'message': 'Nie podano adresu e-mail.' });
        if (!req?.body?.password)
            return res.status(400).json({ 'message': 'Nie podano hasła.' });
        if (!req?.body?.phoneNumber)
            return res.status(400).json({ 'message': 'Nie podano numeru telefonu.' });
        if (!req?.body?.RoleId)
            return res.status(400).json({ 'message': 'Nie podano Id Roli.' });
        if (!req?.body?.firstname)
            return res.status(400).json({ 'message': 'Nie podano imienia.' });
        if (!req?.body?.lastname)
            return res.status(400).json({ 'message': 'Nie podano nazwiska.' });
        if (!req?.body?.sex)
            return res.status(400).json({ 'message': 'Nie podano płci.' });

        var passwordRegExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/);
        if (!passwordRegExp.test(req.body.password)) {
            return res.status(400).json({ 'error': "Hasło nie spełnia zasad bezpieczeństwa." });
        }

        var user = await User.findOne({ where: { email: req.body.email } });
        if (user)
            return res.status(400).json({ 'error': "Użytkownik z podanym adresem email już istnieje" });

        user = await User.findOne({ where: { phone: req.body.phoneNumber } });
        if (user)
            return res.status(400).json({ 'error': "Użytkownik z podanym numerem telefonu już istnieje" });

        var role = await Role.findOne({ where: { id: req.body.RoleId } });
        if (!role)
            return res.status(400).json({ 'error': "Nie istnieje Rola o podanym Id." });

        bcrypt.hash(req.body.password, saltRounds).then((hash) => {
            User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phoneNumber,
                sex: req.body.sex,
                points: 0,
                password: hash,
                RoleId: req.body.RoleId
            })
        })
        return res.json({'message': `Utworzono nowe konto.`});
    },

    update: async (req, res) => {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user)
            return res.status(404).json({ 'message': `Nie znaleziono Użytkownika o Id ${req.params.id}.` });

        if (!req?.body?.firstname && !req?.body?.lastname && !req?.body?.email && !req?.body?.phone && !req?.body?.sex && !req?.body?.RoleId)
            return res.status(400).json({ 'message': 'Nie podano wymaganych danych.' });
        else {
            if(req?.body?.email) {
                var user2 = await User.findOne({ where: { email: req.body.email } });
                if (user2 && req.body.email != user.email)
                    return res.status(400).json({ 'error': "Podany adres email jest już zajęty." });
            }
            if(req?.body?.phone) {
                user2 = await User.findOne({ where: { phone: req.body.phone } });
                if (user2 && req.body.phone != user.phone)
                    return res.status(400).json({ 'error': "Podany numer telefonu jest już zajęty." });
            }
            
            User.update(
                {
                    firstname: req?.body?.firstname ? req.body.firstname : this.firstname,
                    lastname: req?.body?.lastname ? req.body.lastname : this.lastname,
                    email: req?.body?.email ? req.body.email : this.email,
                    phone: req?.body?.phone ? req.body.phone : this.phone,
                    sex: req?.body?.sex ? req.body.sex : this.sex,
                    RoleId: req?.body?.RoleId ? req.body.RoleId : this.RoleId
                },
                { where: { id: req.params.id } }
            ).then((result) => {
                res.json({'message': `Zaktualizowano dane Użytkownika.`});
            });
        }
    },

    edit: async (req, res) => {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user)
            return res.status(400).json({ 'message': `Nie znaleziono Użytkownika o Id ${req.params.id}.` });
        
        if (!req?.body?.firstname && !req?.body?.lastname && !req?.body?.email && !req?.body?.phone && !req?.body?.sex && !req?.body?.RoleId)
            return res.status(400).json({ 'message': 'Nie podano wymaganych danych.' });
        else {
            if(req?.body?.email) {
                var user2 = await User.findOne({ where: { email: req.body.email } });
                if (user2 && req.body.email != user.email)
                    return res.status(400).json({ 'error': "Podany adres email jest już zajęty." });
            }
            if(req?.body?.phone) {
                user2 = await User.findOne({ where: { phone: req.body.phone } });
                if (user2 && req.body.phone != user.phone)
                    return res.status(400).json({ 'error': "Podany numer telefonu jest już zajęty." });
            }

            User.update(
                {
                    firstname: req?.body?.firstname ? req.body.firstname : this.firstname,
                    lastname: req?.body?.lastname ? req.body.lastname : this.lastname,
                    email: req?.body?.email ? req.body.email : this.email,
                    phone: req?.body?.phone ? req.body.phone : this.phone,
                    sex: req?.body?.sex ? req.body.sex : this.sex,
                },
                { where: { id: req.params.id } }
            ).then((result) => {
                res.json({'message': `Zaktualizowano dane Użytkownika.`});
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.status(400).json({ 'error': "Użytkownik nie istnieje." });
        }
        else {
            bcrypt.compare(password, user.password).then(async (match) => {
                if (!match) {
                    res.status(400).json({ 'error': "Hasło jest niepoprawne." });
                }
                else {

                    const accessToken = sign(
                        {
                            "user": {
                                "email": user.email,
                                "RoleId": user.RoleId
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '3600s' }
                    );
                    const refreshToken = sign(
                        {
                            "email": user.email,
                            "RoleId": user.RoleId
                        },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );

                    try {
                        const result = await User.update(
                            { refreshToken: refreshToken },
                            { where: { id: user.id } }
                        )
                        // console..log(result)
                    } catch (err) {
                        // console.log(err)
                    }

                    // Creates Secure Cookie with refresh token
                    // secure na true jeśli będzie https                    WAŻNE
                    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

                    res.json({ RoleId: user.RoleId, accessToken });
                }

            });
        }
    },

    changePassword: async (req,res) => {
        const { password, newPassword } = req.body;
        const user = await User.findOne({ where: { id: req.params.id } });

        if (!req?.body?.password)
            return res.status(400).json({ 'error': 'Nie wysłano hasła.' });
        if (!req?.body?.newPassword)
            return res.status(400).json({ 'error': 'Nie wysłano nowego hasła.' });

        var passwordRegExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/);
        if (!passwordRegExp.test(req.body.newPassword)) {
            return res.status(400).json({ 'error': "Nowe hasło nie spełnia zasad bezpieczeństwa." });
        }

        if (!user) {
            res.status(400).json({ 'error': "Użytkownik nie istnieje" });
        }
        else {
            bcrypt.compare(password, user.password).then(async (match) => {
                if (!match) {
                    return res.status(400).json({ 'error': "Stare hasło jest niepoprawne" });
                }
                else {
                    try {
                        bcrypt.hash(newPassword, saltRounds).then((hash) => {
                            User.update(
                                { password: hash },
                                { where: { id: user.id } }
                            )
                        })
                        return res.status(200).json({ 'message': "Hasło zostało zmienione" });
                        // console..log(result)
                    } catch (err) {
                        // console.log(err)
                        return res.status(400).json({ 'error': err });
                    }
                }
            });
        }
    },

    getByEmail: async (req, res) => {
        const email = req.params.email
        const user = await User.findOne({ where: { email: email }, attributes: { exclude: ['password', 'refreshToken'] } });
        if(!user)
            return res.status(404).json({ 'message': `Nie znaleziono Użytkownika o adresie e-mail ${req.params.email}.` });
        res.json(user);
    },

    getByPhone: async (req, res) => {
        const phone = req.params.phone
        const user = await User.findOne({ where: { phone: phone }, attributes: { exclude: ['password', 'refreshToken'] } });
        if(!user)
            return res.status(404).json({ 'message': `Nie znaleziono Użytkownika o numerze telefonu ${req.params.phone}.` });
        res.json(user);
    },

    getByRoleId: async (req, res) => {
        const roleid = req.params.roleid
        const users = await User.findAll({ where: { RoleId: roleid }, attributes: { exclude: ['password', 'refreshToken'] } });
        if(!users.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Użytkowników z Rolą o Id ${req.params.roleid}.` });
        res.json(users);
    }
}