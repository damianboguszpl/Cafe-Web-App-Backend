const { OrderStatus, OrderHeader } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const orderStatus = await OrderStatus.findOne({ where: { name: req.body.name } });
        if(orderStatus)
            return res.status(204).json({ 'message': 'OrderStatus with same Name already exists.' });
        const newOrderStatus = req.body;
        await OrderStatus.create(newOrderStatus);
        res.json(newOrderStatus);
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const orderStatus = await OrderStatus.findOne({ where: { id: req.params.id } });
        if(!orderStatus)
            return res.status(204).json({ 'message': `No OrderStatus matching Id ${req.params.id} has been found.` });
        await OrderStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
            );
        res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        const orderStatus = await OrderStatus.findOne({ where: { id: req.params.id } });
        if(!orderStatus)
            return res.status(204).json({ 'message': `No OrderStatus matching Id ${req.params.id} has been found.` });
        const anyOrderHeader = await OrderHeader.findOne({ where: { OrderStatusId: req.params.id } });
        if(anyOrderHeader)
            return res.status(204).json({ 'message': 'OrderStatus you tried to delete is used by at least 1 OrderHeader.' });
        await OrderStatus.destroy({
            where: { id: req.params.id } }
        );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const orderStatuses = await OrderStatus.findAll();
        if (!orderStatuses.length) 
            return res.status(204).json({ 'message': 'No OrderStatuses found.' });
        res.json(orderStatuses);
    },
    
    getById: async (req, res) => {
        const orderStatus = await OrderStatus.findOne({ where: { id: req.params.id } });
        if(!orderStatus)
            return res.status(204).json({ 'message': `No OrderStatus matching Id ${req.params.id} has been found.` });
        res.json(orderStatus);
    },
    
    getByName: async (req, res) => {
        const orderStatus = await OrderStatus.findOne({ where: { name: req.params.name } });
        if(!orderStatus)
            return res.status(204).json({ 'message': `No OrderStatus matching Name '${req.params.name}' has been found.` });
        res.json(orderStatus);
    },
}