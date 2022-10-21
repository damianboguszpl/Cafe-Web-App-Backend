const { Category } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name) {
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        }
        const category = req.body;
        await Category.create(req.body);
        res.json(category);
    },

    update: async (req,res) => {
        if (!req?.body?.name) {
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        }
        const category = await Category.findOne({ where: { id: req.params.id } });
        if(!category)
        {
            return res.status(404).json({ 'message': `No category matching ID ${req.params.id} has been found.` });
        }
        const result = await Category.update(
            { name: req.body.name }, 
            { where: { id: req.params.id} }
        );
        res.json({ 'message': "Updated successfully." });
    },

    delete: async (req,res) => {
        const category = await Category.findOne({ where: { id: req.params.id } });
        if(!category)
        {
            return res.status(404).json({ 'message': `No category matching ID ${req.params.id} has been found.` });
        }
        const result = await Category.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({ 'message': "Deleted successfully." });
    },

    getAll: async (req, res) => {
        const categories = await Category.findAll();
        if (!categories) 
            return res.status(204).json({ 'message': 'No categories found.' });
        res.json(categories);
    },
    
    getById: async (req, res) => {
        if (!req?.params?.id)
            return res.status(400).json({ 'message': 'Category ID required.' });
        const category = await Category.findOne({ where: { id: req.params.id } });
        if(!category)
        {
            return res.status(400).json({ 'message': `No category matching ID ${req.params.id} has been found.` });
        }
        res.json(category);
    },

    getByName: async (req, res) => {
        if (!req?.params?.name) {
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        }
        const category = await Category.findOne({ where: { name: req.params.name } });
        if(!category)
        {
            return res.status(400).json({ 'message': `No category matching name '${req.params.name}' has been found.` });
        }
        res.json(category);
    },
}