export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Store API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts']
}