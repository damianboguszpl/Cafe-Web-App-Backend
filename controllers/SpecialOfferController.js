const { SpecialOffer } = require("../db/models")

module.exports = {
    // create new SpecialOffer
    create: async (req,res) => {
        const specialOffer = req.body;
        await SpecialOffer.create(specialOffer);
        res.json(specialOffer);
    },
    // update SpecialOffer
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await SpecialOffer.update(
            { 
                is_available: req.body.is_available,
                value: req.body.value,
                start_date: req.body.start_date,
                end_date: req.body.end_date
            }, 
            {
            where: {
                id: id
            }
            });

        res.json("Updated successfully.");
    },
    // delete SpecialOffer
    delete: async (req,res) => {
        const id = req.params.id;
        await SpecialOffer.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
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