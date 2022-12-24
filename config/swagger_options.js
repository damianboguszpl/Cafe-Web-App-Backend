const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Cafe API',
            version: '1.0.0',
            description: 'API for web and mobile apps'
        },
        schemes: ["http"],
        servers: [
            {
                url: 'http://localhost:3001/',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'],
}

module.exports = options