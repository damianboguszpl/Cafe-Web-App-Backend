const { ReservationStatus, Reservation } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const reservationStatus = await ReservationStatus.findOne({ where: { name: req.body.name } });
        if(reservationStatus)
            return res.status(204).json({ 'message': 'ReservationStatus with same Name already exists.' });
        const newReservationStatus = req.body;
        await ReservationStatus.create(newReservationStatus);
        res.json(newReservationStatus);
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const reservationStatus = await ReservationStatus.findOne({ where: { id: req.params.id } });
        if(!reservationStatus)
            return res.status(204).json({ 'message': `No ReservationStatus matching Id ${req.params.id} has been found.` });
        await ReservationStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
        );
        res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        const reservationStatus = await ReservationStatus.findOne({ where: { id: req.params.id } });
        if(!reservationStatus)
            return res.status(204).json({ 'message': `No ReservationStatus matching Id ${req.params.id} has been found.` });
        const anyReservation = await Reservation.findOne({ where: { ReservationStatusId: req.params.id } });
        if(anyReservation)
            return res.status(204).json({ 'message': 'ReservationStatus you tried to delete is used by at least 1 Reservation.' });
        await ReservationStatus.destroy(
            { where: { id: req.params.id } }
        );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const reservationStatuses = await ReservationStatus.findAll();
        if (!reservationStatuses.length)
            return res.status(204).json({ 'message': 'No ReservationStatuses found.' });
        res.json(reservationStatuses);
    },
    
    getById: async (req, res) => {
        const reservationStatus = await ReservationStatus.findOne({ where: { id: req.params.id } });
        if(!reservationStatus)
            return res.status(204).json({ 'message': `No ReservationStatus matching Id ${req.params.id} has been found.` });
        res.json(reservationStatus);
    },
    
    getByName: async (req, res) => {
        const name = req.params.name
        const reservationStatus = await ReservationStatus.findOne({ where: { name: name } });
        if(!reservationStatus)
            return res.status(204).json({ 'message': `No ReservationStatus matching Name '${req.params.name}' has been found.` });
        res.json(reservationStatus);
    },
}