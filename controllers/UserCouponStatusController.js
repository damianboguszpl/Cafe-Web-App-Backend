const { UserCouponStatus, UserCoupon } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const userCouponStatus = await UserCouponStatus.findOne({ where: { name: req.body.name } });
        if(userCouponStatus)
            return res.status(400).json({ 'message': 'Status Kuponów Użytkowników o podanej nazwie już istnieje.' });

        const newUserCouponStatus = await UserCouponStatus.create(req.body);
        return res.status(201).json({'message': `Dodano nowy Status Kuponów Użytkowników.`, 'data': newUserCouponStatus});
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const userCouponStatus = await UserCouponStatus.findOne({ where: { id: req.params.id } });
        if(!userCouponStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Kuponów Użytkowników o Id ${req.params.id}.` });
        await UserCouponStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
        );
        return res.json({'message': `Zaktualizowano Status Kuponów Użytkowników.`});
    },
    
    delete: async (req,res) => {
        const userCouponStatus = await UserCouponStatus.findOne({ where: { id: req.params.id } });
        if(!userCouponStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Kuponów Użytkowników o Id ${req.params.id}.` });
        const anyUserCoupon = await UserCoupon.findOne({ where: { UserCouponStatusId: req.params.id } });
        if(anyUserCoupon)
            return res.status(400).json({ 'message': 'Status Kuponów Użytkowników, który chcesz usunąć, jest posiadany przez co najmniej jeden Kupon Użytkownika.' });
        await UserCouponStatus.destroy(
            { where: { id: req.params.id } }
        );
        return res.json({'message': `Usunięto Status Kuponów Użytkowników.`});
    },
    
    getAll: async (req, res) => {
        const userCouponStatuses = await UserCouponStatus.findAll();
        if (!userCouponStatuses.length)
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Statusów Kuponów Użytkowników.' });
        return res.json(userCouponStatuses);
    },
    
    getById: async (req, res) => {
        const userCouponStatus = await UserCouponStatus.findOne({ where: { id: req.params.id } });
        if(!userCouponStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Kuponów Użytkowników o Id ${req.params.id}.` });
        return res.json(userCouponStatus);
    },
    
    getByName: async (req, res) => {
        const name = req.params.name
        const userCouponStatus = await UserCouponStatus.findOne({ where: { name: name } });
        if(!userCouponStatus)
            return res.status(404).json({ 'message': `Nie znaleziono Statusu Kuponów Użytkowników o nazwie '${req.params.name}'.` });
        return res.json(userCouponStatus);
    },
}