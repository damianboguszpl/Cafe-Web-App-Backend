const { ProductStatus, Product } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const productStatus = await ProductStatus.findOne({ where: { name: req.body.name } });
        if(productStatus)
            return res.status(400).json({ 'message': 'Status Produktów o podanej nazwie już istnieje.' });
        
        const newProductStatus = await ProductStatus.create(req.body);
        return res.status(201).json({ 'message': `Dodano nowy Status Produktów.`, 'data': newProductStatus});
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const productStatus = await ProductStatus.findOne({ where: { id: req.params.id } });
        if(!productStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Produktów o Id ${req.params.id}.` });
        await ProductStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } });

            res.json({'mesage': `Zaktualizowano Status Produktów.`});
    },
    
    delete: async (req,res) => {
        const productStatus = await ProductStatus.findOne({ where: { id: req.params.id } });
        if(!productStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Produktów o Id ${req.params.id}.` });
        const anyProduct = await Product.findOne({ where: { ProductStatusId: req.params.id } });
        if(anyProduct)
            return res.status(400).json({ 'message': 'Status Produktów, który chcesz usunąć, przypisany jest do co najmniej 1 Produktu.' });
        await ProductStatus.destroy(
                { where: { id: req.params.id } }
            );
        res.json({'message': `Usunięto Status Produktów.`});
    },
    
    getAll: async (req, res) => {
        const productStatuses = await ProductStatus.findAll();
        if (!productStatuses.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Statusów Produktów.' });
        res.json(productStatuses);
    },
    
    getById: async (req, res) => {
        const productStatus = await ProductStatus.findOne({ where: { id: req.params.id } });
        if(!productStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Produktów o Id ${req.params.id}.` });
        res.json(productStatus);
    },
    
    getByName: async (req, res) => {
        const productStatus = await ProductStatus.findOne({ where: { name: req.params.name } });
        if(!productStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Produktów o nazwie '${req.params.name}'.` });
        res.json(productStatus);
    },
}