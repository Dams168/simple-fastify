const pool = require('../config/db');

module.exports = class productController {
    static async getAllProducts(request, reply) {
        try {
            const result = await pool.query('SELECT * FROM products');
            reply.send({
                status: 'success',
                message: 'Successfully fetched all products',
                rowCount: result.rowCount,
                data: result.rows
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            reply.code(500).send({
                status: 'error',
                message: 'Failed to fetch products',
                error: error.message
            });
        }
    }

    static async createProduct(request, reply) {
        try {
            const { name, price, description } = request.body;
            const result = await pool.query(
                'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *',
                [name, price, description]
            );
            reply.code(201).send({
                status: 'success',
                message: 'Product created successfully',
                data: result.rows
            });
        } catch (error) {
            console.error('Error creating product:', error);
            reply.code(500).send({
                status: 'error',
                message: 'Failed to create product',
                error: error.message
            });
        }
    }
}