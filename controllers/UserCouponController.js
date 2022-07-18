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
    },
    // get UserCoupons by UserId
    getByUserId: async (req, res) => {
        const userid = req.params.userid
        const usercoupons = await Reservation.findOne({ where: { UserId: userid } });
        res.json(usercoupons);
    },
    // get UserCoupons by CouponId
    getByCouponId: async (req, res) => {
        const couponid = req.params.couponid
        const usercoupons = await Reservation.findOne({ where: { CouponId: couponid } });
        res.json(usercoupons);
    },
}