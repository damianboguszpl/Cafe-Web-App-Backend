const { Coupon } = require("../db/models")

module.exports = {
    // create new Coupon
    create: async (req,res) => {
        const coupon = req.body;
        await Coupon.create(coupon);
        res.json(coupon);
    },
    // update Coupon
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await Coupon.update(
            { 
                name: req.body.name,
                value: req.body.value,
                point_price: req.body.point_price,
                is_available: req.body.is_available,
                ProductId: req.body.ProductId
            }, 
            {
            where: {
                id: id
            }
            });

        res.json("Updated successfully.");
    },
    // delete Coupon
    delete: async (req,res) => {
        const id = req.params.id;
        await Coupon.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
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