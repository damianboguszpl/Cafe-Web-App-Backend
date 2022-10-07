module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define("Coupon", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        point_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_available: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    }, {
        tableName: 'coupons'
    })

    Coupon.associate = (models) => {
        Coupon.belongsTo(models.Product)
        Coupon.belongsToMany(models.User, {
            through: "UserCoupon"})
    }

    return Coupon
}