const { OrderDetails, Product } = require("../db/models")

module.exports = {
    // create new OrderDetails
    create: async (req, res) => {
        const orderDetails = req.body;
        await OrderDetails.create(orderDetails);
        res.json(orderDetails);
    },
    // update OrderDetails
    update: async (req, res) => {
        if (!req?.body?.transaction_price) {
            return res.status(400).json({ 'message': 'transaction_price parameter not specified.' });
        }
        if (!req?.body?.quantity) {
            return res.status(400).json({ 'message': 'quantity parameter not specified.' });
        }
        if (!req?.body?.OrderHeaderId) {
            return res.status(400).json({ 'message': 'OrderHeaderId parameter not specified.' });
        }
        if (!req?.body?.ProductId) {
            return res.status(400).json({ 'message': 'ProductId parameter not specified.' });
        }

        const id = req.params.id;
        const updated = await OrderDetails.update(
            {
                transaction_price: req.body.transaction_price,
                quantity: req.body.quantity,
                OrderHeaderId: req.body.OrderHeaderId,
                ProductId: req.body.ProductId
            },
            {
                where: {
                    id: id
                }
            });

        res.json("Updated successfully.");
    },
    // delete OrderDetails
    delete: async (req, res) => {
        const id = req.params.id;
        await OrderDetails.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
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
        const id = req.params.id
        const orderDetails = await OrderDetails.findAll({ where: { ProductId: id } });
        res.json(orderDetails);
    },
    // get OrderDetails by OrderHeaderId
    getByOrderHeaderId: async (req, res) => {
        const orderheaderid = req.params.id
        const orderDetails = await OrderDetails.findAll({ 
            include: [{
                model: Product,
                attributes: [['name', 'name']]
              }],
            where: { OrderHeaderId: orderheaderid } });
        res.json(orderDetails);
    },
}