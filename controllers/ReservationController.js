const { Reservation } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        const newReservation = req.body;
        await Reservation.create(newReservation);
        res.json(newReservation);
    },
    
    update: async (req,res) => {
        await Reservation.update(
            { 
                date: req.body.date,
                TableId: req.body.TableId,
                UserId: req.body.UserId
            }, 
            { where: { id: req.params.id } }
        );
        res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        await Reservation.destroy({
            where: { id: req.params.id } }
        );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const reservations = await Reservation.findAll();
        if (!reservations.length) 
            return res.status(204).json({ 'message': 'No Reservations found.' });
        res.json(reservations);
    },
    
    getById: async (req, res) => {
        const reservation = await Reservation.findOne({ where: { id: req.params.id } });
        if(!reservation)
            return res.status(204).json({ 'message': `No Reservation matching Id ${req.params.id} has been found.` });
        
        res.json(reservation);
    },
    
    getByClientId: async (req, res) => {
        const reservations = await Reservation.findAll({ where: { UserId: req.params.id } });
        if(!reservations.length)
            return res.status(204).json({ 'message': `No Reservations matching ClientId ${req.params.id} have been found.` });
        res.json(reservations);
    },
    
    getByTableId: async (req, res) => {
        const reservations = await Reservation.findAll({ where: { TableId: req.params.id } });
        if(!reservations.length)
            return res.status(204).json({ 'message': `No Reservations matching TableId ${req.params.id} have been found.` });
        res.json(reservations);
    },
}