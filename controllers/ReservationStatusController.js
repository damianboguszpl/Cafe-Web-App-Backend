const { ReservationStatus, Reservation } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const reservationStatus = await ReservationStatus.findOne({ where: { name: req.body.name } });
        if(reservationStatus)
            return res.status(400).json({ 'message': 'Status Rezerwacji o podanej nazwie już istnieje.' });
        
        const newReservationStatus = await ReservationStatus.create(req.body);
        return res.status(201).json({ 'message': `Dodano nowy Status Rezerwacji.`, 'data': newReservationStatus});
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const reservationStatus = await ReservationStatus.findOne({ where: { id: req.params.id } });
        if(!reservationStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Rezerwacji o Id ${req.params.id}.` });
        await ReservationStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
        );
        return res.json({'mesage': `Zaktualizowano Status Rezerwacji.`});
    },
    
    delete: async (req,res) => {
        const reservationStatus = await ReservationStatus.findOne({ where: { id: req.params.id } });
        if(!reservationStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Rezerwacji o Id ${req.params.id}.` });
        const anyReservation = await Reservation.findOne({ where: { ReservationStatusId: req.params.id } });
        if(anyReservation)
            return res.status(400).json({ 'message': 'Status Rezerwacji, który chcesz usunąć, przypisany jest do co najmniej 1 Rezerwacji.' });
        await ReservationStatus.destroy(
            { where: { id: req.params.id } }
        );
        return res.json({'message': 'Usunięto Status Rezerwacji.'});
    },
    
    getAll: async (req, res) => {
        const reservationStatuses = await ReservationStatus.findAll();
        if (!reservationStatuses.length)
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Statusów Rezerwacji.' });
        return res.json(reservationStatuses);
    },
    
    getById: async (req, res) => {
        const reservationStatus = await ReservationStatus.findOne({ where: { id: req.params.id } });
        if(!reservationStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Rezerwacji o Id ${req.params.id}.` });
        return res.json(reservationStatus);
    },
    
    getByName: async (req, res) => {
        const name = req.params.name
        const reservationStatus = await ReservationStatus.findOne({ where: { name: name } });
        if(!reservationStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Rezerwacji o nazwie '${req.params.name}'.` });
        return res.json(reservationStatus);
    },
}