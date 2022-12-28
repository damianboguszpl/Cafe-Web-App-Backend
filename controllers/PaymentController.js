const { Payment, OrderHeader } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const payment = await Payment.findOne({ where: { name: req.body.name } });
        if(payment)
            return res.status(400).json({ 'message': 'Istnieje już Płatność o podanej nazwie.' });
        
        const newPayment = await Payment.create(req.body);
        return res.status(201).json({ 'message': `Dodano nową Płatność.`, 'data': newPayment});
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const payment = await Payment.findOne({ where: { id: req.params.id } });
        if(!payment)
            return res.status(404).json({ 'message': `Nie znaleziono Płatności o Id ${req.params.id}.` });
        await Payment.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
        );
        return res.json({'message': `Zaktualizowano Płatność.`});
    },
    
    delete: async (req,res) => {
        const payment = await Payment.findOne({ where: { id: req.params.id } });
        if(!payment)
            return res.status(404).json({ 'message': `Nie znaleziono Płatności o Id ${req.params.id}.` });
        const anyOrderHeader = await OrderHeader.findOne({ where: { PaymentId: req.params.id } });
        if(anyOrderHeader)
            return res.status(400).json({ 'message': 'Płatność, którą chciałeś usunąć, przypisana jest do co najmniej 1 Zamówienia.' });
        await Payment.destroy({
            where: { id: req.params.id } }
        );
        return res.json({'message': `Usunięto Płatność.`});
    },
    
    getAll: async (req, res) => {
        const payments = await Payment.findAll();
        if (!payments.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Płatności.' });
        return res.json(payments);
    },
    
    getById: async (req, res) => {
        const payment = await Payment.findOne({ where: { id: req.params.id } });
        if(!payment)
            return res.status(404).json({ 'message': `Nie znaleziono Płatności o Id ${req.params.id}.` });
        return res.json(payment);
    },
    
    getByName: async (req, res) => {
        const payment = await Payment.findOne({ where: { name: req.params.name } });
        if(!payment)
            return res.status(404).json({ 'message': `Nie znaleziono Płatności o nazwie '${req.params.name}'.` });
        return res.json(payment);
    },
}