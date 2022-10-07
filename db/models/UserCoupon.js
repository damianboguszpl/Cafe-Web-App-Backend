module.exports = (sequelize, DataTypes) => {
    const UserCoupon = sequelize.define("UserCoupon", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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