const { Coupon, Product } = require("../db/models")
var randomstring = require("randomstring");

module.exports = {
    create: async (req,res) => {
        const coupon = req.body;
        
        if (!req?.body?.ProductId)
            return res.status(400).json({ 'message': 'ProductId parameter not specified.' });
        const product = await Product.findByPk(req?.body?.ProductId);
        if (!product)
            return res.status(404).json({ 'message': `No Product matching ID ${req?.body?.ProductId} has been found.` });
        const existstingCouponForProduct = await Coupon.findOne({ where: { ProductId: req.body.ProductId } });
        if(existstingCouponForProduct != null) 
            return res.status(400).json({ 'message': `There already exists coupon for a product with ID ${req?.body?.ProductId}` });

        var codeOk = 0;
        var code = 0;
        while (codeOk != 1) {   // generating unique code for a new Coupon
            code = randomstring.generate({
                length: 6,
                charset: 'numeric'
            });
            const existstingCoupon = Coupon.findOne({ where: { code: code } });
            if(existstingCoupon != null){
                
                codeOk = 1;
            }
        }
        
        await Coupon.create({
            name: req?.body?.name ? req.body.name : "",
            code: code,
            value: req?.body?.value ? req.body.value : 0,
            pointPrice: req?.body?.pointPrice ? req.body.pointPrice : 100,
            isAvailable: req?.body?.isAvailable ? req.body.isAvailable : 1,
            ProductId: req.body.ProductId
        });
        return res.json(coupon);
    },
    
    update: async (req,res) => {
        const coupon = await Coupon.findOne({ where: { id: req.params.id } });
        if(!coupon)
            return res.status(404).json({ 'message': `No coupon matching ID ${req.params.id} has been found.` });
        if(req?.body?.ProductId){
            const product = await Product.findByPk(req.body.ProductId);
            if (!product)
                return res.status(404).json({ 'message': `No Product matching ID ${req?.body?.ProductId} has been found.` });
        }

        await Coupon.update(
            { 
                name: req?.body?.name ? req.body.name : "",
                // code: req?.body?.code ? req.body.code : code,    shouldn't be updatable (?)
                value: req?.body?.value ? req.body.value : 0,
                pointPrice: req?.body?.pointPrice ? req.body.pointPrice : 100,
                isAvailable: req?.body?.isAvailable ? req.body.isAvailable : 1,
                ProductId: req.body.ProductId
            }, 
            {
            where: {
                id: req.params.id
            }
            });

        res.json("Updated successfully.");
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
    
    // getByName: async (req, res) => {
    //     const coupon = await Coupon.findOne({ where: { name: req.params.name } });
    //     if(!coupon)
    //         return res.status(204).json({ 'message': `No coupon matching Name '${req.params.name}' has been found.` });
    //     res.json(coupon);
    // },
    
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