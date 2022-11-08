const { Payment, OrderHeader } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const payment = await Payment.findOne({ where: { name: req.body.name } });
        if(payment)
            return res.status(204).json({ 'message': 'Payment with same Name already exists.' });
        const newPayment = req.body;
        await Payment.create(newPayment);
        res.json(newPayment);
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const payment = await Payment.findOne({ where: { id: req.params.id } });
        if(!payment)
            return res.status(204).json({ 'message': `No Payment matching Id ${req.params.id} has been found.` });
        await Payment.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
        );
        res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        const payment = await Payment.findOne({ where: { id: req.params.id } });
        if(!payment)
            return res.status(204).json({ 'message': `No Payment matching Id ${req.params.id} has been found.` });
        const anyOrderHeader = await OrderHeader.findOne({ where: { PaymentId: req.params.id } });
        if(anyOrderHeader)
            return res.status(204).json({ 'message': 'Payment you tried to delete is used by at least 1 OrderHeader.' });
        await Payment.destroy({
            where: { id: req.params.id } }
        );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const payments = await Payment.findAll();
        if (!payments.length) 
            return res.status(204).json({ 'message': 'No Payments found.' });
        res.json(payments);
    },
    
    getById: async (req, res) => {
        const payment = await Payment.findOne({ where: { id: req.params.id } });
        if(!payment)
            return res.status(204).json({ 'message': `No Payment matching Id ${req.params.id} has been found.` });
        res.json(payment);
    },
    
    getByName: async (req, res) => {
        const payment = await Payment.findOne({ where: { name: req.params.name } });
        if(!payment)
            return res.status(204).json({ 'message': `No Payment matching Name '${req.params.name}' has been found.` });
        res.json(payment);
    },
}