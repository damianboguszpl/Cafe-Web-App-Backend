const { SpecialOffer } = require("../db/models")

module.exports = {
    create: async (req, res) => {
        const specialOffer = req.body;
        await SpecialOffer.create(specialOffer);
        res.json(specialOffer);
    },
    
    update: async (req, res) => {
        const id = req.params.id;
        const updated = await SpecialOffer.update(
            {
                value: req.body.value,
                start_date: req.body.start_date,
                end_date: req.body.end_date
            },
            { where: { id: id } }
        );

        res.json({'message' : `Zaktualizowano promocję.`});
    },
    
    delete: async (req, res) => {
        const id = req.params.id;
        await SpecialOffer.destroy(
            { where: { id: id } }
        );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll();
        res.json(specialOffers);
    },
    
    getById: async (req, res) => {
        const id = req.params.id
        const specialOffer = await SpecialOffer.findByPk(id);
        res.json(specialOffer);
    },
    
    getByProductId: async (req, res) => {
        const orderDetails = await SpecialOffer.findAll({ where: { ProductId: req.params.id } });
        res.json(orderDetails);
    },
    
    getAvailable: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll({ where: { is_available: true } })
        res.json(specialOffers)
    },
    
    getUnavailable: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll({ where: { is_available: false } })
        res.json(specialOffers)
    },
}