const { OrderDetails, OrderHeader } = require("../../db/models")

module.exports = {
    updateOrderFinalPrice: async function(orderHeaderId) {
        if(orderHeaderId != null) {
            const orderDetails = await OrderDetails.findAll({ where: { OrderHeaderId: orderHeaderId } });
            var orderPrice = 0;

            orderDetails.forEach(item => {
                orderPrice += item.quantity * item.transaction_price;
            });

            await OrderHeader.update(
                { finalPrice: orderPrice },
                { where: { id: orderHeaderId } }
            )
        }
    }
}