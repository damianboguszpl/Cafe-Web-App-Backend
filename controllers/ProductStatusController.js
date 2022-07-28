const { ProductStatus } = require("../db/models")

module.exports = {
    // create new ProductStatus
    create: async (req,res) => {
        const productStatus = req.body;
        await ProductStatus.create(productStatus);
        res.json(productStatus);
    },
    // update ProductStatus
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await ProductStatus.update(
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
    // delete ProductStatus
    delete: async (req,res) => {
        const id = req.params.id;
        await ProductStatus.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
    // get all ProductStatuses
    getAll: async (req, res) => {
        const productStatuses = await ProductStatus.findAll();
        res.json(productStatuses);
    },
    // get ProductStatus /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const productStatus = await ProductStatus.findByPk(id);
        res.json(productStatus);
    },
    // get ProductStatus by name
    getByName: async (req, res) => {
        const name = req.params.name
        const productStatus = await ProductStatus.findOne({ where: { name: name } });
        res.json(productStatus);
    },
}