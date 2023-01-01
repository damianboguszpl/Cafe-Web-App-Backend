const e = require("express");
const { Reservation, Table, ReservationStatus, User } = require("../db/models")

module.exports = {
    create: async (req, res) => {
        if (!req?.body?.date) return res.status(400).json({ 'message': 'Nie podano daty.' });
        if (!req?.body?.TableId) return res.status(400).json({ 'message': 'Nie podano Id Stolika.' });

        const reservationStatus = await ReservationStatus.findByPk(req?.body?.ReservationStatusId);
        if (!reservationStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Rezerwacji o Id ${req?.body?.ReservationStatusId}.` });

        if (req?.body?.ClientId && req?.body?.ClientId != null) {
            const client = await User.findByPk(req?.body?.ClientId);
            if (!client) {
                return res.status(404).json({ 'message': `Nie znaleziono Klienta o Id ${req.body.ClientId}.` });
            }
            else {
                const existingReservation = await Reservation.findOne({ where: { ClientId: req.body.ClientId, ReservationStatusId: 1} });

                if (existingReservation != null) {
                    const existingReservationStatus = await ReservationStatus.findOne({ where: { id: existingReservation.ReservationStatusId } });
                    if (existingReservationStatus.name != "Zakończona")
                        return res.status(404).json({ 'message': `Klient o Id ${req.body.ClientId} ma już aktywną Rezerwację.` });
                }
            }
        }

        if (req?.body?.EmployeeId && req?.body?.EmployeeId != null) {
            const employee = await User.findByPk(req?.body?.EmployeeId);
            if (!employee)
                return res.status(404).json({ 'message': `Nie znaleziono Pracownika o Id ${req?.body?.EmployeeId}.` });
        }

        const table = await Table.findByPk(req?.body?.TableId);
        if (!table)
            return res.status(404).json({ 'message': `Nie znaleziono Stolika o Id ${req?.body?.TableId}.` });

        await Reservation.create(req.body).then(result => res.json(result));
    },

    update: async (req, res) => {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation)
            return res.status(404).json({ 'message': `Nie znaleziono Rezerwacji o Id ${req.params.id} .` });

        if (req?.body?.EmployeeId && req?.body?.EmployeeId != null) {
            const employee = await User.findByPk(req?.body?.EmployeeId);
            if (!employee)
                return res.status(404).json({ 'message': `Nie znaleziono Pracownika o Id ${req?.body?.EmployeeId}.` });
        }
        if (req?.body?.ReservationStatusId && req?.body?.ReservationStatusId != null) {
            const reservationStatus = await ReservationStatus.findByPk(req?.body?.ReservationStatusId);
            if (!reservationStatus)
                return res.status(404).json({ 'message': `Nie znaleziono Statusu Rezerwacji o Id ${req?.body?.ReservationStatusId}.` });
        }
        if (req?.body?.TableId && req?.body?.TableId != null) {
            const table = await Table.findByPk(req?.body?.TableId);
            if (!table)
                return res.status(404).json({ 'message': `Nie znaleziono Stolika o Id ${req?.body?.TableId}.` });
        }
        
        if(req.RoleId === 1) {
            const client = await User.findOne({ where: { id: reservation.ClientId }, attributes: ['id', 'email'] });
            if (client != null) {
                if (client.email !== req.user) {
                    return res.status(401).json({ 'error': `Unauthorized`});
                }
            }
        }

        await Reservation.update(
            {
                date: req?.body?.date ? req.body.date : this.date,
                ReservationStatusId: req?.body?.ReservationStatusId ? req.body.ReservationStatusId : this.ReservationStatusId,
                EmployeeId: req?.body?.EmployeeId ? req.body.EmployeeId : this.EmployeeId,
                TableId: req?.body?.TableId ? req.body.TableId : this.TableId
            },
            { where: { id: req.params.id } }
        );
        return res.json({'message': `Zaktualizowano Rezerwację.`});
    },

    delete: async (req, res) => {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation)
            return res.status(404).json({ 'message': `Nie znaleziono Rezerwacji o Id ${req.params.id}.` });
        await Reservation.destroy({
            where: { id: req.params.id }
        }
        );
        return res.json({'message': `Usunięto Rezerwację.`});
    },

    getAll: async (req, res) => {
        const reservations = await Reservation.findAll();
        if (!reservations.length)
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Rezerwacji.' });
        return res.json(reservations);
    },

    getById: async (req, res) => {
        const reservation = await Reservation.findOne({ where: { id: req.params.id } });
        if (!reservation)
            return res.status(404).json({ 'message': `Nie znaleziono Rezerwacji o Id ${req.params.id}.` });

        if(req.RoleId === 1) {
            const client = await User.findOne({ where: { id: reservation.ClientId }, attributes: ['id', 'email'] });
            if (client != null) {
                if (client.email !== req.user) {
                    return res.status(401).json({ 'error': `Unauthorized`});
                }
            }
        }
        return res.json(reservation);
    },

    getByClientId: async (req, res) => {
        const reservations = await Reservation.findAll({ where: { ClientId: req.params.id } });
        if (!reservations.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Rezerwacji Klienta o Id ${req.params.id}.` });
        return res.json(reservations);
    },

    getByEmployeeId: async (req, res) => {
        const reservations = await Reservation.findAll({ where: { EmployeeId: req.params.id } });
        if (!reservations.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Rezerwacji przypisanych do Pracownika o Id ${req.params.id}.` });
        return res.json(reservations);
    },

    getByReservationStatusId: async (req, res) => {
        const reservations = await Reservation.findAll({ 
            include: [{
                model: Table,
                attributes: ['numberOfSeats', 'number', 'TableStatusId']
            }, 
            {
                model: User, 
                attributes: ['firstname', 'lastname', 'email', 'phone', 'sex'],
                as: 'Client'
            }],
            where: { ReservationStatusId: req.params.id } });
        if (!reservations.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Rezerwacji ze Statusem Rezerwacji o Id ${req.params.id}.` });
        return res.json(reservations);
    },

    getByTableId: async (req, res) => {
        const reservations = await Reservation.findAll({ where: { TableId: req.params.id } });
        if (!reservations.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Rezerwacji na Stolik o Id ${req.params.id}.` });
        return res.json(reservations);
    },
}
