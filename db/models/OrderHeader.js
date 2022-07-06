module.exports = (sequelize, DataTypes) => {
    const OrderHeader = sequelize.define("OrderHeader", {
        // name: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
    }, {
        tableName: 'order_headers'
    })

    OrderHeader.associate = (models) => {
        OrderHeader.hasOne(models.Review)
        OrderHeader.hasOne(models.Payment)
        OrderHeader.hasOne(models.OrderStatus)
        OrderHeader.hasMany(models.OrderDetails)
    }

    return OrderHeader
}