const { OrderHeader } = require("../db/models")

module.exports = {
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