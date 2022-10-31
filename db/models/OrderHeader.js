module.exports = (sequelize, DataTypes) => {
    const OrderHeader = sequelize.define("OrderHeader", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
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