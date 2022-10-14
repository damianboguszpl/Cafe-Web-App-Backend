const { User } = require("../db/models")
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies.jwt)
    if (!cookies?.jwt) 
        return res.sendStatus(401);
        
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ where: { refreshToken: refreshToken } });
    if (!user) 
        return res.sendStatus(403); //Forbidden

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.email !== decoded.email) return res.sendStatus(403);
            const role = user.RoleId;
            const accessToken = jwt.sign(
                {
                    "user": {
                        "email": decoded.email,
                        "RoleId": decoded.RoleId
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );
            res.json({ role, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }