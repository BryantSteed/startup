const port = process.argv.length > 2 ? process.argv[2] : 4000;
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

users = [];

function validateUser(username, password, res){
    if (bcrypt.compareSync(password, user.passwordHash)) {
            res.send({ message: 'Login successful' });
        } else {
            res
            .status(401)
            .send({ message: 'Invalid password' });
        }
}

function registerUser(username, password, res) {
    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = { username, passwordHash };
    users.push(newUser);
    res
    .status(200)
    .send({ message: 'User registered successfully' });
}

app.post('/api/login', (req, res) => {
    username = req.body.username;
    password = req.body.password;
    const user = users.find(u => u.username === username);
    if (user) {
        validateUser(username, password, res);
    } else {
        registerUser(username, password, res);
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})