const { TableStatus } = require("../db/models")

module.exports = {
    // create new TableStatus
    create: async (req,res) => {
        const tableStatus = req.body;
        await TableStatus.create(tableStatus);
        res.json(tableStatus);
    },
    // update TableStatus
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await TableStatus.update(
            { 
                name: req.body.name
            }, 
            {
            where: {
                id: id
            }
            });

        res.json("Updated successfully.");
    },
    // delete TableStatus
    delete: async (req,res) => {
        const id = req.params.id;
        await TableStatus.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
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