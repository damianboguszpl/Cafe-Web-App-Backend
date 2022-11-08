const { Table, Reservation, OrderHeader, TableStatus } = require("../db/models")

module.exports = {
    create: async (req, res) => {
        if (!req?.body?.number_of_seats)
            return res.status(400).json({ 'message': 'Number_of_seats parameter not specified.' });
        if (!req?.body?.number)
            return res.status(400).json({ 'message': 'Number parameter not specified.' });
        if (!req?.body?.TableStatusId)
            return res.status(400).json({ 'message': 'TableStatusId parameter not specified.' });
        const table = await Table.findOne({ where: { number: req.body.number } });
        if(table)
            return res.status(204).json({ 'message': 'Table with same Number already exists.' });
            
        const newTable = req.body;
        await Table.create(newTable);
        res.json(newTable);
    },
    
    update: async (req, res) => {
        if (!req?.body?.number_of_seats && !req?.body?.number && !req?.body?.TableStatusId ) 
            return res.status(400).json({ 'message': 'None of the required parameters were passed.' });
        
        if(req?.body?.TableStatusId && req?.body?.TableStatusId != null) {
            const tableStatus = await TableStatus.findByPk(req?.body?.TableStatusId);
            if(!tableStatus)
                return res.status(204).json({ 'message': `No TableStatus matching Id ${req?.body?.TableStatusId} has been found.` });
        }
        await Table.update(
            {
                number_of_seats: req?.body?.number_of_seats ? req.body.number_of_seats : this.number_of_seats,
                number: req?.body?.number ? req.body.number : this.number,
                TableStatusId: req?.body?.TableStatusId ? req.body.TableStatusId : this.TableStatusId
            },
            { where: { id: req.params.id } }
        );
        res.json("Updated successfully.");
    },
    
    delete: async (req, res) => {
        const table = await Table.findOne({ where: { id: req.params.id } });
        if(!table)
            return res.status(204).json({ 'message': `No Table matching Id ${req.params.id} has been found.` });
        const anyOrderHeader = await OrderHeader.findOne({ where: { TableId: req.params.id } });
        if(anyOrderHeader)
            return res.status(204).json({ 'message': 'Table you tried to delete is used by at least 1 OrderHeader.' });
        const anyReservation = await Reservation.findOne({ where: { TableId: req.params.id } });
        if(anyReservation)
            return res.status(204).json({ 'message': 'Table you tried to delete is used by at least 1 Reservation.' });    
        await Table.destroy({
            where: { id: req.params.id } }
        );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const tables = await Table.findAll();
        if (!tables.length) 
            return res.status(204).json({ 'message': 'No Tables found.' });
        res.json(tables);
    },
    
    getById: async (req, res) => {
        const table = await Table.findOne({ where: { id: req.params.id } });
        if(!table)
            return res.status(204).json({ 'message': `No Table matching Id ${req.params.id} has been found.` });
        res.json(table);
    },
    
    getByTableStatusId: async (req, res) => {
        const tables = await Table.findAll({ where: { TableStatusId: req.params.id } });
        if(!tables.length)
            return res.status(204).json({ 'message': `No Tables matching TableStatusId ${req.params.id} have been found.` });
        res.json(tables);
    },
}