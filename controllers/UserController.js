const { User } = require("../db/models")
// const bcrypt = require("bcrypt")
// const { validateToken } = require('../middlewares/AuthMiddleware')
// const { sign } = require('jsonwebtoken')

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
    // // register
    // register: async (req, res) => {
    //     const { email, password, firstname, lastname } = req.body;

    //     const user_role = await Role.findOne({ where: { name: "user" } });
    //     var user = await User.findOne({ where: { email: email } });
    //     if (user) {
    //         res.json({ error: "User with given email already exists." });
    //     }
    //     else {
    //         bcrypt.hash(password, 10).then((hash) => {
    //             User.create({
    //                 firstname: firstname,
    //                 lastname: lastname,
    //                 email: email,
    //                 password: hash
    //             })
    //         })
    //         setTimeout(async function () {
    //             user = await User.findOne({ where: { email: email } });
    //             // give user 'user' privileges by assigning 'user' role
    //             User_Role.create({
    //                 RoleId: user_role.id,
    //                 UserId: user.id
    //             })
    //         }, 1000)
    //         res.json("success");
    //     }
    // },
    // // login
    // login: async (req, res) => {
    //     const { email, password } = req.body;
    //     const user = await User.findOne({ where: { email: email } });

    //     if (!user) {
    //         res.json({ error: "Użytkownik nie istnieje" });
    //     }
    //     else {
    //         bcrypt.compare(password, user.password).then((match) => {
    //             if (!match) {
    //                 res.json({ error: "Hasło jest niepoprawne" });
    //             }
    //             else {
    //                 const accessToken = sign({ email: user.email, id: user.id }, "34qwereawdq4we3w3eqf7y6uhesecerttoken");
    //                 res.json({ token: accessToken, email: email, id: user.id });
    //             }

    //         });
    //     }
    // },
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