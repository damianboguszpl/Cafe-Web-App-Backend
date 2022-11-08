const { OrderHeader, OrderDetails, Review, Payment, User, OrderStatus, Table } = require("../db/models")

module.exports = {
    create: async (req, res) => {
        if (!req?.body?.EmployeeId)
            return res.status(400).json({ 'message': 'EmployeeId parameter not specified.' });
        // if (!req?.body?.PaymentId)
        //     return res.status(400).json({ 'message': 'PaymentId parameter not specified.' });
        if (!req?.body?.OrderStatusId)
            return res.status(400).json({ 'message': 'OrderStatusId parameter not specified.' });
        
        if(req?.body?.ClientId && req?.body?.ClientId != null) {
            const client = await User.findByPk(req?.body?.ClientId);
            if(!client)
                return res.status(404).json({ 'message': `No Client matching Id ${req?.body?.ClientId} has been found.` });
        }

        const employee = await User.findByPk(req?.body?.EmployeeId);
        if(!employee)
            return res.status(404).json({ 'message': `No Employee matching Id ${req?.body?.EmployeeId} has been found.` });
        
        if(req?.body?.ReviewId && req?.body?.ReviewId != null) {
            const review = await Review.findByPk(req?.body?.ReviewId);
            if(!review)
                return res.status(404).json({ 'message': `No Review matching Id ${req?.body?.ReviewId} has been found.` });
        }

        // const payment = await Payment.findByPk(req?.body?.PaymentId);
        // if(!payment)
        //     return res.status(404).json({ 'message': `No Payment matching Id ${req?.body?.PaymentId} has been found.` });
        
        const orderStatus = await OrderStatus.findByPk(req?.body?.OrderStatusId);
        if(!orderStatus)
            return res.status(404).json({ 'message': `No OrderStatus matching Id ${req?.body?.OrderStatusId} has been found.` });
        
        if(req?.body?.TableId && req?.body?.TableId != null) {
            const table = await Table.findByPk(req?.body?.TableId);
            if(!table)
                return res.status(404).json({ 'message': `No Table matching Id ${req?.body?.TableId} has been found.` });
        }
        const orderHeader = req.body;
        await OrderHeader.create(orderHeader).then(result => res.json(result));
    },
    
    update: async (req, res) => {
        const orderHeader = await OrderHeader.findByPk(req.params.id);
        if(!orderHeader)
            return res.status(404).json({ 'message': `No OrderHeader matching Id ${req.params.id} has been found.` });
        // if (!req?.body?.ClientId && !req?.body?.ReviewId && !req?.body?.TableId) 
        // if (!req?.body?.ClientId && !req?.body?.ReviewId && !req?.body?.TableId) 
        //     return res.status(400).json({ 'message': 'None of the required parameters were passed.' });
        
        if(req?.body?.ClientId && req?.body?.ClientId != null) {
            const client = await User.findByPk(req?.body?.ClientId);
            if(!client)
                return res.status(404).json({ 'message': `No Client matching Id ${req?.body?.ClientId} has been found.` });
        }
        if(req?.body?.EmployeeId && req?.body?.EmployeeId != null) {
            const employee = await User.findByPk(req?.body?.EmployeeId);
            if(!employee)
                return res.status(404).json({ 'message': `No Employee matching Id ${req?.body?.EmployeeId} has been found.` });
        }
        if(req?.body?.ReviewId && req?.body?.ReviewId != null) {
            const review = await Review.findByPk(req?.body?.ReviewId);
            if(!review)
                return res.status(404).json({ 'message': `No Review matching Id ${req?.body?.ReviewId} has been found.` });
        }
        if(req?.body?.PaymentId && req?.body?.PaymentId != null) {
            const payment = await Payment.findByPk(req?.body?.PaymentId);
            if(!payment)
                return res.status(404).json({ 'message': `No Payment matching Id ${req?.body?.PaymentId} has been found.` });
        }
        if(req?.body?.OrderStatusId && req?.body?.OrderStatusId != null) {
            const orderStatus = await OrderStatus.findByPk(req?.body?.OrderStatusId);
            if(!orderStatus)
                return res.status(404).json({ 'message': `No OrderStatus matching Id ${req?.body?.OrderStatusId} has been found.` });
        }
        if(req?.body?.TableId && req?.body?.TableId != null) {
            const table = await Table.findByPk(req?.body?.TableId);
            if(!table)
                return res.status(404).json({ 'message': `No Table matching Id ${req?.body?.TableId} has been found.` });
        }
        await OrderHeader.update(
            {
                ClientId: req?.body?.ClientId ? req.body.ClientId : this.ClientId,
                EmployeeId: req?.body?.EmployeeId ? req.body.EmployeeId : this.EmployeeId,
                ReviewId: req?.body?.ReviewId ? req.body.ReviewId : this.ReviewId,
                PaymentId: req?.body?.PaymentId ? req.body.PaymentId: this.PaymentId,
                OrderStatusId: req?.body?.OrderStatusId ? req.body.OrderStatusId : this.OrderStatusId,
                TableId: req?.body?.TableId ? req.body.TableId : this.TableId
            },
            { where: { id: req.params.id } }
        );
        res.json("Updated successfully.");
    },
    
    delete: async (req, res) => {
        const orderHeader = await OrderHeader.findByPk(req.params.id);
        if(!orderHeader)
            return res.status(404).json({ 'message': `No OrderHeader matching Id ${req.params.id} has been found.` });
        else {
            await OrderDetails.findAll({ where: { OrderHeaderId: req.params.id } });
            await OrderDetails.destroy({
                where: { OrderHeaderId: req.params.id } }
            );
            await OrderHeader.destroy({
                where: { id: req.params.id } }
            );
            res.json("Deleted successfully.");
        }
    },
    
    getAll: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll();
        if (!orderHeaders.length) 
            return res.status(204).json({ 'message': 'No OrderHeaders found.' });
        res.json(orderHeaders);
    },
    
    getById: async (req, res) => {
        const orderHeader = await OrderHeader.findOne({ where: { id: req.params.id } });
        if(!orderHeader)
            return res.status(204).json({ 'message': `No OrderHeader matching Id ${req.params.id} has been found.` });
        res.json(orderHeader);
    },
    
    getByPaymentId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { PaymentId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(204).json({ 'message': `No OrderHeaders matching PaymentId ${req.params.id} have been found.` });
        res.json(orderHeaders);
    },
    
    getByClientId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { ClientId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(204).json({ 'message': `No OrderHeaders matching ClientId ${req.params.id} have been found.` });
        res.json(orderHeaders);
    },
    
    getByEmployeeId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { EmployeeId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(204).json({ 'message': `No OrderHeaders matching EmployeeId ${req.params.id} have been found.` });
        res.json(orderHeaders);
    },
    
    getByOrderStatusId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { OrderStatusId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(204).json({ 'message': `No OrderHeaders matching OrderStatusId ${req.params.id} have been found.` });
        res.json(orderHeaders);
    },
    
    getByReviewId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { ReviewId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(204).json({ 'message': `No OrderHeaders matching ReviewId ${req.params.id} have been found.` });
        res.json(orderHeaders);
    },
    
    getByTableId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { TableId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(204).json({ 'message': `No OrderHeaders matching TableId ${req.params.id} have been found.` });
        res.json(orderHeaders);
    }
}