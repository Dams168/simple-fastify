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

    static async updateProduct(request, reply) {
        try {
            const id = Number(request.params.id);
            const { name, price, description } = request.body;
            const result = await pool.query(
                'UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *',
                [name, price, description, id]
            );
            if (result.rowCount === 0) {
                return reply.code(404).send({
                    status: 'fail',
                    message: 'Product not found'
                });
            }
            reply.code(200).send({
                status: 'success',
                message: 'Product updated successfully',
                data: result.rows
            });
        } catch (error) {
            console.error('Error updating product:', error);
            reply.code(500).send({
                status: 'error',
                message: 'Failed to update product',
                error: error.message
            });
        }
    }

    static async getProductById(request, reply) {
        try {
            const id = Number(request.params.id);
            const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
            if (result.rowCount === 0) {
                return reply.code(404).send({
                    status: 'fail',
                    message: 'Product not found'
                })
            }
            reply.code(200).send({
                status: 'success',
                message: 'Product fetched successfully',
                data: result.rows[0]
            })
        } catch (error) {
            console.error('Error fetching product:', error);
            reply.code(500).send({
                status: 'error',
                message: 'Failed to fetch product',
                error: error.message
            });
        }
    }
}