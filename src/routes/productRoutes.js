const productController = require('../controllers/productController');

module.exports = async (fastify, options) => {
    fastify.get('/products', productController.getAllProducts);
    fastify.post('/product', productController.createProduct);
};
