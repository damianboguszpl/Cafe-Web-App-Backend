// const { User } = require("../db/models")

// const handleLogout = async (req, res) => {
//     // On client, also delete the accessToken

//     const cookies = req.cookies;
//     if (!cookies?.jwt) {
//         console.log("cookie not set")
//         return res.sendStatus(204); //No content
//     }
        
//     const refreshToken = cookies.jwt;

//     // Is refreshToken in db?
//     const user = await User.findOne({ where: { refreshToken: refreshToken } });
//     if (!user) {
//         res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//         // return res.sendStatus(204);
//         return res.status(200).json({ message: "Wylogowano" });
//     }

//     // Delete refreshToken in db
//     user.refreshToken = '';
//     const result = await user.save();
//     console.log(result);

//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//     res.sendStatus(204);
// }

// module.exports = { handleLogout }