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
    },
    // get Product by name
    getByName: async (req, res) => {
        const name = req.params.name
        const product = await Product.findOne({ where: { name: name } });
        res.json(product);
    },
    // get available Products
    getAvailable: async (req, res) => {
        const products = await Product.findAll({where: { is_available: true }})
        res.json(products)
    },
    // get unavailable Products
    getUnavailable: async (req, res) => {
        const products = await Product.findAll({where: { is_available: false }})
        res.json(products)
    },
    // get Products by StatusId
    getByProductStatusId: async (req, res) => {
        const status = req.params.status
        const products = await Product.findAll({ where: { StatusId: status } });
        res.json(products);
    },
    // get Products by CategoryId
    getByCategoryId: async (req, res) => {
        const category = req.params.category
        const products = await Product.findAll({ where: { CategoryId: category } });
        res.json(products);
    },
}