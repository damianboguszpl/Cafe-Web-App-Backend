const { Payment } = require("../db/models")

module.exports = {
    // create new Payment
    create: async (req,res) => {
        const payment = req.body;
        await Payment.create(payment);
        res.json(payment);
    },
    // update Payment
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await Payment.update(
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
    // delete Payment
    delete: async (req,res) => {
        const id = req.params.id;
        await Payment.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
    // get all Payments
    getAll: async (req, res) => {
        const payments = await Payment.findAll();
        res.json(payments);
    },
    // get Payment /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const payment = await Payment.findByPk(id);
        res.json(payment);
    },
    // get Payment by name
    getByName: async (req, res) => {
        const name = req.params.name
        const payment = await Payment.findOne({ where: { name: name } });
        res.json(payment);
    },
}