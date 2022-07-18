const { OrderDetails } = require("../db/models")

module.exports = {
    // get all OrderDetails
    getAll: async (req, res) => {
        const orderDetails = await OrderDetails.findAll();
        res.json(orderDetails);
    },
    // get OrderDetails /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const orderDetails = await OrderDetails.findByPk(id);
        res.json(orderDetails);
    }
}