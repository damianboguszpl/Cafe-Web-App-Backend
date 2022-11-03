module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define("Schedule", {
        monday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tuesday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wednesday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thursday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        friday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        saturday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sunday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        tableName: 'schedules'
    })

    Schedule.associate = (models) => {
        Schedule.belongsTo(models.User)
    }

    return Schedule
}