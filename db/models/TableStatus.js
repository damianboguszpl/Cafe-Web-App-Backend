const Table = require("./Table")

module.exports = (sequelize, DataTypes) => {
    const TableStatus = sequelize.define("TableStatus", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'table_statuses'
    })

    TableStatus.associate = (models) => {
        TableStatus.hasMany(models.Table, {onDelete: 'cascade'})
    }

    return TableStatus
}