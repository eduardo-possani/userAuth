const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req , res) =>{
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
}

const list = async (req, res) =>{
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

module.exports = {
    list,
    login,
  createUser,
};
