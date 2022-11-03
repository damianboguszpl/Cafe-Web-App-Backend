module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        allergen: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'products'
    })

    Product.associate = (models) => {
        Product.belongsTo(models.Category)
        Product.belongsTo(models.ProductStatus)
        Product.hasMany(models.Coupon)
    }

    return Product
}