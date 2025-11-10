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

function debugLog(req, res, next) {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log(`headers: `, req.headers);
    next();
}

async function loginUser(user, username, password, res){
    if (bcrypt.compareSync(password, user.passwordHash)) {
            await openSession(username, res, true);
        } else {
            res
            .status(401)
            .send({ message: 'Invalid password' });
        }
}

async function registerUser(username, password, res) {
    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = { username, passwordHash };
    await addNewUser(newUser);
    await openSession(username, res, false);
}

async function openSession(username, res, isRegistered) {
    if (isRegistered) {
        message = "Welcome back!";
    } else {
        message = "Registration successful!";
    }
    sessionId = await createUserSession(username);
    res
    .status(200)
    .cookie('token', sessionId, 
        { httpOnly: true, 
        sameSite: 'Strict' })
    .send({ message });
}

async function addNewUser(newUser) {
    await usersCollection.insertOne(newUser);
}

async function findUser(username) {
    return await usersCollection.findOne({ username: username });
}

async function createUserSession(username) {
    const sessionId = uuid.v4();
    await sessionsCollection.insertOne({ sessionId, username });
    return sessionId;
}

async function deleteUserSession(sessionId) {
    await sessionsCollection.deleteOne({ sessionId });
}

async function getUsernameBySessionID(sessionId) {
    query = { sessionId: sessionId };
    const session = await sessionsCollection.findOne(query);
    console.log("Session found:", session);
    if (!session) {
        console.log(`No session found for sessionId: ${sessionId}`);
        return null;
    }
    return session.username;
}

async function getUserQRCodes(username) {
    return await qrCodesCollection.find(
        {username}, {projection : {text: 1, image: 1, _id: 0}}).toArray();
}

async function addUserQRCode(username, text, image) {
    await qrCodesCollection.insertOne({ username, text, image });
}

app.post('/api/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await findUser(username);
    if (user) {
        loginUser(user, username, password, res);
    } else {
        registerUser(username, password, res);
    }
});

app.delete('/api/logout', async (req, res) => {
    const sessionId = req.cookies.token;
    await deleteUserSession(sessionId);
    res
    .status(200)
    .send({message : 'Logout successful' });
});

app.put("/api/qr", async (req, res) => {
    const sessionId = req.cookies.token;
    const username = await validateUser(sessionId, res);
    if (!username) return;
    const { text, image } = req.body;
    await addUserQRCode(username, text, image);
    res
    .status(200)
    .send({ message: "QR code stored successfully" });
});

async function validateUser(sessionId, res) {
    console.log("Validating sessionId:", sessionId);
    const username = await getUsernameBySessionID(sessionId);
    if (!username) {
        res
        .status(401)
        .send({ message: 'Unauthorized' });
        return false;
    }
    console.log("Validated user:", username);
    return username;
}

app.get("/api/qr", async (req, res) => {
    const sessionId = req.cookies.token;
    console.log("Received sessionId from client cookie:", sessionId);
    const username = await validateUser(sessionId, res);
    if (!username) return;
    console.log("finding the QR codes for user:", username);
    const userQRCodes = await getUserQRCodes(username);
    console.log("Returning QR codes for user:", username);
    res
    .status(200)
    .send({ qrCodes: userQRCodes });
});

app.get("/api/auth", async (req, res) => {
    const sessionId = req.cookies.token;
    const username = await validateUser(sessionId, res);
    if (!username) return;
    res
    .status(200)
    .send({ message: "User is authenticated", username: username });
});


app.use(function (err, req, res, next) {
    console.log('Error handler called:', err);
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})