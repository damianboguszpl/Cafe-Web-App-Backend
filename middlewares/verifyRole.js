const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.RoleId)
            return res.sendStatus(401);
            
        const rolesArray = [...allowedRoles];
        const result = rolesArray.includes(req.RoleId)

        if (!result)
            return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRole