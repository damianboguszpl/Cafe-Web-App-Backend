const { Role, User } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const role = await Role.findOne({ where: { name: req.body.name } });
        if(role)
            return res.status(400).json({ 'message': 'Rola o podanej nazwie już istnieje.' });

        const newRole = await Role.create(req.body);
        return res.status(201).json({ 'message': `Dodano nową Rolę.`, 'data': newRole});
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Nie podano nazwy.' });
        const role = await Role.findOne({ where: { id: req.params.id } });
        if(!role)
            return res.status(404).json({ 'message': `Nie znaleziono Roli o Id ${req.params.id}.` });
        await Role.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
        );
        return res.json({'message': `Zaktualizowano rolę.`});
    },
    
    delete: async (req,res) => {
        const role = await Role.findOne({ where: { id: req.params.id } });
        if(!role)
            return res.status(404).json({ 'message': `Nie znaleziono Roli o Id ${req.params.id}.` });
        const anyUser = await User.findOne({ where: { RoleId: req.params.id } });
        if(anyUser)
            return res.status(400).json({ 'message': 'Rola, którą chcesz usunąć, przypisana jest do co najmniej 1 Użytkownika.' });
        await Role.destroy({
            where: { id: req.params.id } }
        );
        return res.json({'message': `Usunięto rolę.`});
    },
    
    getAll: async (req, res) => {
        const roles = await Role.findAll();
        if (!roles.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnej Roli.' });
        return res.json(roles);
    },
    
    getById: async (req, res) => {
        const role = await Role.findOne({ where: { id: req.params.id } });
        if(!role)
            return res.status(404).json({ 'message': `Nie znaleziono Roli o Id ${req.params.id}.` });
        return res.json(role);
    },
    
    getByName: async (req, res) => {
        const role = await Role.findOne({ where: { name: req.params.name } });
        if(!role)
            return res.status(404).json({ 'message': `Nie znaleziono Roli o nazwie '${req.params.name}'.` });
        return res.json(role);
    },
}