const { SpecialOffer } = require("../db/models")

module.exports = {
    // get all SpecialOffers
    getAll: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll();
        res.json(specialOffers);
    },
    // get SpecialOffer /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const specialOffer = await SpecialOffer.findByPk(id);
        res.json(specialOffer);
    },
    // get specialOffers by ProductId
    getByProductId: async (req, res) => {
        const productid = req.params.productid
        const orderDetails = await SpecialOffer.findAll({ where: { ProductId: productid } });
        res.json(orderDetails);
    },
    // get available SpecialOffers
    getAvailable: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll({where: { is_available: true }})
        res.json(specialOffers)
    },
    // get unavailable SpecialOffers
    getUnavailable: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll({where: { is_available: false }})
        res.json(specialOffers)
    },
}