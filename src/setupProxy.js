const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/edamam',
    createProxyMiddleware({
      target: 'https://api.edamam.com', // Replace with the actual API base URL
      changeOrigin: true,
      pathRewrite: {
        '^/api/edamam': '', // Remove the '/api/edamam' prefix
      },
    })
  );
};