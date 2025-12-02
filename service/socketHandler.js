const { WebSocketServer } = require('ws');

class SocketHandler {
    constructor(httpServer) {
        this.wsServer = new WebSocketServer({ server: httpServer });
        this.wsServer.on('connection', (socket) => this.handleConnection(socket));
        console.log('WebSocket server is running');
    }

    handleConnection(socket) {
        console.log('New WebSocket connection established');

        socket.on('message', (message) => this.sendToAllClients(message, socket));
    }

    sendToAllClients(message, socket) {
        console.log(`Received message: ${message}`);
        for (const client of this.wsServer.clients) {
            client.send(message);
        }
    }
}

module.exports = { SocketHandler };