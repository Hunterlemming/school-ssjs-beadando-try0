const net = require('net');
const events = require('events');

const dataEmitter = new events.EventEmitter();
const host = 'localhost';

function init(ports) {
    ports.forEach(port => {
        const socket = new net.Socket();
        socket.connect({host, port}, () => {
            socket.host = host;
        });
        socket.on('data', data => {
            dataEmitter.emit('refresh', data);
        });
        socket.on('error', err => console.log(err));
    });
}

module.exports = {
    dataEmitter,
    init
}