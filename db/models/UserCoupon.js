module.exports = (sequelize, DataTypes) => {
    const UserCoupon = sequelize.define("UserCoupon", {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiration_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        tableName: 'user_coupons'
    })

    UserCoupon.associate = (models) => {
        UserCoupon.belongsTo(models.Coupon)
        UserCoupon.belongsTo(models.User)
        UserCoupon.belongsTo(models.UserCouponStatus)
    }
    return UserCoupon
}