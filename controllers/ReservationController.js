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
    }
}