const {WebSocketServer} = require('ws');

export function socketHandler(httpServer) {
    const wsServer = new WebSocketServer({ server: httpServer });
    wsServer.on('connection', handleConnection);

}

function handleConnection(socket) {
    console.log('New WebSocket connection established');

    socket.on('message', (message) => {
        console.log('Received message:', message);
        // Echo the message back to the client
        socket.send(`Server received: ${message}`);
    });
}