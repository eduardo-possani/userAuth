const sequelize = require('./sequelize');

const initializeDatabase = async function initializeDatabase() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Database synced successfully');
    } catch (error) {
      console.error('Unable to sync database:', error);
    }
};

module.exports = initializeDatabase;