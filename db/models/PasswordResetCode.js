module.exports = (sequelize, DataTypes) => {
    const PasswordResetCode = sequelize.define("PasswordResetCode", {
        resetCode: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'password_reset_codes'
    })

    PasswordResetCode.associate = (models) => {
        PasswordResetCode.belongsTo(models.User)
    }

    return PasswordResetCode
}