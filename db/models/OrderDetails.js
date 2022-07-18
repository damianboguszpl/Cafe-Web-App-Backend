module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define("OrderDetails", {
        transaction_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'order_details'
    })

    OrderDetails.associate = (models) => {
        OrderDetails.belongsTo(models.OrderHeader)
        OrderDetails.belongsTo(models.Product)
    }

    return OrderDetails
}