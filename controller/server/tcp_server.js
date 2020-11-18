const net = require('net');
const csv_loader = require('../../repository/csv_loader');


function startServer(port) {
    const server = net.createServer();

    server.on('connection', socket => {
        console.log("client connected");
        let id = setInterval(() => sendFrame(socket), 16);
        socket.on('error', err => {
            console.log(err);
            clearInterval(id);
        });
        socket.on('end', () => clearInterval(id));
    });

    function sendFrame(socket) {
        const frame = csv_loader.getNextRawFrame();
        socket.write(frame);
    }

    server.listen(port, () => console.log(`tcp socket server listening [${port}]`));
}

module.exports = {
    startServer
}