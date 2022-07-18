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
    }
}