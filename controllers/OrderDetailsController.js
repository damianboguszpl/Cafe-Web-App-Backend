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
    },
    // get OrderDetails by ProductId
    getByProductId: async (req, res) => {
        const productid = req.params.productid
        const orderDetails = await OrderDetails.findAll({ where: { ProductId: productid } });
        res.json(orderDetails);
    },
    // get OrderDetails by OrderHeaderId
    getByOrderHeaderId: async (req, res) => {
        const orderheaderid = req.params.orderheaderid
        const orderDetails = await OrderDetails.findAll({ where: { OrderHeaderId: orderheaderid } });
        res.json(orderDetails);
    },
}