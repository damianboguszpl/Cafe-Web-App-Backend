const { UserCoupon } = require("../db/models")

module.exports = {
    // get all UserCoupons
    getAll: async (req, res) => {
        const userCoupons = await UserCoupon.findAll();
        res.json(userCoupons);
    },
    // get UserCoupon /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const userCoupon = await UserCoupon.findByPk(id);
        res.json(userCoupon);
    }
}