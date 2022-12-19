const { OrderHeader, OrderDetails, Review, Payment, User, OrderStatus, Table, UserCoupon, Product } = require("../db/models")

module.exports = {
    create: async (req,res) => {
        const orderHeader = req.body;
        await OrderHeader.create(orderHeader).then(result => {
            res.json(result)
        });
    },
    
    update: async (req, res) => {
        const orderHeader = await OrderHeader.findByPk(req.params.id);
        if(!orderHeader)
            return res.status(404).json({ 'message': `Nie znaleziono Zamówienia o Id ${req.params.id}.` });
        
        if(req?.body?.ClientId && req?.body?.ClientId != null) {
            const client = await User.findByPk(req?.body?.ClientId);
            if(!client)
                return res.status(404).json({ 'message': `Nie znaleziono Klienta o Id ${req?.body?.ClientId}.` });
        }
        if(req?.body?.EmployeeId && req?.body?.EmployeeId != null) {
            const employee = await User.findByPk(req?.body?.EmployeeId);
            if(!employee)
                return res.status(404).json({ 'message': `Nie znaleziono Pracownika o Id ${req?.body?.EmployeeId}.` });
        }
        if(req?.body?.ReviewId && req?.body?.ReviewId != null) {
            const review = await Review.findByPk(req?.body?.ReviewId);
            if(!review)
                return res.status(404).json({ 'message': `Nie znaleziono Recenzji o Id ${req?.body?.ReviewId}.` });
        }
        if(req?.body?.PaymentId && req?.body?.PaymentId != null) {
            const payment = await Payment.findByPk(req?.body?.PaymentId);
            if(!payment)
                return res.status(404).json({ 'message': `Nie znaleziono Płatności o Id ${req?.body?.PaymentId}.` });
        }
        if(req?.body?.OrderStatusId && req?.body?.OrderStatusId != null) {
            const orderStatus = await OrderStatus.findByPk(req?.body?.OrderStatusId);
            if(!orderStatus)
                return res.status(404).json({ 'message': `Nie znaleziono Statusu Zamówienia o Id ${req?.body?.OrderStatusId}.` });
        }
        if(req?.body?.TableId && req?.body?.TableId != null) {
            const table = await Table.findByPk(req?.body?.TableId);
            if(!table)
                return res.status(404).json({ 'message': `Nie znaleziono Stolika o Id ${req?.body?.TableId}.` });
        }
        await OrderHeader.update(
            {
                ClientId: req?.body?.ClientId ? req.body.ClientId : this.ClientId,
                EmployeeId: req?.body?.EmployeeId ? req.body.EmployeeId : this.EmployeeId,
                ReviewId: req?.body?.ReviewId ? req.body.ReviewId : this.ReviewId,
                PaymentId: req?.body?.PaymentId ? req.body.PaymentId: this.PaymentId,
                OrderStatusId: req?.body?.OrderStatusId ? req.body.OrderStatusId : this.OrderStatusId,
                TableId: req?.body?.TableId ? req.body.TableId : this.TableId,
                finalPrice: req?.body?.finalPrice ? req.body.finalPrice : this.finalPrice
            },
            { where: { id: req.params.id } }
        );

        if(req?.body?.OrderStatusId === 3) {
            const details = await OrderDetails.findAll({ where: { OrderHeaderId: req.params.id, isCoupon: true } });
            if(details != null) {
                console.log(details)
                details.forEach( (orderDetail) => {
                    console.log(orderDetail)
                    UserCoupon.update({
                        UserCouponStatusId: 1
                    }, {
                        where: { id: orderDetail.UserCouponId }
                    });
                    OrderDetails.destroy({
                        where: { id: orderDetail.id }
                    })
                });
            }
        }

        res.json({'message': `Zaktualizowano Zamówienie.`});
    },
    
    delete: async (req, res) => {
        const orderHeader = await OrderHeader.findByPk(req.params.id);
        if(!orderHeader)
            return res.status(404).json({ 'message': `Nie znaleziono Zamówienia o Id ${req.params.id}.` });
        else {
            await OrderDetails.destroy({
                where: { OrderHeaderId: req.params.id } }
            );
            await OrderHeader.destroy({
                where: { id: req.params.id } }
            );
            res.json({'message': `Usunięto Zamówienie.`});
        }
    },
    
    getAll: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll();
        if (!orderHeaders.length) 
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Zamówień.' });
        res.json(orderHeaders);
    },
    
    getById: async (req, res) => {
        const orderHeader = await OrderHeader.findOne({ where: { id: req.params.id } });
        if(!orderHeader)
            return res.status(404).json({ 'message': `Nie znaleziono Zamówienia o Id ${req.params.id}.` });
        res.json(orderHeader);
    },
    
    getByPaymentId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { PaymentId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(404).json({ 'message': `Nie znaleziono Zamówień z Płatnościa o Id ${req.params.id}.` });
        res.json(orderHeaders);
    },
    
    getByClientId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ 
            where: { ClientId: req.params.id },
            include: [{
                model: OrderDetails,
                attributes: ['id', 'transaction_price', 'quantity', 'isCoupon', 'ProductId', 'UserCouponId'],
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'size', 'price', 'allergen', 'CategoryId', 'ProductStatusId']
                }],
            }],
        });
        if(!orderHeaders.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Zamówień Klienta o Id ${req.params.id}.` });
        res.json(orderHeaders);
    },
    
    getByEmployeeId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { EmployeeId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Zamówień dodanych przez Pracownika o Id ${req.params.id}.` });
        res.json(orderHeaders);
    },
    
    getByOrderStatusId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { OrderStatusId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Zamówień ze Statusem o Id ${req.params.id}.` });
        res.json(orderHeaders);
    },
    
    getByReviewId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { ReviewId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(404).json({ 'message': `Nie znaleziono Zamówienia z Recenzją o Id ${req.params.id}.` });
        res.json(orderHeaders);
    },
    
    getByTableId: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll({ where: { TableId: req.params.id } });
        if(!orderHeaders.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Zamówień ze Stolikiem o Id ${req.params.id}.` });
        res.json(orderHeaders);
    }
}