const { Coupon } = require("../db/models")

module.exports = {
    // get all Coupons
    getAll: async (req, res) => {
        const coupons = await Coupon.findAll();
        res.json(coupons);
    },
    // get Coupon /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const coupon = await Coupon.findByPk(id);
        res.json(coupon);
    },
    // get Coupon by name
    getByName: async (req, res) => {
        const name = req.params.name
        const coupon = await Coupon.findOne({ where: { name: name } });
        res.json(coupon);
    },
    // get Coupons by ProductId
    getByProductId: async (req, res) => {
        const productid = req.params.productid
        const coupons = await Coupon.findAll({ where: { ProductId: productid } });
        res.json(coupons);
    },
    // get available Coupons
    getAvailable: async (req, res) => {
        const coupons = await Coupon.findAll({where: { is_available: true }})
        res.json(coupons)
    },
    // get unavailable Coupons
    getUnavailable: async (req, res) => {
        const coupons = await Coupon.findAll({where: { is_available: false }})
        res.json(coupons)
    }
}