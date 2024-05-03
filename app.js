const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./sequelize');
const User = require('./models/user.js');

async function initializeDatabase() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Database synced successfully');
    } catch (error) {
      console.error('Unable to sync database:', error);
    }
  }

app.use(express.json());

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.post('/users', async (req, res) => {    
  try {
    const { name, email } = req.body;
    console.log("nome", name, "email",email);
    const user = await User.create({ name, email });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});