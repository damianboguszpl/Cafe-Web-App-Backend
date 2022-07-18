const { Category } = require("../db/models")

module.exports = {
    // get all Categories
    getAll: async (req, res) => {
        const categories = await Category.findAll();
        res.json(categories);
    },
    // get Category /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const category = await Category.findByPk(id);
        res.json(category);
    }
}