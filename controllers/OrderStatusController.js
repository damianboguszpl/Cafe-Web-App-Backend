const { OrderStatus } = require("../db/models")

module.exports = {
    // create new OrderStatus
    create: async (req,res) => {
        const orderStatus = req.body;
        await OrderStatus.create(orderStatus);
        res.json(orderStatus);
    },
    // update OrderStatus
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await OrderStatus.update(
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
    // delete OrderStatus
    delete: async (req,res) => {
        const id = req.params.id;
        await OrderStatus.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
    // get all OrderStatuses
    getAll: async (req, res) => {
        const orderStatuses = await OrderStatus.findAll();
        res.json(orderStatuses);
    },
    // get OrderStatus /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const orderStatus = await OrderStatus.findByPk(id);
        res.json(orderStatus);
    },
    // get OrderStatus by name
    getByName: async (req, res) => {
        const name = req.params.name
        const orderStatus = await OrderStatus.findOne({ where: { name: name } });
        res.json(orderStatus);
    },
}