module.exports = (sequelize, DataTypes) => {
    const UserCoupon = sequelize.define("UserCoupon", {
        is_available: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        expiration_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        tableName: 'user_coupons'
    })

    return UserCoupon
}