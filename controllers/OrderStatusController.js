const { OrderStatus } = require("../db/models")

module.exports = {
    // get all OrderStatuses
    getAll: async (req, res) => {
        const orderStatuses = await OrderStatus.findAll();
        res.json(orderStatuses);
    },
    // get OrderStatus /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const orderStatus = await OrderStatus.findByPk(id);
        res.json(orderStatus);
    },
    // get OrderStatus by name
    getByName: async (req, res) => {
        const name = req.params.name
        const orderStatus = await OrderStatus.findOne({ where: { name: name } });
        res.json(orderStatus);
    },
}