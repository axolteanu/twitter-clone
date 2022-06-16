let https = require('https');
let fs = require('fs');
let crypto = require('crypto');

let key = fs.readFileSync('./security/cert/localhost.key');
let cert = fs.readFileSync('./security/cert/localhost.crt');

https.createServer({key, cert},(req, res) => {
  console.log(`Request: ${req.method}\t${req.url}`);
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
  else if(req.method === 'POST'){
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      let params = new URLSearchParams(data);
      let hash = hashPassword(params.get('password')); 
      console.log(hash.salt);
      console.log(hash.hash);
      res.writeHead(301, {'Location': '/'});
      res.end();
    });
  }
}).listen(3000);

function hashPassword(password){
  this.salt = crypto.randomBytes(32).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha512').toString('hex');
  return {salt: this.salt, hash: this.hash};
}