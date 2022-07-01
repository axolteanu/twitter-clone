let fs = require('fs');
let security = require('./security.js');
let db = require('./db.js');

let requestHandlers = {
  gets: new Map(),
  posts: new Map()
};

// GET home
let handleHome = async (req, res) => {
  let path = './public';
  let authToken = getCookie(req.headers.cookie, 'authToken');
  let ret = await security.validateToken(authToken);
  if(ret.err){
    console.log("Can't validate auth token")
    path += '/index.html';
  }else{
    console.log(`Auth token is valid for ${ret.decoded.username}`)
    path += '/home.html';
  }
  res.setHeader('Content-Type', 'text/html');
  returnFile(path, res);
}

// GET static files
let handleStatic = async (req, res) => {
  let path = './public';
  if(req.url.match('.svg$')){
    res.setHeader('Content-Type', 'image/svg+xml')
  }
  path += req.url;
  returnFile(path, res);
}

// POST /signup
let handleSignUp = async (req, res) => {
  let authToken = getCookie(req.headers.cookie, 'authToken');
  if(authToken != '')
    res.end();
  else{
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
        res.writeHead(301,{
          'Location': '/',
          'Set-Cookie': `authToken=${authToken}; Max-Age=864000; Secure; HttpOnly`
        });
        res.end();
      }
    });
  }
}

// POST /logout
let handleLogout = async (req, res) => {
  res.setHeader('Set-Cookie', `authToken=; Max-Age=0`);
  res.statusCode = 301;
  res.setHeader('Location', '/');
  res.end();
}

function returnFile(path, res){
  let statusCode = 200;
  fs.readFile(path, (err, data) => {
    if(err)
      statusCode = 500;
    else
      res.write(data);
    res.statusCode = statusCode;
    res.end();
  });
}

function getCookie(headerCookie, cookieName){
  if(headerCookie === undefined){
    return '';
  }else{
    let cookies = headerCookie.split(';');
    if(cookies === undefined){
      cookies = [headerCookie];
    }
    for(let i = 0; i < cookies.length; i++){
      let arr = cookies[i].trim().split('=');
      if(arr[0] === cookieName){
        return arr[1];
      }
    }
    return '';
  }
}

requestHandlers.gets.set('/', handleHome);
requestHandlers.gets.set('static', handleStatic);
requestHandlers.posts.set('/signup', handleSignUp);
requestHandlers.posts.set('/logout', handleLogout);

module.exports = requestHandlers;