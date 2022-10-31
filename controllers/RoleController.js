const { Role } = require("../db/models")

module.exports = {
    // create new Role
    create: async (req,res) => {
        const role = req.body;
        await Role.create(role);
        res.json(role);
    },
    // update Role
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await Role.update(
            { 
                name: req.body.name
            }, 
            {
            where: {
                id: id
            }
            });

        res.json("Updated successfully.");
    },
    // delete Role
    delete: async (req,res) => {
        const id = req.params.id;
        await Role.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
    // get all Roles
    getAll: async (req, res) => {
        const roles = await Role.findAll();
        res.json(roles);
    },
    // get Role /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const role = await Role.findByPk(id);
        res.json(role);
    },
    // get Role by name
    getByName: async (req, res) => {
        const name = req.params.name
        const role = await Role.findOne({ where: { name: name } });
        res.json(role);
    },
}