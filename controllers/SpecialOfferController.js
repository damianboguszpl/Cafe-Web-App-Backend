const { SpecialOffer } = require("../db/models")

module.exports = {
    create: async (req, res) => {
        if (!req?.body?.value) { return res.status(400).json({ 'error': 'Nie podano wartości Promocji.' }); }
        if (!req?.body?.start_date) { return res.status(400).json({ 'error': 'Nie podano daty rozpoczęcia Promocji.' }); }
        if (!req?.body?.end_date) { return res.status(400).json({ 'error': 'Nie podano daty zakończenia Promocji.' }); }
        if (!req?.body?.ProductId) { return res.status(400).json({ 'error': 'Nie podano Id Produktu Promocyjnego.' }); }

        const newSpecialOffer = await SpecialOffer.create(req.body);
        res.status(201).json({'message': `Dodano nową Promocję.`, 'data': newSpecialOffer});
    },
    
    update: async (req, res) => {
        const id = req.params.id;
        const updated = await SpecialOffer.update(
            {
                value: req.body.value,
                start_date: req.body.start_date,
                end_date: req.body.end_date
            },
            { where: { id: id } }
        );

        res.json({'message': `Zaktualizowano Promocję.`});
    },
    
    delete: async (req, res) => {
        const id = req.params.id;
        await SpecialOffer.destroy(
            { where: { id: id } }
        );
        res.json({'message': `Usunięto Promocję.`});
    },
    
    getAll: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll();
        if (!specialOffers.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Promocji.' });
        res.json(specialOffers);
    },
    
    getById: async (req, res) => {
        const id = req.params.id
        const specialOffer = await SpecialOffer.findByPk(id);
        if(!specialOffer)
            return res.status(404).json({ 'message': `Nie znaleziono Promocji o Id ${req.params.id}.` });
        res.json(specialOffer);
    },
    
    getByProductId: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll({ where: { ProductId: req.params.id } });
        if (!specialOffers.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Promocji na Produkt o Id ${req.params.id}.` });
        res.json(specialOffers);
    },
    
    getAvailable: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll({ where: { is_available: true } })
        if (!specialOffers.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych dostępnych Promocji.` });
        res.json(specialOffers)
    },
    
    getUnavailable: async (req, res) => {
        const specialOffers = await SpecialOffer.findAll({ where: { is_available: false } })
        if (!specialOffers.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych niedostępnych Promocji.` });
        res.json(specialOffers)
    },
}