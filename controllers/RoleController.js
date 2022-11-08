const { Role, User } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const role = await Role.findOne({ where: { name: req.body.name } });
        if(role)
            return res.status(204).json({ 'message': 'Role with same Name already exists.' });
        const newRole = req.body;
        await Role.create(newRole);
        res.json(newRole);
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const role = await Role.findOne({ where: { id: req.params.id } });
        if(!role)
            return res.status(204).json({ 'message': `No Role matching Id ${req.params.id} has been found.` });
        await Role.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
            );
        res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        const role = await Role.findOne({ where: { id: req.params.id } });
        if(!role)
            return res.status(204).json({ 'message': `No Role matching Id ${req.params.id} has been found.` });
        const anyUser = await User.findOne({ where: { RoleId: req.params.id } });
        if(anyUser)
            return res.status(204).json({ 'message': 'Role you tried to delete is used by at least 1 User.' });
        await Role.destroy({
            where: { id: req.params.id } }
        );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const roles = await Role.findAll();
        if (!roles.length) 
            return res.status(204).json({ 'message': 'No Roles found.' });
        res.json(roles);
    },
    
    getById: async (req, res) => {
        const role = await Role.findOne({ where: { id: req.params.id } });
        if(!role)
            return res.status(204).json({ 'message': `No Role matching Id ${req.params.id} has been found.` });
        res.json(role);
    },
    
    getByName: async (req, res) => {
        const role = await Role.findOne({ where: { name: req.params.name } });
        if(!role)
            return res.status(204).json({ 'message': `No Role matching Name '${req.params.name}' has been found.` });
        res.json(role);
    },
}