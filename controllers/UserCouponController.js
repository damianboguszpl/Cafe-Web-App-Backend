const { UserCoupon, User, Coupon, UserCouponStatus } = require("../db/models")
var randomstring = require("randomstring");

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.CouponId)
            return res.status(400).json({ 'message': 'Nie podano Id Kuponu.' });
        if (!req?.body?.UserId)
            return res.status(400).json({ 'message': 'Nie podano Id Użytkownika.' });
        if (!req?.body?.UserCouponStatusId)
            return res.status(400).json({ 'message': 'Nie podano Id Statusu Kuponów Użytkowników.' });
        if (!req?.body?.expiration_date)
            return res.status(400).json({ 'message': 'Nie podano daty wygaśnięcia.' });

        const user = await User.findByPk(req?.body?.UserId);
        if (!user)
            return res.status(404).json({ 'message': `Nie znaleziono Użytkownika o Id ${req?.body?.UserId}.` });
        const coupon = await Coupon.findByPk(req?.body?.CouponId);
        if (!coupon)
            return res.status(404).json({ 'message': `Nie znaleziono Kuponu o Id ${req?.body?.CouponId}.` });
        const userCouponStatus = await UserCouponStatus.findByPk(req?.body?.UserCouponStatusId);
        if (!userCouponStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Kuponów Użytkowników o Id ${req?.body?.UserCouponStatusId}.` });
     
        if(coupon.isAvailable === false)
            return res.status(404).json({ 'message': `Kupon o Id ${req?.body?.CouponId} nie jest dostępny.` });
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
    
    update: async (req,res) => {
        if (!req?.body?.expiration_date && !req?.body?.CouponId && !req?.body?.UserId && !req?.body?.UserCouponStatusId)
            return res.status(400).json({ 'message': 'Nie podano wymaganych danych.' });
        
        if(req?.body?.CouponId && req?.body?.CouponId != null) {
            const coupon = await Coupon.findByPk(req?.body?.CouponId);
            if(!coupon)
                return res.status(404).json({ 'message': `Nie znaleziono Kuponu o Id ${req?.body?.CouponId}.` });
        }
        if(req?.body?.UserId && req?.body?.UserId != null) {
            const user = await User.findByPk(req?.body?.UserId);
            if(!user)
                return res.status(404).json({ 'message': `Nie znaleziono Użytkownika o Id ${req?.body?.UserId}.` });
        }
        if(req?.body?.UserCouponStatusId && req?.body?.UserCouponStatusId != null) {
            const userCouponStatus = await UserCouponStatus.findByPk(req?.body?.UserCouponStatusId);
            if(!userCouponStatus)
                return res.status(404).json({ 'message': `Nie znaleziono Statusu Kuponów Użytkowników o Id ${req?.body?.UserCouponStatusId}.` });
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

        res.json({'mesage': `Zaktualizowano Kupon Użytkownika.`});
    },
    
    delete: async (req,res) => {
        // await UserCoupon.destroy({
        //     where: {
        //         id: req.params.id
        //     }
        // })
        // res.json("Deleted successfully.");
        res.status(400).json({'error': `Kupon Użytkownika nie może zostać usunięty.`})
    },
    // get all UserCoupons
    getAll: async (req, res) => {
        const userCoupons = await UserCoupon.findAll();
        if (!userCoupons.length)
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Kuponów Użytkowników.' });
        res.json(userCoupons);
    },
    
    getById: async (req, res) => {
        const userCoupon = await UserCoupon.findByPk(req.params.id);
        if(!userCoupon)
            return res.status(404).json({ 'message': `Nie znaleziono Kuponu Użytkownika o Id ${req.params.id}.` });
        
        // Client can get only his own usercoupon's data
        if(req.RoleId === 1) {
            const client = await User.findOne({ where: { id: userCoupon.UserId }, attributes: ['id', 'email'] });
            if (client != null) {
                if (client.email !== req.user) {
                    return res.status(401).json({ 'error': `Unauthorized`});
                }
            }
        }
        return res.json(userCoupon);
    },

    getByCode: async (req, res) => {
        const userCoupon = await UserCoupon.findOne({ where: { code: req.params.code } });
        if(!userCoupon)
            return res.status(404).json({ 'message': `Nie znaleziono Kuponu uzytkownika o kodzie '${req.params.code}'.` });
        
            // Client can get only his own usercoupon's data
        if(req.RoleId === 1) {
            const client = await User.findOne({ where: { id: userCoupon.UserId }, attributes: ['id', 'email'] });
            if (client != null) {
                if (client.email !== req.user) {
                    return res.status(401).json({ 'error': `Unauthorized`});
                }
            }
        }
        return res.json(userCoupon);
    },
    
    getByUserId: async (req, res) => {
        const usercoupons = await UserCoupon.findAll({ where: { UserId: req.params.id } });
        if (!usercoupons.length)
            return res.status(404).json({ 'message': `Nie znaleziono Kuponów Użytkownika Użytkownika o Id ${req.params.UserId}.` });
        res.json(usercoupons);
    },
    
    getByCouponId: async (req, res) => {
        const usercoupons = await UserCoupon.findAll({ where: { CouponId: req.params.id } });
        if (!usercoupons.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Kuponów Użytkownika powiązanych z Kuponem o Id ${req.params.CouponId}.` });
        res.json(usercoupons);
    },
    
    getByUserCouponStatusId: async (req, res) => {
        const usercoupons = await UserCoupon.findAll({ where: { UserCouponStatusId: req.params.id } });
        if (!usercoupons.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Kuponów Użytkowników ze Statusem Kuponów Użytkowników o Id ${req.params.UserCouponStatusId}.` });
        res.json(usercoupons);
    },
}