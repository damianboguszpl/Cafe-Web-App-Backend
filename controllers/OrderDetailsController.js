const { OrderDetails, OrderHeader, Product, UserCoupon } = require("../db/models");
const { updateOrderFinalPrice } = require("./utils/updateOrderFinalPrice")

module.exports = {
    create: async (req, res) => {
        if (!req?.body?.transaction_price)
            return res.status(400).json({ 'message': 'Nie podano ceny.' });
        if (!req?.body?.quantity)
            return res.status(400).json({ 'message': 'Nie podano ilości.' });
        if (!req?.body?.OrderHeaderId)
            return res.status(400).json({ 'message': 'Nie podano Id Zamówienia.' });
        if (!req?.body?.ProductId)
            return res.status(400).json({ 'message': 'Nie podano Id Produktu.' });

        const orderHeader = await OrderHeader.findByPk(req?.body?.OrderHeaderId);
        if (!orderHeader)
            return res.status(404).json({ 'message': `Nie znaleziono Zamówienia o Id ${req?.body?.OrderHeaderId}.` });
        const product = await Product.findByPk(req?.body?.ProductId);
        if (!product)
            return res.status(404).json({ 'message': `Nie znaleziono Produktu o Id ${req?.body?.ProductId}.` });

        const orderDetail = req.body;
        orderDetail.transaction_price = orderDetail.transaction_price.toFixed(2);
        const existstingNotCouponItem = await OrderDetails.findOne({
            where: { OrderHeaderId: orderDetail.OrderHeaderId, ProductId: orderDetail.ProductId, isCoupon: false }
        });

        console.log(req?.body?.isCoupon)
        if (!existstingNotCouponItem || (req?.body?.isCoupon && req?.body?.isCoupon == true)) {
            if(req?.body?.UserCouponId != null) {
                const existstingCouponItem = await OrderDetails.findOne({
                    where: { OrderHeaderId: orderDetail.OrderHeaderId, UserCouponId: req.body.UserCouponId }
                });
                if(existstingCouponItem != null) {
                    return res.status(400).json({ 'error': 'Ten Kupon jest już dodany do Zamówienia.' });
                }
                else {
                    await OrderDetails.create(orderDetail);
                    await UserCoupon.update({
                        UserCouponStatusId: 2
                    }, {
                        where: { id: req.body.UserCouponId }
                    });
                }
            }
            else {
                await OrderDetails.create(orderDetail);
            }
        }
        else {
            await OrderDetails.update(
                {
                    transaction_price: req.body.transaction_price,
                    quantity: existstingNotCouponItem.quantity + req.body.quantity,
                    OrderHeaderId: req.body.OrderHeaderId,
                    ProductId: req.body.ProductId,
                    isCoupon: req?.body?.isCoupon ? req.body.isCoupon : false
                },
                { where: { id: existstingNotCouponItem.id } }
            );
        }
        updateOrderFinalPrice(req.body.OrderHeaderId);
        res.json(orderDetail);
    },

    update: async (req, res) => {
        const orderDetail = await OrderDetails.findByPk(req.params.id);
        if (!orderDetail)
            return res.status(404).json({ 'message': `Nie znaleziono Składnika Zamówienia o Id ${req.params.id}.` });

        if (!req?.body?.transaction_price && !req?.body?.quantity && !req?.body?.OrderHeaderId && !req?.body?.ProductId && !req?.body?.isCoupon)
            return res.status(400).json({ 'message': 'Nie podano wymaganych danych.' });
        else {
            await OrderDetails.update(
                {
                    transaction_price: req?.body?.transaction_price ? req?.body?.transaction_price?.toFixed(2) : this.transaction_price?.toFixed(2),
                    quantity: req?.body?.quantity ? req.body.quantity : this.quantity,
                    OrderHeaderId: req?.body?.OrderHeaderId ? req.body.OrderHeaderId : this.OrderHeaderId,
                    ProductId: req?.body?.ProductId ? req.body.ProductId : this.ProductId,
                    isCoupon: req?.body?.isCoupon ? req.body.isCoupon : this.isCoupon
                },
                { where: { id: req.params.id } }
            );
            const orderDetails = await OrderDetails.findByPk(req.params.id);
            updateOrderFinalPrice(orderDetails.OrderHeaderId);
            res.json({'mesage': `Zaktualizowano Składnik Zamówienia.`});
        }
    },

    delete: async (req, res) => {
        const orderDetail = await OrderDetails.findByPk(req.params.id);
        if (!orderDetail)
            return res.status(404).json({ 'message': `Nie znaleziono Składnika Zamówienia o Id ${req.params.id}.` });
        else {
            const orderHeaderId = orderDetail.OrderHeaderId;
            if(orderDetail.UserCouponId != null) {
                await UserCoupon.update({
                    UserCouponStatusId: 1
                }, {
                    where: { id: orderDetail.UserCouponId }
                });
            }
            await OrderDetails.destroy({
                where: { id: req.params.id }
            }
            );
            updateOrderFinalPrice(orderHeaderId);
            res.json({'message': 'Usunięto Składnik Zamówienia.'});
        }
    },

    getAll: async (req, res) => {
        const orderDetails = await OrderDetails.findAll();
        if (!orderDetails.length)
            return res.status(404).json({ 'message': 'Nie znaleziono żadnych Składników Zamówień.' });
        res.json(orderDetails);
    },

    getById: async (req, res) => {
        const orderDetails = await OrderDetails.findOne({ where: { id: req.params.id } });
        if (!orderDetails)
            return res.status(404).json({ 'message': `Nie znaleziono Składnika Zamówienia o Id ${req.params.id}.` });
        res.json(orderDetails);
    },

    getByProductId: async (req, res) => {
        const id = req.params.id
        const orderDetails = await OrderDetails.findAll({ where: { ProductId: id } });
        if (!orderDetails.length)
            return res.status(404).json({ 'message': `Nie znaleziono żadnych Składników Zamówień na Produkt o Id ${req.params.id}.` });
        res.json(orderDetails);
    },

    getByOrderHeaderId: async (req, res) => {
        const orderheaderid = req.params.id
        const orderDetails = await OrderDetails.findAll({
            include: [{
                model: Product,
                attributes: [['name', 'name']]
            }],
            where: { OrderHeaderId: orderheaderid }
        }
        );
        res.json(orderDetails);
    },
}