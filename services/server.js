const https = require("https");
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const config = require("../config/config");
const security = require("./security");
const index = require("../routes/index");
const home = require("../routes/home")
const signup = require("../routes/signup");
const logout = require("../routes/logout");

const handler = express();

handler.set('view engine', 'ejs');
handler.set('views', './views');
handler.use(logger);
handler.use(express.static('public'))
handler.use(cookieParser());
handler.use(bodyParser.urlencoded({ extended: true }));
handler.get('/', index.handle);
handler.post('/signup', signup.handle);
handler.get('/home', authenticate, home.handle);
handler.post('/logout', authenticate, logout.handle);

async function authenticate(req, res, next){
  try{
    req.payload = await security.validateAuthToken(req.cookies.authToken);
    req.authTokenValid = true;
  }catch(e){
    res.setHeader('Set-Cookie', 'authToken=; Max-Age=0');
    res.redirect(301, '/');
    console.log(e);
    console.log('Authentication failed.')
  }

  if(req.authTokenValid)
    next();
}

function logger(req, res, next){
  let timestamp = (new Date()).toLocaleString('en-US', {timeZone: 'Canada/Central'});
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
}

function start(port){
  let key = fs.readFileSync(config.https.keyPath);
  let cert = fs.readFileSync(config.https.certPath);
  let server = https.createServer({key, cert}, handler);
  server.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
  });
}

module.exports = {
  start
}