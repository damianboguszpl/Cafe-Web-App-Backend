const { Product, SpecialOffer, Coupon } = require("../db/models");
// const Coupon = require("../db/models/Coupon");

module.exports = {
    // create new Product
    create: async (req,res) => {
        if (!req?.body?.name) { return res.status(400).json({ 'message': 'Name parameter not specified.' }); }
        if (!req?.body?.size) { return res.status(400).json({ 'message': 'Size parameter not specified.' }); }
        if (!req?.body?.price) { return res.status(400).json({ 'message': 'Price parameter not specified.' }); }
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
    // get all Products with SpecialOffers
    getAllWithSpecialOffers: async (req, res) => {
        const products = await Product.findAll({
            include: [{
                model: SpecialOffer,
                attributes: ['id', 'value', 'start_date', 'end_date']
            }],
        });
        res.json(products);
    },
    // get all Products with SpecialOffers that have no coupons
    getAllWithoutCoupons: async (req, res) => {
        const coupons = await Coupon.findAll();
        const products = await Product.findAll({
            include: [{
                model: SpecialOffer,
                attributes: ['id', 'value', 'start_date', 'end_date']
            }],
        });
        if(coupons != null) {
            const productsWithoutCoupons = products.filter(n => !products.filter( (product) => {
                return coupons.some(e => e.ProductId === product.id && e.isAvailable === true)
            }).includes(n))
            res.json(productsWithoutCoupons);
        }
        else 
            res.json(products)
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
    // getAvailable: async (req, res) => {
    //     const products = await Product.findAll({where: { is_available: true }})
    //     res.json(products)
    // },
    // get unavailable Products
    // getUnavailable: async (req, res) => {
    //     const products = await Product.findAll({where: { is_available: false }})
    //     res.json(products)
    // },
    // get Products by StatusId
    getByProductStatusId: async (req, res) => {
        const products = await Product.findAll({ where: { ProductStatusId: req.params.id } });
        res.json(products);
    },
    // get Products by CategoryId
    getByCategoryId: async (req, res) => {
        const products = await Product.findAll({ where: { CategoryId: req.params.id } });
        res.json(products);
    },
}