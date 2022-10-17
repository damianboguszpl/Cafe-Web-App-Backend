const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("1")
        if (!req?.role)
            return res.sendStatus(401);

        const rolesArray = [...allowedRoles];
        const result = req.role.map(role => rolesArray.includes(role)).find(val => val === true);
        console.log("2")
        if (!result)
            return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRole