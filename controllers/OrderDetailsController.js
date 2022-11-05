const { OrderDetails, OrderHeader, Product } = require("../db/models")
const { updateOrderFinalPrice } = require("./utils/updateOrderFinalPrice")

module.exports = {
    // create new OrderDetails
    create: async (req, res) => {
        if (!req?.body?.transaction_price)
            return res.status(400).json({ 'message': 'transaction_price parameter not specified.' });
        if (!req?.body?.quantity)
            return res.status(400).json({ 'message': 'quantity parameter not specified.' });
        if (!req?.body?.OrderHeaderId)
            return res.status(400).json({ 'message': 'OrderHeaderId parameter not specified.' });
        if (!req?.body?.ProductId)
            return res.status(400).json({ 'message': 'ProductId parameter not specified.' });

        const orderDetail = req.body;
        const existstingItem = await OrderDetails.findOne({ 
            where: { OrderHeaderId: orderDetail.OrderHeaderId, ProductId: orderDetail.ProductId } });
        if (!existstingItem) {
            await OrderDetails.create(orderDetail);
        }
        else {
            await OrderDetails.update(
                {
                    transaction_price: req.body.transaction_price,
                    quantity: existstingItem.quantity + req.body.quantity,
                    OrderHeaderId: req.body.OrderHeaderId,
                    ProductId: req.body.ProductId
                },
                {
                    where: {
                        id: existstingItem.id
                    }
            });
        }
        updateOrderFinalPrice(req.body.OrderHeaderId);
        res.json(orderDetail);
    },
    // update OrderDetails
    update: async (req, res) => {
        const orderDetail = await OrderDetails.findByPk(req.params.id);
        if(!orderDetail)
            return res.status(404).json({ 'message': `No OrderDetails matching ID ${req.params.id} has been found.` });
        
        if (!req?.body?.transaction_price && !req?.body?.quantity && !req?.body?.OrderHeaderId && !req?.body?.ProductId) 
            return res.status(400).json({ 'message': 'None of required parameters passed.' });
        else {
            await OrderDetails.update(
                {   transaction_price: req?.body?.transaction_price ? req.body.transaction_price : this.transaction_price,
                    quantity: req?.body?.quantity ? req.body.quantity : this.quantity ,
                    OrderHeaderId: req?.body?.OrderHeaderId ? req.body.OrderHeaderId : this.OrderHeaderId,
                    ProductId: req?.body?.ProductId ? req.body.ProductId : this.ProductId },
                { where: { id: req.params.id } }
            );
            const orderDetails = await OrderDetails.findByPk(req.params.id);
            updateOrderFinalPrice(orderDetails.OrderHeaderId);
            res.json("Updated successfully.");
        }
    },
    // delete OrderDetails
    delete: async (req, res) => {
        const orderDetail = await OrderDetails.findByPk(id);
        if(!orderDetail)
            return res.status(404).json({ 'message': `No OrderDetails matching ID ${req.params.id} has been found.` });
        else {
            const orderHeaderId = orderDetail.OrderHeaderId;
            await OrderDetails.destroy({
                where: {
                    id: req.params.id
                }
            })
            updateOrderFinalPrice(orderHeaderId);
            res.json("Deleted successfully.");
        }
    },
    // get all OrderDetails
    getAll: async (req, res) => {
        const orderDetails = await OrderDetails.findAll();
        res.json(orderDetails);
    },
    // get OrderDetails /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        // const orderDetails = await OrderDetails.findByPk(id);
        const orderDetails = await OrderDetails.findOne({ where: { id: id } });
        // if(!orderDetails)
        //     return res.status(404).json({ 'message': `No OrderDetails matching ID ${req.params.id} has been found.` });
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