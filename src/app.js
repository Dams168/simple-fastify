const fastify = require('fastify')({ logger: true });

fastify.get('/', async (request, reply) => {
    return { message: "Hello World From Fastify" };
});

fastify.listen({ port: 4000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})
