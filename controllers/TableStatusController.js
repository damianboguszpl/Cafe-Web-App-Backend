const { TableStatus, Table } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const tableStatus = await TableStatus.findOne({ where: { name: req.body.name } });
        if(tableStatus)
            return res.status(400).json({ 'message': 'Status Stolików o podanej nazwie już istnieje.' });
        
        const newTableStatus = await TableStatus.create(req.body);
        return res.status(201).json({'message': `Dodano nowy Status Stolików.`, 'data': newTableStatus});
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const tableStatus = await TableStatus.findOne({ where: { id: req.params.id } });
        if(!tableStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Stolików o Id ${req.params.id}.` });
        await TableStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
        );
        return res.json({'message': `Zaktualizowano Status Stolików.`});
    },
    
    delete: async (req,res) => {
        const tableStatus = await TableStatus.findOne({ where: { id: req.params.id } });
        if(!tableStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Stolików o Id ${req.params.id}.` });
        const anyTable = await Table.findOne({ where: { TableStatusId: req.params.id } });
        if(anyTable)
            return res.status(400).json({ 'message': 'Status Stolików, który chcesz usunąć, przypisany jest do co najmniej 1 Stolika.' });
        await TableStatus.destroy(
            { where: { id: req.params.id } }
        );
        return res.json({'message': `Usunięto Status Stolików.`});
    },
    
    getAll: async (req, res) => {
        const tableStatuses = await TableStatus.findAll();
        if (!tableStatuses.length)
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Statusów Stolików.' });
        return res.json(tableStatuses);
    },
    
    getById: async (req, res) => {
        const tableStatus = await TableStatus.findOne({ where: { id: req.params.id } });
        if(!tableStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Stolików o Id ${req.params.id}.` });
        return res.json(tableStatus);
    },
    
    getByName: async (req, res) => {
        const tableStatus = await TableStatus.findOne({ where: { name: req.params.name } });
        if(!tableStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Stolików o nazwie '${req.params.name}'.` });
        return res.json(tableStatus);
    },
}