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
            res.json({ error: "User with given email already exists." });
        }
        else {
            var user2 = await User.findOne({ where: { phone: phoneNumber } });
            if (user2)
            {
                res.json({ error: "User with given phone number already exists." });
            }
            else {
                // console.log(firstname)
                // console.log(lastname)
                // console.log(email)
                // console.log(phoneNumber)
                // console.log(sex)
                // console.log(password)
                // console.log(user_role.id )
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
                // setTimeout(async function () {
                //     user = await User.findOne({ where: { email: email } });
                //     // give user 'user' privileges by assigning 'user' role
                //     User_Role.create({
                //         RoleId: user_role.id,
                //         UserId: user.id
                //     })
                // }, 1000)
                res.json("A new user account has been created.");
            }
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.json({ error: "Użytkownik nie istnieje" });
        }
        else {
            bcrypt.compare(password, user.password).then( async (match) => {
                if (!match) {
                    res.json({ error: "Hasło jest niepoprawne" });
                }
                else {
                    // req.session.user = user
                    
                    const accessToken = sign(
                        { "user": {
                            "email": user.email,
                            "RoleId": user.RoleId
                            }
                        }, 
                        process.env.ACCESS_TOKEN_SECRET, 
                        { expiresIn: '300s'}
                    );
                    const refreshToken = sign(
                        { "email": user.email  }, 
                        process.env.REFRESH_TOKEN_SECRET, 
                        { expiresIn: '1d'}
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
                    res.json({ RoleId:user.RoleId, accessToken});
                    
                    
                    // res.send(user)
                }

            });
        }
    },

    // validateLogin
    auth: async (req, res) => {
        // console.log(req)
        if(req.session.user) {
            // console.log("logged in")
            // res.send({loggedIn: true, user: req.session.user})
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
        const users = await User.findAll({ where: { RoleId: roleid }, attributes: { exclude: ['password'] } });
        res.json(users);
    }
}