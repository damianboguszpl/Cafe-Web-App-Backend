const { User, Role } = require("../db/models")
const bcrypt = require("bcrypt")
// const { validateToken } = require('../middlewares/AuthMiddleware')
const { sign } = require('jsonwebtoken')
const saltRounds = 10



module.exports = {
    // get all Users
    getAll: async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    },

    // get User /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const user = await User.findByPk(id);
        res.json(user);
    },

    // register
    register: async (req, res) => {
        const { email, password, firstname, lastname, phoneNumber, sex } = req.body;
        
        const user_role = await Role.findOne({ where: { name: "client" } });
        var user = await User.findOne({ where: { email: email } });
        if (user) {
            res.json({ error: "User with given email already exists." });
        }
        else {
            console.log(firstname)
            console.log(lastname)
            console.log(email)
            console.log(phoneNumber)
            console.log(sex)
            console.log(password)
            console.log(user_role.id )
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
                    RoleId: user_role.id // give user 'user' privileges by assigning 'user' role of an id = 1
                })
            })
            // setTimeout(async function () {
            //     user = await User.findOne({ where: { email: email } });
            //     // give user 'user' privileges by assigning 'user' role
            //     User_Role.create({
            //         RoleId: user_role.id,
            //         UserId: user.id
            //     })
            // }, 1000)
            res.json("success");
        }
    },

    // login
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.json({ error: "Użytkownik nie istnieje" });
        }
        else {
            bcrypt.compare(password, user.password).then((match) => {
                if (!match) {
                    res.json({ error: "Hasło jest niepoprawne" });
                }
                else {
                    req.session.user = user
                    res.send(user)
                }

            });
        }
    },

    // validateLogin
    auth: async (req, res) => {
        // console.log(req)
        if(req.session.user) {
            // console.log("logged in")
            res.send({loggedIn: true, user: req.session.user})
        }
        else {
            // console.log("not logged in")
            res.send({loggedIn: false})
        }
    },

    // // validate login
    // validateToken: async (req, res) => {
    //     res.json(req.user)
    // },

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
        const user = await User.findOne({ where: { RoleId: roleid }, attributes: { exclude: ['password'] } });
        res.json(user);
    }
}