const { User } = require("../db/models")

const verifyUser = async (req, res, next) => {
    if (!req?.user)
        return res.sendStatus(401);
    if (!req?.RoleId)
        return res.sendStatus(401);
    
    if ( req.RoleId === 1 ) {  // check if user accessing endpoint is "just" a Client
        if(req?.params) {
            if(req?.params?.email) {
                if(req.params.email === req.user) {
                    // console.log(req.params.email);
                    // console.log(req.user);
                    return next();
                }
                else return res.sendStatus(401);
            }
            if(req?.params?.id) {
                const user = await User.findOne({ where: { email: req.user }, attributes: ['id'] });
                if(!user)
                    return res.sendStatus(404);
                // console.log(user);
                // console.log(req.params.id)

                if(req.params.id == user.id) {
                    // console.log(user.id);
                    // console.log(req.user);
                    return next();
                }
                else return res.sendStatus(401);
            }
        }
    }
    else {
        return next();
    }
    // next();
}

module.exports = { verifyUser };