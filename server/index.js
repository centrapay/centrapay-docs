const Hapi = require('@hapi/hapi');
const H2o2 = require('@hapi/h2o2');


const start = async function() {
  const server = Hapi.server({
    port: 3002,
    host: '0.0.0.0'
  });
  try {
    await server.register(H2o2);
    server.route({
      method: '*',
      path: '/{any*}',
      handler: {
        proxy: {
          host: 'app',
          port: '3000',
          protocol: 'http',
          passThrough: true,
        },
      }
    });
    server.route({
      method: '*',
      path: '/guides',
      handler: (req, h) => {
        return h.redirect('http://0.0.0.0:3001/guides/introduction');
      }
    });
    server.route({
      method: '*',
      path: '/guides/{any*}',
      handler: {
        proxy: {
          host: 'legacy',
          port: '3001',
          protocol: 'http',
          passThrough: true,
        }
      }
    });
    server.route({
      method: '*',
      path: '/api',
      handler: (req, h) => {
        return h.redirect('http://0.0.0.0:3001/api/introduction');
      }
    });
    server.route({
      method: '*',
      path: '/api/{any*}',
      handler: {
        proxy: {
          host: 'legacy',
          port: '3001',
          protocol: 'http',
          passThrough: true,
        }
      }
    });

    server.route({
      method: '*',
      path: '/assets/{any*}',
      handler: {
        proxy: {
          host: 'legacy',
          port: '3001',
          protocol: 'http',
          passThrough: true,
        }
      }
    });
    server.route({
      method: '*',
      path: '/images/{any*}',
      handler: {
        proxy: {
          host: 'legacy',
          port: '3001',
          protocol: 'http',
          passThrough: true,
        }
      }
    });
    await server.start();
    // eslint-disable-next-line no-console
    console.log(`Server started at:  ${server.info.uri}`);
  }
  catch(e) {
    // eslint-disable-next-line no-console
    console.log('Failed to load h2o2', e);
  }
};

start();
