const options = {
    swaggerDefinition: {
        info: {
            title: 'Cafe API',
            version: '1.0.0',
            description: 'API for web and mobile apps'
        },
    },
    apis: ['./routes/*.js'],
}

module.exports = options