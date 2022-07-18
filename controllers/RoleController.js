const { Role } = require("../db/models")

module.exports = {
    // get all Roles
    getAll: async (req, res) => {
        const roles = await Role.findAll();
        res.json(roles);
    },
    // get Role /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const role = await Role.findByPk(id);
        res.json(role);
    }
}