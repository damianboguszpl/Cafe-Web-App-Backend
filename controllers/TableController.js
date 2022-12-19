const { Table, Reservation, OrderHeader, TableStatus } = require("../db/models")

module.exports = {
    create: async (req, res) => {
        if (!req?.body?.numberOfSeats)
            return res.status(400).json({ 'message': 'Nie podano liczby miejsc.' });
        if (!req?.body?.number)
            return res.status(400).json({ 'message': 'Nie podano numeru Stolika.' });
        if (!req?.body?.TableStatusId)
            return res.status(400).json({ 'message': 'Nie podano Id Statusu Stolika.' });
        const table = await Table.findOne({ where: { number: req.body.number } });
        if(table)
            return res.status(400).json({ 'message': 'Stolik o podanym numerze już istnieje.' });
            
        const newTable = await Table.create(req.body);
        res.status(201).json({'message': `Dodano nowy Stolik.`, 'data': newTable});
    },
    
    update: async (req, res) => {
        if (!req?.body?.numberOfSeats && !req?.body?.number && !req?.body?.TableStatusId ) 
            return res.status(400).json({ 'message': 'Nie podano wymaganych danych.' });
        
        if(req?.body?.TableStatusId && req?.body?.TableStatusId != null) {
            const tableStatus = await TableStatus.findByPk(req?.body?.TableStatusId);
            if(!tableStatus)
                return res.status(404).json({ 'message': `Nie znaleziono Statusu Stolików o Id ${req?.body?.TableStatusId}.` });
        }
        await Table.update(
            {
                numberOfSeats: req?.body?.numberOfSeats ? req.body.numberOfSeats : this.numberOfSeats,
                number: req?.body?.number ? req.body.number : this.number,
                TableStatusId: req?.body?.TableStatusId ? req.body.TableStatusId : this.TableStatusId
            },
            { where: { id: req.params.id } }
        );
        res.json({'message': `Zaktualizowano Stolik.`});
    },
    
    delete: async (req, res) => {
        const table = await Table.findOne({ where: { id: req.params.id } });
        if(!table)
            return res.status(404).json({ 'message': `Nie znaleziono Stolika o Id ${req.params.id}.` });
        const anyOrderHeader = await OrderHeader.findOne({ where: { TableId: req.params.id } });
        if(anyOrderHeader)
            return res.status(400).json({ 'message': 'Stolik, który chcesz usunąć, przypisany jest do co najmniej 1 Zamówienia.' });
        const anyReservation = await Reservation.findOne({ where: { TableId: req.params.id } });
        if(anyReservation)
            return res.status(400).json({ 'message': 'Stolik, który chcesz usunąć, przypisany jest do co najmniej 1 Rezerwacji.' });    
        await Table.destroy({
            where: { id: req.params.id } }
        );
        res.json({'message': `Usunięto Stolik.`});
    },
    
    getAll: async (req, res) => {
        const tables = await Table.findAll();
        if (!tables.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadych Stolików.' });
        res.json(tables);
    },
    
    getById: async (req, res) => {
        const table = await Table.findOne({ where: { id: req.params.id } });
        if(!table)
            return res.status(404).json({ 'message': `Nie znaleziono Stolika o Id ${req.params.id}.` });
        res.json(table);
    },
    
    getByTableStatusId: async (req, res) => {
        const tables = await Table.findAll({ where: { TableStatusId: req.params.id } });
        if(!tables.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Stolików ze Statusem Stolików o Id ${req.params.id}.` });
        res.json(tables);
    },
}