let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  let statusCode = 200;
  if(req.method === 'GET'){
    let path = '.';
    if(req.url === '/'){
      path += '/index.html';
      res.setHeader('Content-Type', 'text/html');
    }
    else{
      if(req.url.match('.svg$')){
        res.setHeader('Content-Type', 'image/svg+xml')
      }
      path += req.url;
    }
    if(path != '.'){
      fs.readFile(path, (err, data) => {
        if(err){
          statusCode = 500;
        }else{
          res.write(data);
        }
        res.statusCode = statusCode;
        res.end();
      });
    }
  }
}).listen(8080);

