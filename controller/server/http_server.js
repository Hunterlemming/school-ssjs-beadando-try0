const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');


function processRequest(req, res) {
    const requestUrl = url.parse(req.url);
    const queryParams = querystring.parse(requestUrl.query);

    switch (requestUrl.pathname) {
        case "/style":
        case "/script":
            const scriptPath = queryParams['url'];
            fs.readFile(scriptPath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    console.log(err);
                } else {
                    if (requestUrl.pathname === "/script") {
                        res.writeHead(200, {'Content-Type': 'application/javascript'});
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/css'});
                    }
                    res.write(data);
                }
                res.end();
            });
            break;
        case "/":
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile("public/index.html", "utf-8", (err, data) => {
                if (err) {
                    res.write(err);
                } else {
                    res.write(data);
                }
                res.end();
            });
            break;
    }
}


function init(port) {
    const server = http.createServer(processRequest);
    server.listen(port, () => console.log(`http server open [${port}]`));

    return server;
}


module.exports = {
    init
}