const csvLoader = require("./repository/csv_loader");
const http_server = require('./controller/server/http_server');
const tcp_server = require('./controller/server/tcp_server');
const tcp_client = require('./controller/client/tcp_client');
const ws_server = require('./controller/server/ws_server');


csvLoader.init().then(
    () => {
        console.log("csv successfully read");
        const httpServer = http_server.init(3000);
        const ports = [4244];

        ws_server.init(httpServer);

        ports.forEach(tcp_server.startServer);
        tcp_client.init(ports);

        tcp_client.dataEmitter.on('refresh', data => ws_server.broadcast(JSON.stringify(data)));
    },
    (err) => {
        console.log("error in reading data");
        console.log(err);
    }
);


