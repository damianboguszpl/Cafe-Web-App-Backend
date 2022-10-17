module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
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

    // Review.associate = (models) => {
    //     Review.belongsTo(models.OrderHeader)
    // }

    return Review
}