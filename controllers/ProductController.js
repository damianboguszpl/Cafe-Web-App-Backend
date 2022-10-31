const { Product } = require("../db/models")

module.exports = {
    // create new Product
    create: async (req,res) => {
        if (!req?.body?.name) { return res.status(400).json({ 'message': 'Name parameter not specified.' }); }
        if (!req?.body?.size) { return res.status(400).json({ 'message': 'Size parameter not specified.' }); }
        if (!req?.body?.price) { return res.status(400).json({ 'message': 'Price parameter not specified.' }); }
        if (!req?.body?.allergen) { return res.status(400).json({ 'message': 'Allergen parameter not specified.' }); }
        if (!req?.body?.CategoryId) { return res.status(400).json({ 'message': 'CategoryId parameter not specified.' }); }
        if (!req?.body?.ProductStatusId) { return res.status(400).json({ 'message': 'ProductStatusId parameter not specified.' }); }

        const product = req.body;
        await Product.create(product);
        res.json(product);
    },
    // update Product
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await Product.update(
            { 
                name: req.body.name,
                size: req.body.size,
                price: req.body.price,
                is_available: req.body.is_available,
                allergen: req.body.allergen,
                CategoryId: req.body.CategoryId,
                ProductStatusId: req.body.ProductStatusId
            }, 
            {
            where: {
                id: id
            }
            });

        res.json("Updated successfully.");
    },
    // delete Product
    delete: async (req,res) => {
        const id = req.params.id;
        await Product.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
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