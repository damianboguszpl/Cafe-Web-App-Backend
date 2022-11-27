const e = require("express");
const { Reservation, Table, ReservationStatus, User } = require("../db/models")

module.exports = {
    create: async (req, res) => {
        if (!req?.body?.date)
            return res.status(400).json({ 'message': 'Date parameter not specified.' });
        if (!req?.body?.TableId)
            return res.status(400).json({ 'message': 'TableId parameter not specified.' });

        const reservationStatus = await ReservationStatus.findByPk(req?.body?.ReservationStatusId);
        if (!reservationStatus)
            return res.status(404).json({ 'message': `No ReservationStatus matching Id ${req?.body?.ReservationStatusId} has been found.` });

        if (req?.body?.ClientId && req?.body?.ClientId != null) {
            const client = await User.findByPk(req?.body?.ClientId);
            if (!client) {
                return res.status(404).json({ 'message': `No Client matching Id ${req.body.ClientId} has been found.` });
            }
            else {
                const existingReservation = await Reservation.findOne({ where: { ClientId: req.body.ClientId } });

                if (existingReservation != null) {
                    const existingReservationStatus = await ReservationStatus.findOne({ where: { id: existingReservation.ReservationStatusId } });
                    if (existingReservationStatus.name != "Zakończona")
                        return res.status(404).json({ 'message': `Client having Id ${req.body.ClientId} already has pending reservation.` });
                }
            }

        }

        if (req?.body?.EmployeeId && req?.body?.EmployeeId != null) {
            const employee = await User.findByPk(req?.body?.EmployeeId);
            if (!employee)
                return res.status(404).json({ 'message': `No Employee matching Id ${req?.body?.EmployeeId} has been found.` });
        }

        const table = await Table.findByPk(req?.body?.TableId);
        if (!table)
            return res.status(404).json({ 'message': `No Table matching Id ${req?.body?.TableId} has been found.` });

        await Reservation.create(req.body).then(result => res.json(result));
    },

    update: async (req, res) => {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation)
            return res.status(404).json({ 'message': `No Reservation matching Id ${req.params.id} has been found.` });

        // if(req?.body?.ClientId && req?.body?.ClientId != null) {
        //     const client = await User.findByPk(req?.body?.ClientId);
        //     if(!client)
        //         return res.status(404).json({ 'message': `No Client matching Id ${req?.body?.ClientId} has been found.` });
        // }
        if (req?.body?.EmployeeId && req?.body?.EmployeeId != null) {
            const employee = await User.findByPk(req?.body?.EmployeeId);
            if (!employee)
                return res.status(404).json({ 'message': `No Employee matching Id ${req?.body?.EmployeeId} has been found.` });
        }
        if (req?.body?.ReservationStatusId && req?.body?.ReservationStatusId != null) {
            const reservationStatus = await ReservationStatus.findByPk(req?.body?.ReservationStatusId);
            if (!reservationStatus)
                return res.status(404).json({ 'message': `No ReservationStatus matching Id ${req?.body?.ReservationStatusId} has been found.` });
        }
        if (req?.body?.TableId && req?.body?.TableId != null) {
            const table = await Table.findByPk(req?.body?.TableId);
            if (!table)
                return res.status(404).json({ 'message': `No Table matching Id ${req?.body?.TableId} has been found.` });
        }

        await Reservation.update(
            {
                date: req?.body?.date ? req.body.date : this.date,
                ReservationStatusId: req?.body?.ReservationStatusId ? req.body.ReservationStatusId : this.ReservationStatusId,
                // ClientId: req?.body?.ClientId ? req.body.ClientId : this.ClientId,   // Should ClientId be updatable ??
                EmployeeId: req?.body?.EmployeeId ? req.body.EmployeeId : this.EmployeeId,
                TableId: req?.body?.TableId ? req.body.TableId : this.TableId
            },
            { where: { id: req.params.id } }
        );
        res.json("Updated successfully.");
    },

    delete: async (req, res) => {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation)
            return res.status(404).json({ 'message': `No Reservation matching Id ${req.params.id} has been found.` });
        await Reservation.destroy({
            where: { id: req.params.id }
        }
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
        if (!reservation)
            return res.status(204).json({ 'message': `No Reservation matching Id ${req.params.id} has been found.` });

        res.json(reservation);
    },

    getByClientId: async (req, res) => {
        const reservations = await Reservation.findAll({ where: { ClientId: req.params.id } });
        if (!reservations.length)
            return res.status(204).json({ 'message': `No Reservations matching ClientId ${req.params.id} have been found.` });
        res.json(reservations);
    },

    getByEmployeeId: async (req, res) => {
        const reservations = await Reservation.findAll({ where: { EmployeeId: req.params.id } });
        if (!reservations.length)
            return res.status(204).json({ 'message': `No Reservations matching EmployeeId ${req.params.id} have been found.` });
        res.json(reservations);
    },

    getByReservationStatusId: async (req, res) => {
        const reservations = await Reservation.findAll({ where: { ReservationStatusId: req.params.id } });
        if (!reservations.length)
            return res.status(204).json({ 'message': `No reservations matching ReservationStatusId ${req.params.id} have been found.` });
        res.json(reservations);
    },

    getByTableId: async (req, res) => {
        const reservations = await Reservation.findAll({ where: { TableId: req.params.id } });
        if (!reservations.length)
            return res.status(204).json({ 'message': `No Reservations matching TableId ${req.params.id} have been found.` });
        res.json(reservations);
    },
}