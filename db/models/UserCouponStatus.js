module.exports = (sequelize, DataTypes) => {
    const UserCouponStatus = sequelize.define("UserCouponStatus", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'user_coupon_statuses'
    })

    UserCouponStatus.associate = (models) => {
        UserCouponStatus.hasMany(models.UserCoupon, { onDelete: 'cascade' })
    }

    return UserCouponStatus
}