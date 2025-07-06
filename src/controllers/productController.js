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
            reply.status(500).send({
                status: 'error',
                message: 'Failed to fetch products',
                error: error.message
            });
        }
    }
}