const { ProductStatus, Product } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const productStatus = await ProductStatus.findOne({ where: { name: req.body.name } });
        if(productStatus)
            return res.status(204).json({ 'message': 'ProductStatus with same Name already exists.' });
        const newProductStatus = req.body;
        await ProductStatus.create(newProductStatus);
        res.json(newProductStatus);
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const productStatus = await ProductStatus.findOne({ where: { id: req.params.id } });
        if(!productStatus)
            return res.status(204).json({ 'message': `No ProductStatus matching Id ${req.params.id} has been found.` });
        await ProductStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } });

        res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        const productStatus = await ProductStatus.findOne({ where: { id: req.params.id } });
        if(!productStatus)
            return res.status(204).json({ 'message': `No ProductStatus matching Id ${req.params.id} has been found.` });
        const anyProduct = await Product.findOne({ where: { ProductStatusId: req.params.id } });
        if(anyProduct)
            return res.status(204).json({ 'message': 'ProductStatus you tried to delete is used by at least 1 Product.' });
        await ProductStatus.destroy(
                { where: { id: req.params.id } }
            );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const productStatuses = await ProductStatus.findAll();
        if (!productStatuses.length) 
            return res.status(204).json({ 'message': 'No ProductStatuses found.' });
        res.json(productStatuses);
    },
    
    getById: async (req, res) => {
        const productStatus = await ProductStatus.findOne({ where: { id: req.params.id } });
        if(!productStatus)
            return res.status(204).json({ 'message': `No ProductStatus matching Id ${req.params.id} has been found.` });
        res.json(productStatus);
    },
    
    getByName: async (req, res) => {
        const productStatus = await ProductStatus.findOne({ where: { name: req.params.name } });
        if(!productStatus)
            return res.status(204).json({ 'message': `No ProductStatus matching Name '${req.params.name}' has been found.` });
        res.json(productStatus);
    },
}