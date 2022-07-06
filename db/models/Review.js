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

    Review.associate = (models) => {
        Review.belongsTo(models.OrderHeader)
    }

    return Review
}