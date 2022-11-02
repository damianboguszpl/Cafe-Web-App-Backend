const { Table } = require("../db/models")

module.exports = {
    // create new Table
    create: async (req, res) => {
        const table = req.body;
        await Table.create(table);
        res.json(table);
    },
    // update Table
    update: async (req, res) => {
        const id = req.params.id;
        const updated = await Table.update(
            {
                number_of_seats: req.body.number_of_seats,
                number: req.body.number,
                TableStatusId: req.body.TableStatusId
            },
            {
                where: {
                    id: id
                }
            });

        res.json("Updated successfully.");
    },
    // delete Table
    delete: async (req, res) => {
        const id = req.params.id;
        await Table.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
    // get all Tables
    getAll: async (req, res) => {
        const tables = await Table.findAll();
        res.json(tables);
    },
    // get Table /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const table = await Table.findByPk(id);
        res.json(table);
    },
    // get Tables by TableStatusId
    getByTableStatusId: async (req, res) => {
        const tablestatusid = req.params.id
        const tables = await Table.findAll({ where: { TableStatusId: tablestatusid } });
        res.json(tables);
    },
}