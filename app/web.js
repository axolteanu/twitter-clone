let https = require('https');
let fs = require('fs');
let requestHandlers = require('./request-handlers.js');

let requestListener = async function(req, res) {
  console.log(
    `[${(new Date()).toLocaleString('en-US', {timeZone: 'Canada/Central'})}]` + 
    `Request: ${req.method}\t${req.url}`
  );
  
  if(req.method === 'GET'){
    let handler = requestHandlers.gets.get(req.url);
    if(handler != undefined)
      handler(req, res);
    else
      requestHandlers.gets.get('static')(req, res);
  }else if(req.method === 'POST'){
    let handler = requestHandlers.posts.get(req.url);
    if(handler != undefined)
      handler(req, res);
    else
      res.end();
  }
}

module.exports = { 
  start: function (port){
    let key = fs.readFileSync('./security/cert/localhost.key');
    let cert = fs.readFileSync('./security/cert/localhost.crt');

    https.createServer({key, cert}, requestListener).listen(port, () => {
      console.log(`Server running at https://localhost:${port}`);
    });
  }
}