const mockServer = require('blue-mock-server');
const path = require('path');
const port = process.env.port || process.env.npm_config_port || 996;

function resolve(dir) {
  return path.join(__dirname, dir);
}

const devServer = {
  port,
  //根据环境配置相关代理
  open: false,
  proxy: {
    '/mock': {
      target: `http:localhost:${port}/mock`,
    },
    '/api': {
      target: `http://localhost:3000`
    }
  }
};


module.exports = devServer;
