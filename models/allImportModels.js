const fs = require('fs');
const path = require('path');

const models = {};

const modelsDir = path.join(__dirname);

fs.readdirSync(modelsDir).forEach(file => {
  if (file !== 'allImportModels.js' && file.endsWith('.js')) {
    const modelName = file.split('.')[0];
    const modelPath = path.join(modelsDir, file);
    models[modelName] = require(modelPath);
  }
});

module.exports = models;