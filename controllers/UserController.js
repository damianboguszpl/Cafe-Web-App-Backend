const { User, Role } = require("../db/models")
const { sign } = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = {
    getAll: async (req, res) => {
        const users = await User.findAll({ attributes: { exclude: ['password', 'refreshToken'] } });
        res.json(users);
    },

    getById: async (req, res) => {
        const id = req.params.id
        const user = await User.findOne({ where: { id: id}, attributes: { exclude: ['password', 'refreshToken'] }  });
        res.json(user);
    },

    register: async (req, res) => {
        const { email, password, firstname, lastname, phoneNumber, sex } = req.body;

        const client_role = await Role.findOne({ where: { name: "Klient" } });
        var user = await User.findOne({ where: { email: email } });
        if (user) {
            res.status(400).json({ error: "Użytkownik z podanym adresem email już istnieje" });
        }
        else {
            var user2 = await User.findOne({ where: { phone: phoneNumber } });
            if (user2) {
                res.status(400).json({ error: "Użytkownik z podanym numerem telefonu już istnieje" });
            }
            else {
                bcrypt.hash(password, saltRounds).then((hash) => {
                    User.create({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        phone: phoneNumber,
                        sex: sex,
                        points: 0,
                        // hourly_rate: 0,
                        password: hash,
                        RoleId: client_role.id // give user 'user' privileges by assigning 'user' role of an id = 1
                    })
                })
                res.json("A new user account has been created.");
            }
        }
    },

    create: async (req, res) => {
        // const { email, password, firstname, lastname, phoneNumber, sex, RoleId } = req.body;

        if (!req?.body?.email)
            return res.status(400).json({ 'message': 'email parameter not specified.' });
        if (!req?.body?.password)
            return res.status(400).json({ 'message': 'password parameter not specified.' });
        if (!req?.body?.phoneNumber)
            return res.status(400).json({ 'message': 'phoneNumber parameter not specified.' });
        if (!req?.body?.RoleId)
            return res.status(400).json({ 'message': 'RoleId parameter not specified.' });
        if (!req?.body?.firstname)
            return res.status(400).json({ 'message': 'firstname parameter not specified.' });
        if (!req?.body?.lastname)
            return res.status(400).json({ 'message': 'lastname parameter not specified.' });
        if (!req?.body?.sex)
            return res.status(400).json({ 'message': 'sex parameter not specified.' });

        var user = await User.findOne({ where: { email: req.body.email } });
        if (user)
            return res.status(400).json({ error: "Użytkownik z podanym adresem email już istnieje" });

        user = await User.findOne({ where: { phone: req.body.phoneNumber } });
        if (user)
            return res.status(400).json({ error: "Użytkownik z podanym numerem telefonu już istnieje" });

        var role = await Role.findOne({ where: { id: req.body.RoleId } });
        if (!role)
            return res.status(400).json({ error: "Role with given id does not exists." });

        bcrypt.hash(req.body.password, saltRounds).then((hash) => {
            User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phoneNumber,
                sex: req.body.sex,
                points: 0,
                // hourly_rate: 0,
                password: hash,
                RoleId: req.body.RoleId
            })
        })
        return res.json("A new user account has been created.");
    },

    update: async (req, res) => {
        // if (!req?.body?.name)
        //     return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user)
            return res.status(400).json({ 'message': `No user matching ID ${req.params.id} has been found.` });

        if (!req?.body?.firstname && !req?.body?.lastname && !req?.body?.email && !req?.body?.phone && !req?.body?.sex && !req?.body?.RoleId)
            return res.status(400).json({ 'message': 'None of the required parameters were passed.' });
        else {
            if(req?.body?.email) {
                var user2 = await User.findOne({ where: { email: req.body.email } });
                if (user2 && req.body.email != user.email)
                    return res.status(400).json({ error: "Podany adres email jest już zajęty." });
            }
            if(req?.body?.phone) {
                user2 = await User.findOne({ where: { phone: req.body.phone } });
                if (user2 && req.body.phone != user.phone)
                    return res.status(400).json({ error: "Podany numer telefonu jest już zajęty." });
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
                return res.json("Updated successfully.");
            });
        }
    },

    edit: async (req, res) => {
        // if (!req?.body?.name)
        //     return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user)
            return res.status(400).json({ 'message': `No user matching ID ${req.params.id} has been found.` });
        
        if (!req?.body?.firstname && !req?.body?.lastname && !req?.body?.email && !req?.body?.phone && !req?.body?.sex && !req?.body?.RoleId)
            return res.status(400).json({ 'message': 'None of the required parameters were passed.' });
        else {
            if(req?.body?.email) {
                var user2 = await User.findOne({ where: { email: req.body.email } });
                if (user2 && req.body.email != user.email)
                    return res.status(400).json({ error: "Podany adres email jest już zajęty." });
            }
            if(req?.body?.phone) {
                user2 = await User.findOne({ where: { phone: req.body.phone } });
                if (user2 && req.body.phone != user.phone)
                    return res.status(400).json({ error: "Podany numer telefonu jest już zajęty." });
            }

            User.update(
                {
                    firstname: req?.body?.firstname ? req.body.firstname : this.firstname,
                    lastname: req?.body?.lastname ? req.body.lastname : this.lastname,
                    email: req?.body?.email ? req.body.email : this.email,
                    phone: req?.body?.phone ? req.body.phone : this.phone,
                    sex: req?.body?.sex ? req.body.sex : this.sex,
                    // RoleId: req?.body?.RoleId ? req.body.RoleId : this.RoleId
                },
                { where: { id: req.params.id } }
            ).then((result) => {
                return res.json("Updated successfully.");
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.status(400).json({ error: "Użytkownik nie istnieje" });
        }
        else {
            bcrypt.compare(password, user.password).then(async (match) => {
                if (!match) {
                    res.status(400).json({ error: "Hasło jest niepoprawne" });
                }
                else {
                    // req.session.user = user

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

                    // user.refreshToken = refreshToken;
                    try {
                        const result = await User.update(
                            { refreshToken: refreshToken },
                            { where: { id: user.id } }
                        )
                        // handleResult(result)
                        // console.log("dodano Ref Tok")
                    } catch (err) {
                        // handleError(err)
                        // console.log("Nie dodano ref tok")
                    }

                    // const result = await user.save();
                    //save rt to db

                    // Creates Secure Cookie with refresh token
                    // secure na true jeśli będzie https                    WAŻNE
                    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

                    // res.json({ token: accessToken, email: user.email, RoleId: user.RoleId  });
                    res.json({ RoleId: user.RoleId, accessToken });


                    // res.send(user)
                }

            });
        }
    },

    // get user by email
    getByEmail: async (req, res) => {
        const email = req.params.email
        const user = await User.findOne({ where: { email: email }, attributes: { exclude: ['password', 'refreshToken'] } });
        res.json(user);
    },

    // get user by phone
    getByPhone: async (req, res) => {
        const phone = req.params.phone
        const user = await User.findOne({ where: { phone: phone }, attributes: { exclude: ['password', 'refreshToken'] } });
        res.json(user);
    },

    // get user by RoleId
    getByRoleId: async (req, res) => {
        const roleid = req.params.roleid
        const users = await User.findAll({ where: { RoleId: roleid }, attributes: { exclude: ['password', 'refreshToken'] } });
        res.json(users);
    }
}