module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'payments'
    })

    return Payment
}