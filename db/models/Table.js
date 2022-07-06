module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define("Table", {
        number_of_seats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'tables'
    })

    Table.associate = (models) => {
        Table.belongsTo(models.TableStatus)
        Table.hasMany(models.Reservation, {onDelete: 'cascade'})
    }

    return Table
}