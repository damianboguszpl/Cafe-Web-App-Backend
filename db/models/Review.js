module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'reviews'
    })

    return Review
}