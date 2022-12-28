const { User } = require("../db/models")

const verifyUser = async (req, res, next) => {
    if (!req?.user)
        return res.sendStatus(401);
    if (!req?.RoleId)
        return res.sendStatus(401);
    
    if ( req.RoleId === 1 ) {
        if(req?.params) {
            if(req?.params?.email) {
                if(req.params.email === req.user) {
                    return next();
                }
                else return res.sendStatus(401);
            }
            if(req?.params?.id) {
                const user = await User.findOne({ where: { email: req.user }, attributes: ['id'] });
                if(!user)
                    return res.sendStatus(404);
                if(req.params.id == user.id) {
                    return next();
                }
                else return res.sendStatus(401);
            }
        }
    }
    else {
        return next();
    }
}

module.exports = { verifyUser };