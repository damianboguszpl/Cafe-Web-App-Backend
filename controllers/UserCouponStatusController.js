const { UserCouponStatus, UserCoupon } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const userCouponStatus = await UserCouponStatus.findOne({ where: { name: req.body.name } });
        if(userCouponStatus)
            return res.status(204).json({ 'message': 'UserCouponStatus with same Name already exists.' });
        const newUserCouponStatus = req.body;
        await UserCouponStatus.create(newUserCouponStatus);
        res.json(newUserCouponStatus);
    },
    
    update: async (req,res) => {
        if (!req?.body?.name)
            return res.status(400).json({ 'message': 'Name parameter not specified.' });
        const userCouponStatus = await UserCouponStatus.findOne({ where: { id: req.params.id } });
        if(!userCouponStatus)
            return res.status(204).json({ 'message': `No UserCouponStatus matching Id ${req.params.id} has been found.` });
        await UserCouponStatus.update(
            { name: req.body.name }, 
            { where: { id: req.params.id } }
        );
        res.json("Updated successfully.");
    },
    
    delete: async (req,res) => {
        const userCouponStatus = await UserCouponStatus.findOne({ where: { id: req.params.id } });
        if(!userCouponStatus)
            return res.status(204).json({ 'message': `No UserCouponStatus matching Id ${req.params.id} has been found.` });
        const anyUserCoupon = await UserCoupon.findOne({ where: { UserCouponStatusId: req.params.id } });
        if(anyUserCoupon)
            return res.status(204).json({ 'message': 'UserCouponStatus you tried to delete is used by at least 1 UserCoupon.' });
        await UserCouponStatus.destroy(
            { where: { id: req.params.id } }
        );
        res.json("Deleted successfully.");
    },
    
    getAll: async (req, res) => {
        const userCouponStatuses = await UserCouponStatus.findAll();
        if (!userCouponStatuses.length)
            return res.status(204).json({ 'message': 'No UserCouponStatuses found.' });
        res.json(userCouponStatuses);
    },
    
    getById: async (req, res) => {
        const userCouponStatus = await UserCouponStatus.findOne({ where: { id: req.params.id } });
        if(!userCouponStatus)
            return res.status(204).json({ 'message': `No UserCouponStatus matching Id ${req.params.id} has been found.` });
        res.json(userCouponStatus);
    },
    
    getByName: async (req, res) => {
        const name = req.params.name
        const userCouponStatus = await UserCouponStatus.findOne({ where: { name: name } });
        if(!userCouponStatus)
            return res.status(204).json({ 'message': `No UserCouponStatus matching Name '${req.params.name}' has been found.` });
        res.json(userCouponStatus);
    },
}