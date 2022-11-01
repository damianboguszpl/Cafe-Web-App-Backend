module.exports = (sequelize, DataTypes) => {
    const OrderHeader = sequelize.define("OrderHeader", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        // ClientId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // EmployeeId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
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
        // OrderHeader.belongsTo(models.OrderDetails)
    }

    return OrderHeader
}