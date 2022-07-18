const { Reservation } = require("../db/models")

module.exports = {
    // get all Reservations
    getAll: async (req, res) => {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    },
    // get Reservation /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const reservation = await Reservation.findByPk(id);
        res.json(reservation);
    },
    // get Reservations by ClientId
    getByClientId: async (req, res) => {
        const clientid = req.params.clientid
        const reservations = await Reservation.findAll({ where: { UserId: clientid } });
        res.json(reservations);
    },
    // get Reservations by TableId
    getByTableId: async (req, res) => {
        const tableid = req.params.tableid
        const reservations = await Reservation.findAll({ where: { TableId: tableid } });
        res.json(reservations);
    },
}