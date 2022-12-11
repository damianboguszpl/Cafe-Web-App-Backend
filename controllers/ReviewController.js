const { Review } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.title)
            return res.status(400).json({ 'message': 'Title parameter not specified.' });
        if (!req?.body?.body)
            return res.status(400).json({ 'message': 'Body parameter not specified.' });
        const review = req.body;
        await Review.create(review).then(result => res.json(result));
    },
    
    update: async (req,res) => {
        const review = await Review.findOne({ where: { id: req.params.id } });
        if(!review)
            return res.status(204).json({ 'message': `No Review matching ID ${req.params.id} has been found.` });
        
        if (!req?.body?.title || !req?.body?.body)
            return res.status(400).json({ 'message': 'Required parameters Title and Body were not passed.' });
        
        const id = req.params.id;
        await Review.update(
            { 
                title: req.body.title,
                body: req.body.body,
                OrderHeaderId: req.body.OrderHeaderId
            }, 
            { where: { id: id } }
        );
        res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        const review = await Review.findOne({ where: { id: req.params.id } });
        if(!review)
            return res.status(204).json({ 'message': `No Review matching Id ${req.params.id} has been found.` });
        const id = req.params.id;
        await Review.destroy({
            where: { id: id } }
        )
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const reviews = await Review.findAll();
        if (!reviews.length) 
            return res.status(204).json({ 'message': 'No Reviews found.' });
        res.json(reviews);
    },
    
    getById: async (req, res) => {
        const review = await Review.findOne({ where: { id: req.params.id } });
        if(!review)
            return res.status(204).json({ 'message': `No Review matching Id ${req.params.id} has been found.` });
        res.json(review);
    }
}