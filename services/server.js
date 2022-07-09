const https = require("https");
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const config = require("../config/config.js");
const security = require("./security.js");
const index = require("../routes/index.js");
const home = require("../routes/home.js")
const signup = require("../routes/signup.js");
const logout = require("../routes/logout.js");

const handler = express();

handler.set('view engine', 'ejs');
handler.set('views', './views');
handler.use(logger);
handler.use(express.static('public'))
handler.use(cookieParser());
handler.get('/', index.handle);
handler.post('/signup', signup.handle);
handler.get('/home', authenticationHandler, home.handle);
handler.post('/logout', authenticationHandler, logout.handle);

async function authenticationHandler(req, res, next){
  try{
    let payload = await security.authenticate(req.cookies.authToken);
    req.username = payload.username;
    next();
  }catch(e){
    res.setHeader('Set-Cookie', `authToken=; Max-Age=0`);
    res.redirect(301, '/');
    console.log(e);
  }
}

function logger(req, res, next){
  let timestamp = (new Date()).toLocaleString('en-US', {timeZone: 'Canada/Central'});
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
}

function start (port){
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