module.exports = (sequelize, DataTypes) => {
    const SpecialOffer = sequelize.define("SpecialOffer", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        is_available: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
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
        tableName: 'special_offers'
    })


    return SpecialOffer
}