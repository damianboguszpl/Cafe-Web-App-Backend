const { Table } = require("../db/models")

module.exports = {
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
        const tablestatusid = req.params.tablestatusid
        const tables = await Product.findAll({ where: { TableStatusId: tablestatusid } });
        res.json(tables);
    },
}