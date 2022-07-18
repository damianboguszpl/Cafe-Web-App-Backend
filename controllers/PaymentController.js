const { Payment } = require("../db/models")

module.exports = {
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
    }
}