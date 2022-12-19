const { Category, Product } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'error': 'Nie podano nazwy Kategorii.' });
        const category = await Category.findOne({ where: { name: req.body.name } });
        if(category)
            return res.status(400).json({ 'error': 'Kategoria o podanej nazwie już istnieje.' });

        const newCategory = await Category.create(req.body);
        return res.status(201).json({ 'message': `Dodano nową Kategorię.`, 'data': newCategory});
    },

    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'error': 'Nie podano nazwy Kategorii.' });
        const categoryToEdit = await Category.findOne({ where: { id: req.params.id } });
        if(!categoryToEdit)
            return res.status(400).json({ 'error': `Nie znaleziono Kategorii o Id ${req.params.id}` });

        const category = await Category.findOne({where:{name: req.body.name}});
        if (category && req.body.name != categoryToEdit.name)
            return res.status(400).json({ 'error': 'Kategoria o podanej nazwie już istnieje.' });

        await Category.update(
            { name: req.body.name }, 
            { where: { id: req.params.id} }
        );
        res.json({'message': `Zaktualizowano Kategorię.`});
    },

    delete: async (req,res) => {
        const category = await Category.findOne({ where: { id: req.params.id } });
        if(!category)
            return res.status(400).json({ 'error': `Nie znaleziono Kategorii o Id ${req.params.id}.` });
        const anyProduct = await Product.findOne({ where: { CategoryId: req.params.id } });
        if(anyProduct)
            return res.status(400).json({ 'error': 'Kategoria, którą chcesz usunąć jest przypisana do co najmniej 1 Produktu.' });
        
        await Category.destroy(
            { where: { id: req.params.id } }
        );
        res.json({ 'message': "Usunięto Kategorię." });
    },

    getAll: async (req, res) => {
        const categories = await Category.findAll();
        if (!categories.length) 
            return res.status(400).json({ 'error': 'Nie znaleziono żadnych Kategorii.' });
        res.json(categories);
    },
    
    getAllNotEmpty: async (req, res) => {
        const categories = await Category.findAll({
            include: [{
                model: Product,
                attributes: ['id', 'name', 'size', 'price', 'allergen', 'CategoryId', 'ProductStatusId']
            }],
        });
        if (!categories.length) 
            return res.status(400).json({ 'error': 'Nie znaleziono żadnych Kategorii.' });
        var filteredCategories = categories.filter((category) => {
            return category.Products.length > 0
        })
        const categoriesToReturn = filteredCategories.map((category) => {
            return {
              'id':category.id,
              'name':category.name
            }
          });
        res.json(categoriesToReturn);
    },

    getById: async (req, res) => {
        if (!req?.params?.id)
            return res.status(400).json({ 'error': 'Id Kategorii jest wymagany.' });
        const category = await Category.findOne({ where: { id: req.params.id } });
        if(!category)
            return res.status(400).json({ 'error': `Nie znaleziono Kategorii o Id ${req.params.id}.` });
        res.json(category);
    },

    getByName: async (req, res) => {
        const category = await Category.findOne({ where: { name: req.params.name } });
        if(!category)
            return res.status(400).json({ 'error': `Nie znaleziono Kategorii o nazwie '${req.params.name}'.` });
        res.json(category);
    },
}