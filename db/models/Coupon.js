module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define("Coupon", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        pointPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        tableName: 'coupons'
    })

    Coupon.associate = (models) => {
        Coupon.belongsTo(models.Product)
    }

    return Coupon
}