const { Category } = require("../db/models")

module.exports = {
    // create new Category
    create: async (req,res) => {
        const category = req.body;
        await Category.create(category);
        res.json(category);
    },
    // update Category
    update: async (req,res) => {
        const id = req.params.id;
        // console.log(id + " -> " + req.body.name)
        const updated = await Category.update(
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
    // delete Category
    delete: async (req,res) => {
        const id = req.params.id;
        await Category.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
    // get all Categories
    getAll: async (req, res) => {
        const categories = await Category.findAll();
        res.json(categories);
    },
    // get Category /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const category = await Category.findByPk(id);
        res.json(category);
    },
    // get Category by name
    getByName: async (req, res) => {
        const name = req.params.name
        const category = await Category.findOne({ where: { name: name } });
        res.json(category);
    },
}