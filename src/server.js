let https = require('https');
let fs = require('fs');
let controller = require('./controller.js');

let key = fs.readFileSync('./security/cert/localhost.key');
let cert = fs.readFileSync('./security/cert/localhost.crt');

let requestListener = async function(req, res) {
  let timestamp = (new Date()).toLocaleString('en-US', {timeZone: 'Canada/Central'});
  console.log(`[${timestamp}] Request: ${req.method}\t${req.url}`);
  controller.handle(req, res);
}

function start (port){
  https.createServer({key, cert}, requestListener).listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
  });
}

module.exports = {
  start
}