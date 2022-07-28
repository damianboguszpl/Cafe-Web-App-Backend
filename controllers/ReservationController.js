const { Reservation } = require("../db/models")

module.exports = {
    // create new Reservation
    create: async (req,res) => {
        const reservation = req.body;
        await Reservation.create(reservation);
        res.json(reservation);
    },
    // update Reservation
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await Reservation.update(
            { 
                date: req.body.date,
                TableId: req.body.TableId,
                UserId: req.body.UserId
            }, 
            {
            where: {
                id: id
            }
            });

        res.json("Updated successfully.");
    },
    // delete Reservation
    delete: async (req,res) => {
        const id = req.params.id;
        await Reservation.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
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