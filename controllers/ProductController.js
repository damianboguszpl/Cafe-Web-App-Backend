const { Product } = require("../db/models")

module.exports = {
    // get all Products
    getAll: async (req, res) => {
        const products = await Product.findAll();
        res.json(products);
    },
    // get Product /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const product = await Product.findByPk(id);
        res.json(product);
    }
}