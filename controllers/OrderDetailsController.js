const { OrderDetails } = require("../db/models")

module.exports = {
    // create new OrderDetails
    create: async (req,res) => {
        const orderDetails = req.body;
        await OrderDetails.create(orderDetails);
        res.json(orderDetails);
    },
    // update OrderDetails
    update: async (req,res) => {
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
    delete: async (req,res) => {
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