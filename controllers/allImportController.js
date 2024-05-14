const fs = require('fs');
const path = require('path');

const controllers = {};

const controllersDir = path.join(__dirname);

fs.readdirSync(controllersDir).forEach(file => {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const controllerName = file.split('.')[0];
    const controllerPath = path.join(controllersDir, file);
    controllers[controllerName] = require(controllerPath);
  }
});

module.exports = controllers;
