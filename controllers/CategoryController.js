const { Category, Product } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'error': 'Name parameter not specified.' });
        const category = await Category.findOne({ where: { name: req.body.name } });
        if(category)
            return res.status(400).json({ 'error': 'Category with same Name already exists.' });
        const newCategory = req.body;
        await Category.create(newCategory);
        res.json(newCategory);
    },

    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'error': 'Name parameter not specified.' });
        const category = await Category.findOne({ where: { id: req.params.id } });
        if(!category)
            return res.status(204).json({ 'error': `No category matching ID ${req.params.id} has been found.` });
        await Category.update(
            { name: req.body.name }, 
            { where: { id: req.params.id} }
        );
        res.json({ 'message': "Updated successfully." });
    },

    delete: async (req,res) => {
        const category = await Category.findOne({ where: { id: req.params.id } });
        if(!category)
            return res.status(204).json({ 'error': `No category matching ID ${req.params.id} has been found.` });
        const anyProduct = await Product.findOne({ where: { CategoryId: req.params.id } });
        if(anyProduct)
            return res.status(204).json({ 'error': 'Category you tried to delete is used by at least 1 Product.' });
        
        await Category.destroy(
            { where: { id: req.params.id } }
        );
        res.json({ 'message': "Deleted successfully." });
    },

    getAll: async (req, res) => {
        const categories = await Category.findAll();
        if (!categories.length) 
            return res.status(204).json({ 'error': 'No categories found.' });
        res.json(categories);
    },
    
    getById: async (req, res) => {
        if (!req?.params?.id)
            return res.status(204).json({ 'error': 'Category ID required.' });
        const category = await Category.findOne({ where: { id: req.params.id } });
        if(!category)
            return res.status(204).json({ 'error': `No category matching ID ${req.params.id} has been found.` });
        res.json(category);
    },

    getByName: async (req, res) => {
        const category = await Category.findOne({ where: { name: req.params.name } });
        if(!category)
            return res.status(204).json({ 'error': `No category matching Name '${req.params.name}' has been found.` });
        res.json(category);
    },
}