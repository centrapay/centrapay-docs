const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');

const start = async function() {
  const server = Hapi.server({
    port: 5001,
    host: '0.0.0.0'
  });
  try {
    await server.register(Inert);
    server.route({
      path: '/{path*}',
      method: 'GET',
      handler: {
        directory: {
          path: '../.output/public',
        }
      }}
    );
    await server.start();
    // eslint-disable-next-line no-console
    console.log(`Server started at:  ${server.info.uri}`);
  }
  catch(e) {
    // eslint-disable-next-line no-console
    console.log('Failed to load server', e);
  }
};

start();
