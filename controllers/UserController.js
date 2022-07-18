const { User } = require("../db/models")

module.exports = {
    // get all Users
    getAll: async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    },
    // get User /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const user = await User.findByPk(id);
        res.json(user);
    }
}