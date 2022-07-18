const { ProductStatus } = require("../db/models")

module.exports = {
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
    }
}