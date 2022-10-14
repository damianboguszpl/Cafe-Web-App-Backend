const jwt = require("jsonwebtoken")

// const verifyToken = (req, res, next) => {
//     const accessToken = req.header("accessToken")

//     if (!accessToken) {
//         return res.json({ error: "Nie jesteś zalogowany!" })
//     }

//     try {
//         const validToken = verify(accessToken, "34qwereawdq4we3w3eqf7y6uhesecerttoken");
//         req.user = validToken;
//         if (validToken) {
//             return next();
//         }
//     } catch (err) {
//         return res.json({ error: err });
//     }

// }

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) 
        return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.email;
            req.role = decoded.role;
            next();
        }
    );
}

module.exports = { verifyJWT };