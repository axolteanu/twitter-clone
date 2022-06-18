let https = require('https');
let fs = require('fs');
let security = require('./security.js');
let Db = require('./db.js');

let db = new Db();
let requestListener = async function(req, res) {
  console.log(
    `[${(new Date()).toLocaleString('en-US', {timeZone: 'Canada/Central'})}]` + 
    `Request: ${req.method}\t${req.url}`
  );
  let statusCode = 200;
  if(req.method === 'GET'){
    let path = '.';
    if(req.url === '/'){
      let authToken = getCookie(req.headers.cookie, 'authToken');
      let ret = await security.validateToken(authToken);
      if(ret.err){
        console.log("Can't validate auth token")
        path += '/index.html';
        //res.clearCookie('authToken');
      }else{
        console.log(`Auth token is valid for ${ret.decoded.username}`)
        path += '/home.html';
      }
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
  }else if(req.method === 'POST'){
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', async () => {
      let params = new URLSearchParams(data);
      let hash = security.createPasswordHash(params.get('password'));
      let dob = `${params.get('dob-year')}-${params.get('dob-month')}-${params.get('dob-day')}`;
      var sql = `insert into users (name, passHash, passSalt, email, dob) values (
        '${params.get('name')}',
        '${hash.hash}',
        '${hash.salt}',
        '${params.get('email')}',
        '${dob}'
        )`;
      let err = await db.query(sql);
      if(err){
        console.log(err);
        console.log("User was not saved"); 
      }else{
        console.log("1 user saved");
        let authToken = security.createAuthToken({username: params.get('email')});
        res.statusCode = 301;
        res.setHeader('Location', '/');
        res.setHeader('Set-Cookie', `authToken=${authToken}; Secure; HttpOnly`);
        res.end();
      }
    });
  }
}

function getCookie(headerCookie, cookieName){
  let cookies = [];
  if(headerCookie === undefined){
    return '';
  }else{
    cookies = headerCookie.split[';'];
    if(cookies === undefined){
      cookies = [headerCookie];
    }
    for(let i = 0; i < cookies.length; i++){
      let arr = cookies[i].split('=');
      if(arr[0] === cookieName){
        return arr[1];
      }
    }
    return '';
  }
}

async function setupDb(){  
  db.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'twitterclonedb'
  })
  let err = await db.connect();
  if(err){
    console.log(err);
    console.log('Failed to connect to DB');
  }else{
    console.log('Connected to DB');
  }
}

function startWebServer(){
  let port = 3000;
  let key = fs.readFileSync('./security/cert/localhost.key');
  let cert = fs.readFileSync('./security/cert/localhost.crt');

  https.createServer({key, cert}, requestListener).listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
  });
}

async function main(){
  await setupDb();
  startWebServer();
}

main();