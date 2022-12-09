const { UserCoupon, User, Coupon, UserCouponStatus } = require("../db/models")
var randomstring = require("randomstring");

module.exports = {
    // create new UserCoupon
    create: async (req,res) => {
        if (!req?.body?.CouponId)
            return res.status(400).json({ 'message': 'CouponId parameter not specified.' });
        if (!req?.body?.UserId)
            return res.status(400).json({ 'message': 'UserId parameter not specified.' });
        if (!req?.body?.UserCouponStatusId)
            return res.status(400).json({ 'message': 'UserCouponStatusId parameter not specified.' });
        if (!req?.body?.expiration_date)
            return res.status(400).json({ 'message': 'Expiration_date parameter not specified.' });

        const user = await User.findByPk(req?.body?.UserId);
        if (!user)
            return res.status(404).json({ 'message': `No User matching ID ${req?.body?.UserId} has been found.` });
        const coupon = await Coupon.findByPk(req?.body?.CouponId);
        if (!coupon)
            return res.status(404).json({ 'message': `No Coupon matching ID ${req?.body?.CouponId} has been found.` });
        const userCouponStatus = await UserCouponStatus.findByPk(req?.body?.UserCouponStatusId);
        if (!userCouponStatus)
            return res.status(404).json({ 'message': `No userCouponStatus matching ID ${req?.body?.UserCouponStatusId} has been found.` });
     
        if(coupon.isAvailable === false)
            return res.status(404).json({ 'message': `Kupon z ID ${req?.body?.CouponId} nie jest dostępny.` });
        if(user.points >= coupon.pointPrice) {
            var codeOk = 0;
            var code = 0;
            while (codeOk != 1) {   // generating unique code for a new Coupon
                code = randomstring.generate({
                    length: 6,
                    charset: 'numeric'
                });
                const existstingUserCoupon = UserCoupon.findOne({ where: { code: code } });
                if(existstingUserCoupon != null)
                    codeOk = 1;
            }
            
            const userCoupon = await UserCoupon.create({
                code: code,
                expiration_date: req.body.expiration_date,
                CouponId: req.body.CouponId,
                UserId: req.body.UserId,
                UserCouponStatusId: req.body.UserCouponStatusId
            });

            await User.update({
                points: user.points - coupon.pointPrice
            },
            { where: { id: user.id } });

            return res.json(userCoupon);
            
        }
        else {
            return res.status(400).json({ 'error': 'Użytkownik nie ma wystarczającej liczby punktów.' });
        }
    },
    // update UserCoupon
    update: async (req,res) => {
        if (!req?.body?.expiration_date && !req?.body?.CouponId && !req?.body?.UserId && !req?.body?.UserCouponStatusId)
            return res.status(400).json({ 'message': 'None of the required parameters were passed.' });
        
        if(req?.body?.CouponId && req?.body?.CouponId != null) {
            const coupon = await Coupon.findByPk(req?.body?.CouponId);
            if(!coupon)
                return res.status(404).json({ 'message': `No Coupon matching Id ${req?.body?.CouponId} has been found.` });
        }
        if(req?.body?.UserId && req?.body?.UserId != null) {
            const user = await User.findByPk(req?.body?.UserId);
            if(!user)
                return res.status(404).json({ 'message': `No User matching Id ${req?.body?.UserId} has been found.` });
        }
        if(req?.body?.UserCouponStatusId && req?.body?.UserCouponStatusId != null) {
            const userCouponStatus = await UserCouponStatus.findByPk(req?.body?.UserCouponStatusId);
            if(!userCouponStatus)
                return res.status(404).json({ 'message': `No User matching Id ${req?.body?.UserCouponStatusId} has been found.` });
        }

        await UserCoupon.update(
            {
                expiration_date: req?.body?.expiration_date ? req.body.expiration_date : this.expiration_date,
                CouponId: req?.body?.CouponId ? req.body.CouponId : this.CouponId,
                UserId: req?.body?.UserId ? req.body.UserId : this.UserId,
                UserCouponStatusId: req?.body?.UserCouponStatusId ? req.body.UserCouponStatusId : this.UserCouponStatusId
            }, 
            { where: { id: req.params.id }}
        );

        res.json("Updated successfully.");
    },
    // delete UserCoupon
    delete: async (req,res) => {
        // await UserCoupon.destroy({
        //     where: {
        //         id: req.params.id
        //     }
        // })
        // res.json("Deleted successfully.");
        res.status(400).json("UserCoupons can not be deleted")
    },
    // get all UserCoupons
    getAll: async (req, res) => {
        const userCoupons = await UserCoupon.findAll();
        if (!userCoupons.length)
            return res.status(204).json({ 'message': 'No UserCoupons found.' });
        res.json(userCoupons);
    },
    // get UserCoupon /w specific id
    getById: async (req, res) => {
        const userCoupon = await UserCoupon.findByPk(req.params.id);
        if(!userCoupon)
            return res.status(204).json({ 'message': `No UserCoupon matching Id ${req.params.id} has been found.` });
        res.json(userCoupon);
    },

    getByCode: async (req, res) => {
        const userCoupon = await UserCoupon.findOne({ where: { code: req.params.code } });
        if(!userCoupon)
            return res.status(204).json({ 'message': `No UserCoupon matching Code ${req.params.code} has been found.` });
        res.json(userCoupon);
    },
    // get UserCoupons by UserId
    getByUserId: async (req, res) => {
        const usercoupons = await UserCoupon.findAll({ where: { UserId: req.params.id } });
        if (!usercoupons.length)
            return res.status(204).json({ 'message': `No UserCoupons matching UserId ${req.params.UserId} have been found.` });
        res.json(usercoupons);
    },
    // get UserCoupons by CouponId
    getByCouponId: async (req, res) => {
        const usercoupons = await UserCoupon.findAll({ where: { CouponId: req.params.id } });
        if (!usercoupons.length)
            return res.status(204).json({ 'message': `No UserCoupons matching CouponId ${req.params.CouponId} have been found.` });
        res.json(usercoupons);
    },
    // get UserCoupons by UserCouponStatusId
    getByUserCouponStatusId: async (req, res) => {
        const usercoupons = await UserCoupon.findAll({ where: { UserCouponStatusId: req.params.id } });
        if (!usercoupons.length)
            return res.status(204).json({ 'message': `No UserCoupons matching UserCouponStatusId ${req.params.UserCouponStatusId} have been found.` });
        res.json(usercoupons);
    },
}