module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'users'
    })

    User.associate = (models) => {
        User.belongsTo(models.Role)
        // User.hasMany(models.Reservation)

        // User.belongsToMany(models.Coupon, { through: "UserCoupon" }) // Automatyczna relacja m:n z tabelą łączącą nie pozwala na duplikaty, czyli user nie mógłby mieć kilku takich samych kuponów
        // User.belongsTo(models.UserCoupon)
    }

    return User
}