const port = process.argv.length > 2 ? process.argv[2] : 4000;
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');


const app = express();

app.use(express.json());
app.use(debugLog);
app.use(cookieParser());
app.use(express.static('public'));

const users = [];
const sessions = {};

function debugLog(req, res, next) {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log(`req.body: `, req.body);
    console.log(`headers: `, req.headers);
    next();
}

function validateUser(user, username, password, res){
    if (bcrypt.compareSync(password, user.passwordHash)) {
            openSession(username, res, true);
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
    openSession(username, res, false);
}

function openSession(username, res, isRegistered) {
    if (isRegistered) {
        message = "Welcome back!";
    } else {
        message = "Registration successful!";
    }
    const sessionId = uuid.v4();
    sessions[sessionId] = username;
    res
    .status(200)
    .cookie('token', sessionId, 
        { httpOnly: true, 
        sameSite: 'Strict' })
    .send({ message });
}

app.post('/api/login', (req, res) => {
    username = req.body.username;
    password = req.body.password;
    const user = users.find(u => u.username === username);
    if (user) {
        validateUser(user, username, password, res);
    } else {
        registerUser(username, password, res);
    }
});

app.delete('/api/logout', (req, res) => {
    const sessionId = req.cookies.token;
    delete sessions[sessionId];
    res
    .status(200)
    .send({message : 'Logout successful' });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})