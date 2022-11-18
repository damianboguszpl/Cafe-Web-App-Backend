const { User, Role } = require("../db/models")
const { sign } = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = {
    getAll: async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    },

    getById: async (req, res) => {
        const id = req.params.id
        const user = await User.findByPk(id);
        res.json(user);
    },

    register: async (req, res) => {
        const { email, password, firstname, lastname, phoneNumber, sex } = req.body;

        const client_role = await Role.findOne({ where: { name: "client" } });
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
                        { expiresIn: '300s' }
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
                    // secure na true jeśli będzie https
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
        const user = await User.findOne({ where: { email: email }, attributes: { exclude: ['password'] } });
        res.json(user);
    },

    // get user by phone
    getByPhone: async (req, res) => {
        const phone = req.params.phone
        const user = await User.findOne({ where: { phone: phone }, attributes: { exclude: ['password'] } });
        res.json(user);
    },

    // get user by RoleId
    getByRoleId: async (req, res) => {
        const roleid = req.params.roleid
        const users = await User.findAll({ where: { RoleId: roleid }, attributes: { exclude: ['password'] } });
        res.json(users);
    }
}