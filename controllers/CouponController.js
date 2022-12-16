const { Coupon, Product } = require("../db/models")
var randomstring = require("randomstring");

module.exports = {
    create: async (req,res) => {
        const coupon = req.body;
        
        if (!req?.body?.ProductId)
            return res.status(400).json({ 'error': 'Atrybut ProductId nie został określony' });
        const product = await Product.findByPk(req?.body?.ProductId);
        if (!product)
            return res.status(404).json({ 'error': `Nie znaleziono produktu o ID ${req?.body?.ProductId}.` });
        const existstingCouponForProduct = await Coupon.findOne({ where: { ProductId: req.body.ProductId } });
        if(existstingCouponForProduct != null && existstingCouponForProduct.isAvailable === true) 
            return res.status(400).json({ 'error': `Istnieje już aktywny kupon na produkt o ID ${req?.body?.ProductId}` });
        if(req.body.value < 5 || req.body.value > 100) 
            return res.status(400).json({ 'error': `Wartość kuponu jest niepoprawna` });
        
        await Coupon.create({
            name: req?.body?.name ? req.body.name : product.name + " -" + req?.body?.value + "%",
            value: req?.body?.value ? req.body.value : 0,
            pointPrice: req?.body?.pointPrice ? req.body.pointPrice : 100,
            isAvailable: req?.body?.isAvailable ? req.body.isAvailable : 1,
            ProductId: req.body.ProductId
        });
        return res.status(201).json({ 'message' : `Dodano nowy kupon`});
    },
    
    update: async (req,res) => {
        const coupon = await Coupon.findOne({ where: { id: req.params.id } });
        if(!coupon)
            return res.status(404).json({ 'message': `No coupon matching ID ${req.params.id} has been found.` });
        var product = null;
        if(req?.body?.ProductId){
            product = await Product.findByPk(req.body.ProductId);
            if (!product)
                return res.status(404).json({ 'message': `No Product matching ID ${req?.body?.ProductId} has been found.` });
        }

        var newIsAvailable = null;
        var newProductId = null;
        if(req?.body?.isAvailable === false) {
            newIsAvailable = false;
        }

        const existstingCouponsForProduct = await Coupon.findAll({ where: { ProductId: req.body.ProductId } });
        if(existstingCouponsForProduct != null && existstingCouponsForProduct.length) {
            if(existstingCouponsForProduct.some(e => e.isAvailable === true && e.id !== coupon.id)) {
                if (req?.body?.isAvailable === true) {
                    return res.status(400).json({ 'error': `Istnieje już aktywny kupon na produkt o ID ${req.body.ProductId}` });
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

        return res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        const coupon = await Coupon.findOne({ where: { id: req.params.id } });
        if(!coupon)
            return res.status(404).json({ 'message': `No coupon matching ID ${req.params.id} has been found.` });
        await Coupon.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const coupons = await Coupon.findAll();
        if (!coupons.length) 
            return res.status(204).json({ 'message': 'No coupons found.' });
        res.json(coupons);
    },
    
    getById: async (req, res) => {
        const coupon = await Coupon.findByPk(req.params.id);
        if(!coupon)
            return res.status(204).json({ 'message': `No coupon matching ID ${req.params.id} has been found.` });
        res.json(coupon);
    },
    
    getByProductId: async (req, res) => {
        const coupons = await Coupon.findAll({ where: { ProductId: req.params.id } });
        if (!coupons.length)
            return res.status(204).json({ 'message': `No coupons matching ProductId ${req.params.id} have been found.` });
        res.json(coupons);
    },
    
    getAvailable: async (req, res) => {
        const coupons = await Coupon.findAll({where: { isAvailable: true }})
        if (!coupons.length)
            return res.status(204).json({ 'message': `No available coupons have been found.` });
        res.json(coupons)
    },
    
    getUnavailable: async (req, res) => {
        const coupons = await Coupon.findAll({where: { isAvailable: false }})
        if (!coupons.length)
            return res.status(204).json({ 'message': `No unavailable coupons have been found.` });
        res.json(coupons)
    }
}