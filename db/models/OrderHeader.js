module.exports = (sequelize, DataTypes) => {
    const OrderHeader = sequelize.define("OrderHeader", {
        finalPrice: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    }, {
        tableName: 'order_headers'
    })

    OrderHeader.associate = (models) => {
        OrderHeader.belongsTo(models.Review)
        OrderHeader.belongsTo(models.Payment)
        OrderHeader.belongsTo(models.OrderStatus)
        OrderHeader.belongsTo(models.Table)
        OrderHeader.belongsTo(models.User, { as: 'Client' })
        OrderHeader.belongsTo(models.User, { as: 'Employee' })
        OrderHeader.hasMany(models.OrderDetails)
    }

    return OrderHeader
}