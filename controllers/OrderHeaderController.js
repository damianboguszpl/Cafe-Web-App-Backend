const { OrderHeader } = require("../db/models")

module.exports = {
    // create new OrderHeader
    create: async (req, res) => {
        const orderHeader = req.body;
        // await OrderHeader.create(orderHeader);
        // res.json(orderHeader);
        await OrderHeader.create(orderHeader).then(result => res.json(result))
    },
    // update OrderHeader
    update: async (req, res) => {
        const id = req.params.id;
        const updated = await OrderHeader.update(
            {
                ClientId: req.body.ClientId,
                EmployeeId: req.body.EmployeeId,
                ReviewId: req.body.ReviewId,
                PaymentId: req.body.PaymentId,
                OrderStatusId: req.body.OrderStatusId
            },
            {
                where: {
                    id: id
                }
            });

        res.json("Updated successfully.");
    },
    // delete OrderHeader
    delete: async (req, res) => {
        const id = req.params.id;
        await OrderHeader.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
    // get all OrderHeaders
    getAll: async (req, res) => {
        const orderHeaders = await OrderHeader.findAll();
        res.json(orderHeaders);
    },
    // get Category /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const orderHeader = await OrderHeader.findByPk(id);
        res.json(orderHeader);
    },
    // get OrderHeaders by PaymentId
    getByPaymentId: async (req, res) => {
        const paymentid = req.params.paymentid
        const orderHeaders = await OrderHeader.findAll({ where: { PaymentId: paymentid } });
        res.json(orderHeaders);
    },
    // get OrderHeaders by ClientId
    getByClientId: async (req, res) => {
        const clientid = req.params.clientid
        const orderHeaders = await OrderHeader.findAll({ where: { ClientId: clientid } });
        res.json(orderHeaders);
    },
    // get OrderHeaders by EmployeeId
    getByEmployeeId: async (req, res) => {
        const employeeid = req.params.employeeid
        const orderHeaders = await OrderHeader.findAll({ where: { EmployeeId: employeeid } });
        res.json(orderHeaders);
    },
    // get OrderHeaders by OrderStatusId
    getByOrderStatusId: async (req, res) => {
        const orderstatusid = req.params.orderstatusid
        const orderHeaders = await OrderHeader.findAll({ where: { OrderStatusId: orderstatusid } });
        res.json(orderHeaders);
    },
    // get OrderHeaders by ReviewId
    getByReviewId: async (req, res) => {
        const reviewid = req.params.reviewid
        const orderHeaders = await OrderHeader.findAll({ where: { ReviewId: reviewid } });
        res.json(orderHeaders);
    },

}