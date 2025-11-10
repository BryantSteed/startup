const port = process.argv.length > 2 ? process.argv[2] : 4000;
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');


const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('qrCodeDB');
const usersCollection = db.collection('users');
const qrCodesCollection = db.collection('qrCodes');
const sessionsCollection = db.collection('sessions');


const app = express();

app.use(express.json({ limit: '2mb' }));

app.use(debugLog);
app.use(cookieParser());
app.use(express.static('public'));

const users = [];
const sessions = {};
const qrCodes = {};

function debugLog(req, res, next) {
    console.log(`Received ${req.method} request for ${req.url}`);
    // console.log(`req.body: `, req.body);
    console.log(`headers: `, req.headers);
    next();
}

function loginUser(user, username, password, res){
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
    addNewUser(newUser);
    openSession(username, res, false);
}

function openSession(username, res, isRegistered) {
    if (isRegistered) {
        message = "Welcome back!";
    } else {
        message = "Registration successful!";
    }
    sessionId = createUserSession(username);
    res
    .status(200)
    .cookie('token', sessionId, 
        { httpOnly: true, 
        sameSite: 'Strict' })
    .send({ message });
}

function addNewUser(newUser) {
    users.push(newUser);
}

function findUser(username) {
    return users.find(u => u.username === username);
}

function createUserSession(username) {
    const sessionId = uuid.v4();
    sessions[sessionId] = username;
    return sessionId;
}

function deleteUserSession(sessionId) {
    delete sessions[sessionId];
}

function getUsernameBySessionID(sessionId) {
    return sessions[sessionId];
}

function getUserQRCodes(username) {
    const userQRCodes = qrCodes[username] ? qrCodes[username] : [];
    return userQRCodes;
}

function addUserQRCode(username, text, image) {
    if (!qrCodes[username]) {
        qrCodes[username] = [{ text, image }];
    } else {
        qrCodes[username].push({ text, image });
    }
}

app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = findUser(username);
    if (user) {
        loginUser(user, username, password, res);
    } else {
        registerUser(username, password, res);
    }
});

app.delete('/api/logout', (req, res) => {
    const sessionId = req.cookies.token;
    deleteUserSession(sessionId);
    res
    .status(200)
    .send({message : 'Logout successful' });
});

app.put("/api/qr", (req, res) => {
    const sessionId = req.cookies.token;
    const username = validateUser(sessionId, res);
    if (!username) return;
    const { text, image } = req.body;
    addUserQRCode(username, text, image);
    res
    .status(200)
    .send({ message: "QR code stored successfully" });
});

function validateUser(sessionId, res) {
    const username = getUsernameBySessionID(sessionId);
    if (!username) {
        res
        .status(401)
        .send({ message: 'Unauthorized' });
        return false;
    }
    console.log("Validated user:", username);
    return username;
}

app.get("/api/qr", (req, res) => {
    const sessionId = req.cookies.token;
    const username = validateUser(sessionId, res);
    if (!username) return;
    console.log("finding the QR codes for user:", username);
    const userQRCodes = getUserQRCodes(username);
    console.log("Returning QR codes for user:", username);
    res
    .status(200)
    .send({ qrCodes: userQRCodes });
});

app.get("/api/auth", (req, res) => {
    const sessionId = req.cookies.token;
    const username = validateUser(sessionId, res);
    if (!username) return;
    res
    .status(200)
    .send({ message: "User is authenticated", username: username });
});


app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})