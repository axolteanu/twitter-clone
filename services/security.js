const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require("../config/config.js")

function createPasswordHash(password){
  let salt = crypto.randomBytes(32).toString('hex');
  let hash = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha512').toString('hex');
  return {salt: salt, hash: hash};
}

function createAuthToken(payload){
  let privateKey = fs.readFileSync(config.jwt.privateKeyPath);
  let token = jwt.sign(
    payload,
    privateKey,
    {algorithm: 'RS256'});
  return token;
}

 function validateAuthToken(token){
  return new Promise(resolve => {
    if(token === undefined)
      throw new Error('Auth token not provided');
    var cert = fs.readFileSync(config.jwt.publicKeyPath);
    jwt.verify(token, cert, function(err, decoded) {
      if(err) throw new Error('Auth token invalid.'); else resolve(decoded);
    });
  });
}

module.exports = {
  createPasswordHash,
  createAuthToken,
  validateAuthToken
}