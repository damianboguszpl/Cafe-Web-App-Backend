const { Review } = require("../db/models")

module.exports = {
    // create new Review
    create: async (req,res) => {
        const review = req.body;
        await Review.create(review);
        res.json(review);
    },
    // update Review
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await Review.update(
            { 
                title: req.body.title,
                body: req.body.body,
                OrderHeaderId: req.body.OrderHeaderId
            }, 
            {
            where: {
                id: id
            }
            });

        res.json("Updated successfully.");
    },
    // delete Review
    delete: async (req,res) => {
        const id = req.params.id;
        await Review.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
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