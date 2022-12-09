module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define("OrderDetails", {
        transaction_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isCoupon: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        tableName: 'order_details'
    })

    OrderDetails.associate = (models) => {
        OrderDetails.belongsTo(models.OrderHeader)
        OrderDetails.belongsTo(models.Product)
        OrderDetails.belongsTo(models.UserCoupon)
    }

    return OrderDetails
}