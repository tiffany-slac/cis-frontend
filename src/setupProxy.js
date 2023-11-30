const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://admin:admin@localhost:27017', // Replace with your backend API URL
      changeOrigin: true,
    })
  );
};
