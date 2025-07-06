const productController = require('../controllers/productController');

module.exports = async (fastify, options) => {
    fastify.get('/products', productController.getAllProducts);
    fastify.post('/product', productController.createProduct);
    fastify.put('/product/:id', productController.updateProduct);
    fastify.get('/product/:id', productController.getProductById);
    fastify.delete('/product/:id', productController.deleteProduct);
};
