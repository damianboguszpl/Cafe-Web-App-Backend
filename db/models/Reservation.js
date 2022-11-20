module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define("Reservation", {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        tableName: 'reservations'
    })

    Reservation.associate = (models) => {
        Reservation.belongsTo(models.ReservationStatus)
        Reservation.belongsTo(models.Table)
        Reservation.belongsTo(models.User, { as: 'Client' })
        Reservation.belongsTo(models.User, { as: 'Employee' })
    }

    return Reservation
}