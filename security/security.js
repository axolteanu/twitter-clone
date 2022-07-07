let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let fs = require('fs');
let utils = require('../utils.js');

function createPasswordHash(password){
  let salt = crypto.randomBytes(32).toString('hex');
  let hash = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha512').toString('hex');
  return {salt: salt, hash: hash};
}

function createAuthToken(payload){
  let privateKey = fs.readFileSync('./security/jwt.key');
  let token = jwt.sign(
    payload,
    privateKey,
    {algorithm: 'RS256'});
  return token;
}

 function validateAuthToken(token){
  return new Promise(resolve => {
    var cert = fs.readFileSync('./security/jwt.key.pub');
    jwt.verify(token, cert, function(err, decoded) {
      if(err) throw err; else resolve(decoded);
    });
  });
}

async function authenticate(authToken){
  let payload = null;
  let authToken = authToken;
  if(authToken != ''){
    try{
      payload = await validateAuthToken(authToken);
      isAuthenticated = true;
    }catch(e){
      console.log(e);
      throw new Error('Unable to authenticate client: auth token not valid.');
    }
  }else
    throw new Error('Unable to authenticate client: auth token not provided.');
  return payload;
}

async function authenticate(res, req, next){
  try{
    let payload = await security.authenticate(utils.getCookie(req.headers.cookie, 'authToken'));
    req.username = payload.username;
    next();
  }catch(e){
    res.statusCode = 301;
    res.setHeader('Location', '/');
    res.end();
    console.log(e);
  }
}

module.exports = {
  createPasswordHash,
  createAuthToken,
  authenticate
}