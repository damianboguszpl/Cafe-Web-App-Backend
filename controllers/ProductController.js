const { Product, SpecialOffer, Coupon } = require("../db/models");

module.exports = {
    
    create: async (req,res) => {
        if (!req?.body?.name) { return res.status(400).json({ 'error': 'Nie określono nazwy produktu.' }); }
        if (!req?.body?.size) { return res.status(400).json({ 'error': 'Nie określono rozmiaru produktu.' }); }
        if (!req?.body?.price) { return res.status(400).json({ 'error': 'Nie określono ceny produktu.' }); }
        if (!req?.body?.CategoryId) { return res.status(400).json({ 'error': 'Nie określono kategorii produktu.' }); }
        if (!req?.body?.ProductStatusId) { return res.status(400).json({ 'error': 'Nie określono statusu produktu.' }); }

        const existingProduct = await Product.findOne({where:{name: req.body.name}})
        if (existingProduct) 
            return res.status(400).json({ 'error': 'Produkt o podanej nazwie już istnieje.' });

        const newProduct = await Product.create(req.body);
        return res.status(201).json({ 'message' : `Dodano nowy produkt`, 'data': newProduct});
    },
    
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

        res.json("Produkt został zaktualizowany.");
    },
    
    delete: async (req,res) => {
        const id = req.params.id;
        await Product.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const products = await Product.findAll();
        res.json(products);
    },
    
    getAllWithSpecialOffers: async (req, res) => {
        const products = await Product.findAll({
            include: [{
                model: SpecialOffer,
                attributes: ['id', 'value', 'start_date', 'end_date']
            }],
        });
        res.json(products);
    },
    
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
    
    getById: async (req, res) => {
        const id = req.params.id
        const product = await Product.findByPk(id);
        res.json(product);
    },
    
    getByName: async (req, res) => {
        const name = req.params.name
        const product = await Product.findOne({ where: { name: name } });
        res.json(product);
    },
    
    getByProductStatusId: async (req, res) => {
        const products = await Product.findAll({ where: { ProductStatusId: req.params.id } });
        res.json(products);
    },
    
    getByCategoryId: async (req, res) => {
        const products = await Product.findAll({ where: { CategoryId: req.params.id } });
        res.json(products);
    },
}