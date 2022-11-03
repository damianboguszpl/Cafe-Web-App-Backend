module.exports = (sequelize, DataTypes) => {
    const OrderStatus = sequelize.define("OrderStatus", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'order_statuses'
    })

    OrderStatus.associate = (models) => {
        // OrderStatus.belongsTo(models.OrderHeader)
    }

    return OrderStatus
}