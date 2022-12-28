const { Coupon, Product } = require("../db/models")
var randomstring = require("randomstring");

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.ProductId)
            return res.status(400).json({ 'error': 'Nie podano Id Produktu.' });
        const product = await Product.findByPk(req?.body?.ProductId);
        if (!product)
            return res.status(404).json({ 'error': `Nie znaleziono Produktu o Id ${req?.body?.ProductId}.` });
        const existstingCouponForProduct = await Coupon.findOne({ where: { ProductId: req.body.ProductId } });
        if(existstingCouponForProduct != null && existstingCouponForProduct.isAvailable === true) 
            return res.status(400).json({ 'error': `Istnieje już aktywny Kupon na Produkt o Id ${req?.body?.ProductId}` });
        if(req.body.value < 5 || req.body.value > 100) 
            return res.status(400).json({ 'error': `Wartość Kuponu jest niepoprawna` });
        
        await Coupon.create({
            name: req?.body?.name ? req.body.name : product.name + " -" + req?.body?.value + "%",
            value: req?.body?.value ? req.body.value : 0,
            pointPrice: req?.body?.pointPrice ? req.body.pointPrice : 100,
            isAvailable: req?.body?.isAvailable ? req.body.isAvailable : 1,
            ProductId: req.body.ProductId
        });
        return res.status(201).json({ 'message': `Dodano nowy Kupon.`});
    },
    
    update: async (req,res) => {
        const coupon = await Coupon.findOne({ where: { id: req.params.id } });
        if(!coupon)
            return res.status(404).json({ 'message': `Nie znaleziono Kuponu o Id ${req.params.id}.` });
        var product = null;
        if(req?.body?.ProductId){
            product = await Product.findByPk(req.body.ProductId);
            if (!product)
                return res.status(404).json({ 'message': `Nie znaleziono Produktu o Id ${req?.body?.ProductId}.` });
        }

        var newIsAvailable = null;
        var newProductId = null;
        if(req?.body?.isAvailable === false) {
            newIsAvailable = false;
        }

        const existstingCouponsForProduct = await Coupon.findAll({ where: { ProductId: req.body.ProductId } });
        if(existstingCouponsForProduct != null && existstingCouponsForProduct.length) {
            if(existstingCouponsForProduct.some(e => e.isAvailable === true && e.id !== coupon.id)) {
                if (req?.body?.isAvailable === 'true') {
                    return res.status(400).json({ 'error': `Istnieje już aktywny Kupon na Produkt '${product.name}'.` });
                }
                else {
                    newIsAvailable = false;
                    newProductId = req.body.ProductId;
                }  
            }
            else {
                newIsAvailable = req?.body?.isAvailable;
                newProductId = req.body.ProductId;
            }
        }
        else {
            if (req?.body?.isAvailable === true)
                newIsAvailable = true;
            newProductId = req.body.ProductId;
        }

        await Coupon.update(
            { 
                name: req?.body?.name ? req.body.name : product.name + " -" + req?.body?.value + "%",
                value: req?.body?.value !== coupon.value ? req.body.value : coupon.value,
                pointPrice: req?.body?.pointPrice !== coupon.pointPrice ? req.body.pointPrice : coupon.pointPrice,
                isAvailable: newIsAvailable !== null ? newIsAvailable : coupon.isAvailable,
                ProductId: newProductId !== null ? newProductId : coupon.ProductId
            }, 
            { where: { id: req.params.id } }
        );

        return res.json({'message': `Zaktualizowano Kupon.`});
    },
    
    delete: async (req,res) => {
        const coupon = await Coupon.findOne({ where: { id: req.params.id } });
        if(!coupon)
            return res.status(404).json({ 'message': `Nie znaleziono Kuponu o Id ${req.params.id}.` });
        await Coupon.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.json({'message': 'Usunięto Kupon.'});
    },
    
    getAll: async (req, res) => {
        const coupons = await Coupon.findAll();
        if (!coupons.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnego Kuponu.' });
        return res.json(coupons);
    },
    
    getById: async (req, res) => {
        const coupon = await Coupon.findByPk(req.params.id);
        if(!coupon)
            return res.status(404).json({ 'message': `Nie znaleziono Kuponu o Id ${req.params.id}.` });
        return res.json(coupon);
    },
    
    getByProductId: async (req, res) => {
        const coupons = await Coupon.findAll({ where: { ProductId: req.params.id } });
        if (!coupons.length)
            return res.status(404).json({ 'message': `Nie znaleziono Kuponu na Produkt o Id ${req.params.id}.` });
        return res.json(coupons);
    },
    
    getAvailable: async (req, res) => {
        const coupons = await Coupon.findAll({
            where: { isAvailable: true },
            include: [{
                model: Product,
                attributes: ['id', 'name', 'size', 'price', 'allergen', 'CategoryId', 'ProductStatusId']
            }],
        })
        if (!coupons.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych dostępnych Kuponów.` });
        return res.json(coupons)
    },
    
    getUnavailable: async (req, res) => {
        const coupons = await Coupon.findAll({where: { isAvailable: false }})
        if (!coupons.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych niedostępnych Kuponów.` });
        return res.json(coupons)
    }
}
