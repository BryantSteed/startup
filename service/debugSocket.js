const WebSocket = require('ws');

const url = 'ws://localhost:4000';
const ws = new WebSocket(url);

ws.on('open', () => {
    console.log('connected to', url);
    ws.send(JSON.stringify({ type: 'hello', pid: process.pid }));
});

ws.on('message', (data) => {
    console.log('message:', data.toString());
});

ws.on('close', (code, reason) => {
    console.log('closed', code, reason && reason.toString());
});

ws.on('error', (err) => {
    console.error('error', err && err.message);
    console.log(err)
});

function sendOnceOpen(message) {
    const payload = typeof message === 'string' ? message : JSON.stringify(message);
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(payload);
        return;
    }
    ws.once('open', () => {
        ws.send(payload);
    });
}

sendOnceOpen("Hello my guy");