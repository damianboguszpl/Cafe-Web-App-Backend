module.exports = (sequelize, DataTypes) => {
    const ProductStatus = sequelize.define("ProductStatus", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'product_statuses'
    })

    ProductStatus.associate = (models) => {
        ProductStatus.hasMany(models.Product, {onDelete: 'cascade'})
    }

    return ProductStatus
}