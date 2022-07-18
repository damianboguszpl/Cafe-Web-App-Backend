const { OrderHeader } = require("../db/models")

module.exports = {
    // get all OrderHeaders
    getAll: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll();
        res.json(orderHeaders);
    },
    // get Category /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const orderHeader = await OrderHeader.findByPk(id);
        res.json(orderHeader);
    }
}