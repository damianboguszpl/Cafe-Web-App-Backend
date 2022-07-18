const { TableStatus } = require("../db/models")

module.exports = {
    // get all TableStatuses
    getAll: async (req, res) => {
        const tableStatuses = await TableStatus.findAll();
        res.json(tableStatuses);
    },
    // get TableStatus /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const tableStatus = await TableStatus.findByPk(id);
        res.json(tableStatus);
    },
    // get TableStatus by name
    getByName: async (req, res) => {
        const name = req.params.name
        const tableStatus = await TableStatus.findOne({ where: { name: name } });
        res.json(tableStatus);
    },
}