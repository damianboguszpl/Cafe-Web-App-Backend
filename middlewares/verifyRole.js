const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        // console.log("1")
        // console.log(allowedRoles)
        // console.log(req.RoleId)
        if (!req?.RoleId)
            return res.sendStatus(401);
        // console.log("id:" + req.RoleId)

        const rolesArray = [...allowedRoles];
        //const result = req.role.map(role => rolesArray.includes(role)).find(val => val === true);
        const result = rolesArray.includes(req.RoleId)
        // console.log("2")
        if (!result)
            return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRole