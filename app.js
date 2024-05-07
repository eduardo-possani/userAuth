const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./sequelize');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function initializeDatabase() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Database synced successfully');
    } catch (error) {
      console.error('Unable to sync database:', error);
    }
  }

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) {
    return res.sendStatus(401);
  }
  jwt.verify(authHeader, 'duardoNIcola', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
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
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req ,res)=>{
  
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ id: user.id }, 'duardoNIcola', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get('/users',authenticateToken ,async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/users/2' ,async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});