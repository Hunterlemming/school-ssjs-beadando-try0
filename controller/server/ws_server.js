const ws = require('ws');

let server;

function init(httpServer) {
    server = new ws.Server({server: httpServer});
}

function broadcast(data) {
    server.clients.forEach((c) => c.send(data));
}

module.exports = {
    init,
    broadcast
}