module.exports = (sequelize, DataTypes) => {
    const ReservationStatus = sequelize.define("ReservationStatus", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'reservation_statuses'
    })

    ReservationStatus.associate = (models) => {
        ReservationStatus.hasMany(models.Reservation, {onDelete: 'cascade'})
    }

    return ReservationStatus
}