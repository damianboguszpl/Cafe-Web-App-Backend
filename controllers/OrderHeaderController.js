const { OrderHeader, OrderDetails, Review, Payment, User, OrderStatus, Table } = require("../db/models")

module.exports = {
    // create new OrderHeader
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
                return res.status(404).json({ 'message': `No Client matching ID ${req?.body?.ClientId} has been found.` });
        }

        const employee = await User.findByPk(req?.body?.EmployeeId);
        if(!employee)
            return res.status(404).json({ 'message': `No Employee matching ID ${req?.body?.EmployeeId} has been found.` });
        
        if(req?.body?.ReviewId && req?.body?.ReviewId != null) {
            const review = await Review.findByPk(req?.body?.ReviewId);
            if(!review)
                return res.status(404).json({ 'message': `No Review matching ID ${req?.body?.ReviewId} has been found.` });
        }

        const payment = await Payment.findByPk(req?.body?.PaymentId);
        if(!payment)
            return res.status(404).json({ 'message': `No Payment matching ID ${req?.body?.PaymentId} has been found.` });
        
        const orderStatus = await OrderStatus.findByPk(req?.body?.OrderStatusId);
        if(!orderStatus)
            return res.status(404).json({ 'message': `No OrderStatus matching ID ${req?.body?.OrderStatusId} has been found.` });
        
        if(req?.body?.TableId && req?.body?.TableId != null) {
            const table = await Table.findByPk(req?.body?.TableId);
            if(!table)
                return res.status(404).json({ 'message': `No Table matching ID ${req?.body?.TableId} has been found.` });
        }

        const orderHeader = req.body;
        await OrderHeader.create(orderHeader).then(result => res.json(result))
    },
    // update OrderHeader
    update: async (req, res) => {
        const orderHeader = await OrderHeader.findByPk(req.params.id);
        if(!orderHeader)
            return res.status(404).json({ 'message': `No OrderHeader matching ID ${req.params.id} has been found.` });
        // if (!req?.body?.ClientId && !req?.body?.ReviewId && !req?.body?.TableId) 
        // if (!req?.body?.ClientId && !req?.body?.ReviewId && !req?.body?.TableId) 
        //     return res.status(400).json({ 'message': 'None of the required parameters were passed.' });
        
        if(req?.body?.ClientId && req?.body?.ClientId != null) {
            const client = await User.findByPk(req?.body?.ClientId);
            if(!client)
                return res.status(404).json({ 'message': `No Client matching ID ${req?.body?.ClientId} has been found.` });
        }
        if(req?.body?.EmployeeId && req?.body?.EmployeeId != null) {
            const employee = await User.findByPk(req?.body?.EmployeeId);
            if(!employee)
                return res.status(404).json({ 'message': `No Employee matching ID ${req?.body?.EmployeeId} has been found.` });
        }
        if(req?.body?.ReviewId && req?.body?.ReviewId != null) {
            const review = await Review.findByPk(req?.body?.ReviewId);
            if(!review)
                return res.status(404).json({ 'message': `No Review matching ID ${req?.body?.ReviewId} has been found.` });
        }
        if(req?.body?.PaymentId && req?.body?.PaymentId != null) {
            const payment = await Payment.findByPk(req?.body?.PaymentId);
            if(!payment)
                return res.status(404).json({ 'message': `No Payment matching ID ${req?.body?.PaymentId} has been found.` });
        }
        if(req?.body?.OrderStatusId && req?.body?.OrderStatusId != null) {
            const orderStatus = await OrderStatus.findByPk(req?.body?.OrderStatusId);
            if(!orderStatus)
                return res.status(404).json({ 'message': `No OrderStatus matching ID ${req?.body?.OrderStatusId} has been found.` });
        }
        if(req?.body?.TableId && req?.body?.TableId != null) {
            const table = await Table.findByPk(req?.body?.TableId);
            if(!table)
                return res.status(404).json({ 'message': `No Table matching ID ${req?.body?.TableId} has been found.` });
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
            {
                where: {
                    id: req.params.id
                }
            });

        res.json("Updated successfully.");
    },
    // delete OrderHeader
    delete: async (req, res) => {
        const orderHeader = await OrderHeader.findByPk(req.params.id);
        if(!orderHeader)
            return res.status(404).json({ 'message': `No OrderHeader matching ID ${req.params.id} has been found.` });
        else {
            const orderDetails = await OrderDetails.findAll({ where: { OrderHeaderId: req.params.id } });
            
            await OrderDetails.destroy({
                where: {
                    OrderHeaderId: req.params.id
                }
            })

            await OrderHeader.destroy({
                where: {
                    id: req.params.id
                }
            })
            
            res.json("Deleted successfully.");
        }
    },
    // get all OrderHeaders
    getAll: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll();
        res.json(orderHeaders);
    },
    // get Category /w specific id
    getById: async (req, res) => {
        const orderHeader = await OrderHeader.findOne({ where: { id: req.params.id } });
        res.json(orderHeader);
    },
    // get OrderHeaders by PaymentId
    getByPaymentId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { PaymentId: req.params.id } });
        res.json(orderHeaders);
    },
    // get OrderHeaders by ClientId
    getByClientId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { ClientId: req.params.id } });
        res.json(orderHeaders);
    },
    // get OrderHeaders by EmployeeId
    getByEmployeeId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { EmployeeId: req.params.id } });
        res.json(orderHeaders);
    },
    // get OrderHeaders by OrderStatusId
    getByOrderStatusId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { OrderStatusId: req.params.id } });
        res.json(orderHeaders);
    },
    // get OrderHeaders by ReviewId
    getByReviewId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { ReviewId: req.params.id } });
        res.json(orderHeaders);
    },
    // get OrderHeaders by ReviewId
    getByTableId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { TableId: req.params.id } });
        res.json(orderHeaders);
    }
}