const { OrderDetails, OrderHeader, Product } = require("../db/models")
const { updateOrderFinalPrice } = require("./utils/updateOrderFinalPrice")

module.exports = {
    create: async (req, res) => {
        if (!req?.body?.transaction_price)
            return res.status(400).json({ 'message': 'transaction_price parameter not specified.' });
        if (!req?.body?.quantity)
            return res.status(400).json({ 'message': 'quantity parameter not specified.' });
        if (!req?.body?.OrderHeaderId)
            return res.status(400).json({ 'message': 'OrderHeaderId parameter not specified.' });
        if (!req?.body?.ProductId)
            return res.status(400).json({ 'message': 'ProductId parameter not specified.' });

        const orderHeader = await OrderHeader.findByPk(req?.body?.OrderHeaderId);
        if(!orderHeader)
            return res.status(404).json({ 'message': `No OrderHeader matching ID ${req?.body?.OrderHeaderId} has been found.` });
        const product = await Product.findByPk(req?.body?.ProductId);
        if(!product)
            return res.status(404).json({ 'message': `No Product matching ID ${req?.body?.ProductId} has been found.` });
            
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
                {  where: { id: existstingItem.id } }
            );
        }
        updateOrderFinalPrice(req.body.OrderHeaderId);
        res.json(orderDetail);
    },
    
    update: async (req, res) => {
        const orderDetail = await OrderDetails.findByPk(req.params.id);
        if(!orderDetail)
            return res.status(404).json({ 'message': `No OrderDetails matching ID ${req.params.id} has been found.` });
        
        if (!req?.body?.transaction_price && !req?.body?.quantity && !req?.body?.OrderHeaderId && !req?.body?.ProductId) 
            return res.status(400).json({ 'message': 'None of the required parameters were passed.' });
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
    
    delete: async (req, res) => {
        const orderDetail = await OrderDetails.findByPk(req.params.id);
        if(!orderDetail)
            return res.status(404).json({ 'message': `No OrderDetails matching ID ${req.params.id} has been found.` });
        else {
            const orderHeaderId = orderDetail.OrderHeaderId;
            await OrderDetails.destroy({
                where: { id: req.params.id } }
            );
            updateOrderFinalPrice(orderHeaderId);
            res.json("Deleted successfully.");
        }
    },
    
    getAll: async (req, res) => {
        const orderDetails = await OrderDetails.findAll();
        if (!orderDetails.length) 
            return res.status(204).json({ 'message': 'No OrderDetails found.' });
        res.json(orderDetails);
    },
    
    getById: async (req, res) => {
        const orderDetails = await OrderDetails.findOne({ where: { id: req.params.id } });
        if(!orderDetails)
            return res.status(204).json({ 'message': `No OrderDetails matching Id ${req.params.id} have been found.` });
        res.json(orderDetails);
    },
    
    getByProductId: async (req, res) => {
        const id = req.params.id
        const orderDetails = await OrderDetails.findAll({ where: { ProductId: id } });
        if(!orderDetails.length)
            return res.status(204).json({ 'message': `No OrderDetails matching ProductId ${req.params.id} have been found.` });
        res.json(orderDetails);
    },
    
    getByOrderHeaderId: async (req, res) => {
        const orderheaderid = req.params.id
        const orderDetails = await OrderDetails.findAll({ 
            include: [{
                model: Product,
                attributes: [['name', 'name']]
              }],
            where: { OrderHeaderId: orderheaderid } }
        );
        if(!orderDetails.length)
            return res.status(204).json({ 'message': `No OrderDetails matching OrderHeaderId ${req.params.id} have been found.` });
        res.json(orderDetails);
    },
}