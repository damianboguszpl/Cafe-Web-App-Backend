module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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
        is_available: {
            type: DataTypes.TINYINT,
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
        // Product.belongsTo(models.OrderDetails)
        Product.hasMany(models.Coupon)
    }

    return Product
}