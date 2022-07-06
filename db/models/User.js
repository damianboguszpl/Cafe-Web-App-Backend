module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
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
        hourly_rate: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users'
    })

    User.associate = (models) => {
        User.belongsTo(models.Role)
        User.hasMany(models.Reservation)
        User.hasOne(models.Schedule)
        User.belongsToMany(models.Coupon, {
            through: "UserCoupon",
        })
    }

    // User.associate = (models) => {
    //     User.belongsToMany(models.Role, {
    //         through: "User_Role",
    //     })
    // }

    return User
}