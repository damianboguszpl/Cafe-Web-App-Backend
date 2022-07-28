const { UserCoupon } = require("../db/models")

module.exports = {
    // create new UserCoupon
    create: async (req,res) => {
        const userCoupon = req.body;
        await UserCoupon.create(userCoupon);
        res.json(userCoupon);
    },
    // update UserCoupon
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await UserCoupon.update(
            { 
                is_available: req.body.is_available,
                expiration_date: req.body.expiration_date,
                CouponId: req.body.CouponId,
                UserId: req.body.UserId
            }, 
            {
            where: {
                id: id
            }
            });

        res.json("Updated successfully.");
    },
    // delete UserCoupon
    delete: async (req,res) => {
        const id = req.params.id;
        await UserCoupon.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
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