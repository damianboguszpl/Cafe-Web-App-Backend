const { OrderStatus, OrderHeader } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const orderStatus = await OrderStatus.findOne({ where: { name: req.body.name } });
        if(orderStatus)
            return res.status(400).json({ 'message': 'Istnieje już Status Zamówień o podanej nazwie.' });
        
        const newOrderStatus = await OrderStatus.create(req.body);
        return res.status(201).json({ 'message': `Dodano nowy Status Zamówień.`, 'data': newOrderStatus});
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const orderStatus = await OrderStatus.findOne({ where: { id: req.params.id } });
        if(!orderStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Zamówień o Id ${req.params.id}.` });
        await OrderStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
            );
        res.json({'message': `Zaktualizowano Status Zamówień.`});
    },
    
    delete: async (req,res) => {
        const orderStatus = await OrderStatus.findOne({ where: { id: req.params.id } });
        if(!orderStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Zamówień o Id ${req.params.id}.` });
        const anyOrderHeader = await OrderHeader.findOne({ where: { OrderStatusId: req.params.id } });
        if(anyOrderHeader)
            return res.status(400).json({ 'message': 'Status Zamówień, który chcesz usunąć posiada co najmniej 1 Zamówienie.' });
        await OrderStatus.destroy({
            where: { id: req.params.id } }
        );
        res.json({'message': 'Usunięto Status Zamówień.'});
    },
    
    getAll: async (req, res) => {
        const orderStatuses = await OrderStatus.findAll();
        if (!orderStatuses.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Statusów Zamówień.' });
        res.json(orderStatuses);
    },
    
    getById: async (req, res) => {
        const orderStatus = await OrderStatus.findOne({ where: { id: req.params.id } });
        if(!orderStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Zamówień o Id ${req.params.id}.` });
        res.json(orderStatus);
    },
    
    getByName: async (req, res) => {
        const orderStatus = await OrderStatus.findOne({ where: { name: req.params.name } });
        if(!orderStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Zamówień o nazwie '${req.params.name}'.` });
        res.json(orderStatus);
    },
}