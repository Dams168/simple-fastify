const fastify = require('fastify')({ logger: true });
const productRoutes = require('./routes/productRoutes');

fastify.get('/', async (request, reply) => {
    return { message: "Hello World From Fastify" };
});

fastify.register(productRoutes);

fastify.listen({ port: 4000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})
