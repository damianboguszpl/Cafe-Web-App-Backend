const { TableStatus, Table } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const tableStatus = await TableStatus.findOne({ where: { name: req.body.name } });
        if(tableStatus)
            return res.status(204).json({ 'message': 'TableStatus with same Name already exists.' });
        const newTableStatus = req.body;
        await TableStatus.create(newTableStatus);
        res.json(newTableStatus);
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const tableStatus = await TableStatus.findOne({ where: { id: req.params.id } });
        if(!tableStatus)
            return res.status(204).json({ 'message': `No TableStatus matching Id ${req.params.id} has been found.` });
        await TableStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
        );
        res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        const tableStatus = await TableStatus.findOne({ where: { id: req.params.id } });
        if(!tableStatus)
            return res.status(204).json({ 'message': `No TableStatus matching Id ${req.params.id} has been found.` });
        const anyTable = await Table.findOne({ where: { TableStatusId: req.params.id } });
        if(anyTable)
            return res.status(204).json({ 'message': 'TableStatus you tried to delete is used by at least 1 Table.' });
        await TableStatus.destroy(
            { where: { id: req.params.id } }
        );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const tableStatuses = await TableStatus.findAll();
        if (!tableStatuses.length)
            return res.status(204).json({ 'message': 'No TableStatuses found.' });
        res.json(tableStatuses);
    },
    
    getById: async (req, res) => {
        const tableStatus = await TableStatus.findOne({ where: { id: req.params.id } });
        if(!tableStatus)
            return res.status(204).json({ 'message': `No TableStatus matching Id ${req.params.id} has been found.` });
        res.json(tableStatus);
    },
    
    getByName: async (req, res) => {
        const name = req.params.name
        const tableStatus = await TableStatus.findOne({ where: { name: name } });
        if(!tableStatus)
            return res.status(204).json({ 'message': `No TableStatus matching Name '${req.params.name}' has been found.` });
        res.json(tableStatus);
    },
}