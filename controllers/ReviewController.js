const { Review } = require("../db/models")

module.exports = {
    // get all Reviews
    getAll: async (req, res) => {
        const reviews = await Review.findAll();
        res.json(reviews);
    },
    // get Review /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const review = await Review.findByPk(id);
        res.json(review);
    }
}