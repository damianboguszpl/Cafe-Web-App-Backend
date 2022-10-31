module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'payments'
    })

    Payment.associate = (models) => {
        // Payment.belongsTo(models.OrderHeader)
    }

    return Payment
}