const { Product, SpecialOffer, Coupon } = require("../db/models");

module.exports = {
    
    create: async (req,res) => {
        if (!req?.body?.name) { return res.status(400).json({ 'error': 'Nie podano nazwy Produktu.' }); }
        if (!req?.body?.size) { return res.status(400).json({ 'error': 'Nie podano rozmiaru Produktu.' }); }
        if (!req?.body?.price) { return res.status(400).json({ 'error': 'Nie podano ceny Produktu.' }); }
        if (!req?.body?.CategoryId) { return res.status(400).json({ 'error': 'Nie podano Kategorii Produktu.' }); }
        if (!req?.body?.ProductStatusId) { return res.status(400).json({ 'error': 'Nie podano Statusu Produktu.' }); }

        const existingProduct = await Product.findOne({where:{name: req.body.name}})
        if (existingProduct) 
            return res.status(400).json({ 'error': 'Produkt o podanej nazwie już istnieje.' });

        const newProduct = await Product.create(req.body);
        return res.status(201).json({ 'message': `Dodano nowy Produkt.`, 'data': newProduct});
    },
    
    update: async (req,res) => {
        const product = await Product.findOne({ where: { id: req.params.id } });
        if(!product)
            return res.status(400).json({ 'error': `Nie znaleziono Produktu o Id ${req.params.id}.` });

        if(req?.body?.name) {
            const product2 = await Product.findOne({where:{name: req.body.name}});
            if (product2 && req.body.name != product.name)
                return res.status(400).json({ 'error': 'Produkt o podanej nazwie już istnieje.' });
        }

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
            { where: { id: req.params.id } }
        );

        return res.json({'message': `Zaktualizowano Produkt.`});
    },
    
    delete: async (req,res) => {
        const id = req.params.id;
        await Product.destroy(
            { where: { id: id } }
        );
        return res.json({'message': `Usunięto Produkt.`});
    },
    
    getAll: async (req, res) => {
        const products = await Product.findAll();
        if (!products.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Produktów.' });
        return res.json(products);
    },
    
    getAllWithSpecialOffers: async (req, res) => {
        const products = await Product.findAll({
            include: [{
                model: SpecialOffer,
                attributes: ['id', 'value', 'start_date', 'end_date']
            }],
        });
        if (!products.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Produktów.' });
        return res.json(products);
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
            return res.json(productsWithoutCoupons);
        }
        else 
        return res.json(products)
    },
    
    getById: async (req, res) => {
        const id = req.params.id
        const product = await Product.findByPk(id);
        if(!product)
            return res.status(400).json({ 'error': `Nie znaleziono Produktu o Id ${req.params.id}.` });
            return res.json(product);
    },
    
    getByName: async (req, res) => {
        const name = req.params.name
        const product = await Product.findOne({ where: { name: name } });
        if(!product)
            return res.status(400).json({ 'error': `Nie znaleziono Produktu o nazwie ${req.params.name}.` });
        return res.json(product);
    },
    
    getByProductStatusId: async (req, res) => {
        const products = await Product.findAll({ where: { ProductStatusId: req.params.id } });
        if (!products.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Produktów ze Statusem o Id ${req.params.id}.` });
        return res.json(products);
    },
    
    getByCategoryId: async (req, res) => {
        const products = await Product.findAll({ where: { CategoryId: req.params.id } });
        if (!products.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Produktów z Kategorii o Id ${req.params.id}.` });
        return res.json(products);
    },
}