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
    }
}