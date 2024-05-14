const express = require('express');
const app = express();
const port = 3000;

const controllers = require('./controllers/allImportController');
const authenticateToken = require('./middleware/authenticateToken');

const initializeDatabase = require('./database/index')

app.use(express.json());

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/users', controllers.userController.createUser);

app.post('/login', controllers.userController.login);

app.get('/users',authenticateToken , controllers.userController.list);
