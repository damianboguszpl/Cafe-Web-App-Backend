module.exports = (sequelize, DataTypes) => {
    const OrderHeader = sequelize.define("OrderHeader", {
        ClientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        EmployeeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'order_headers'
    })

    OrderHeader.associate = (models) => {
        OrderHeader.belongsTo(models.Review)
        OrderHeader.belongsTo(models.Payment)
        OrderHeader.belongsTo(models.OrderStatus)
        // OrderHeader.belongsTo(models.OrderDetails)
    }

    return OrderHeader
}