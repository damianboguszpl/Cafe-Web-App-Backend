const { verify } = require("jsonwebtoken")
const { Role  } = require('../db/models')

// const validateToken = (req, res, next) => {
//     const accessToken = req.header("accessToken")

//     if (!accessToken) {
//         return res.json({ error: "You're not logged in!" })
//     }

//     try {
//         const validToken = verify(accessToken, "34qwereawdq4we3w3eqf7y6uhesecerttoken");
//         req.user = validToken;
//         if (validToken) {
//             return next();
//         }
//     } catch (err) {
//         return res.json({ error: "Authentication Token is not valid!" });
//     }

// }

// const validateAdmin = (req, res, next) => {
//     const accessToken = req.header("accessToken")
//     if (!accessToken) {
//         return res.json({ error: "You're not logged in!" })
//     }
    
//     try {
//         const validToken = verify(accessToken, "34qwereawdq4we3w3eqf7y6uhesecerttoken");
//         req.user = validToken;
//         if (validToken) {
//             setTimeout(async ()=> {
//                 const admin_role = await Role.findOne({ where: { name: "admin" } });
//                 var owned_admin_role = await User_Role.findOne({ where: { UserId: req.user.id, RoleId: admin_role.id }, attributes: { exclude: ['password'] } });
//                 if (owned_admin_role) {
//                     return next()
//                 }
//                 else {
//                     return res.status(400).json({ error: "Account has no admin rights." });
//                 }
//             },100)
//         }
//     } catch (err) {
//         return res.status(400).json({ error: "Authentication Token is not valid." });
//     }
// }

// module.exports = { validateToken, validateAdmin };