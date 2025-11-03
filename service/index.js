const port = process.argv.length > 2 ? process.argv[2] : 4000;
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');


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
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(u => u.username === username);
    if (user) {
        loginUser(user, username, password, res);
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

app.put("/api/qr", (req, res) => {
    const sessionId = req.cookies.token;
    const username = validateUser(sessionId, res);
    if (!username) return;
    const { text, image } = req.body;
    if (!qrCodes[username]) {
        qrCodes[username] = [{text, image}];
    } else {
        qrCodes[username].push({text, image});
        res
        .status(200)
        .send({ message: "QR code stored successfully" });
    }
});

function validateUser(sessionId, res) {
    const username = sessions[sessionId];
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
    const userQRCodes = qrCodes[username] ? qrCodes[username] : [];
    console.log("Returning QR codes for user:", username);
    res
    .status(200)
    .send({ qrCodes: userQRCodes });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})