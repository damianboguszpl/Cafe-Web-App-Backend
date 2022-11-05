module.exports = (sequelize, DataTypes) => {
    const PasswordResetCode = sequelize.define("PasswordResetCode", {
        resetCode: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    }, {
        tableName: 'passwordresetcodes'
    })

    return PasswordResetCode
}