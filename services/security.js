const util = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require("../config/config")

function createPasswordHash(password){
  let salt = crypto.randomBytes(32).toString('hex');
  let hash = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha512').toString('hex');
  return {salt: salt, hash: hash};
}

function verifyPassword(password, userHash, userSalt){
  let hash = crypto.pbkdf2Sync(password, userSalt, 1000, 32, 'sha512').toString('hex');
  return hash === userHash;
}

function createAuthToken(payload){
  let privateKey = fs.readFileSync(config.jwt.privateKeyPath);
  let token = jwt.sign(
    payload,
    privateKey,
    {algorithm: 'RS256'});
  return token;
}

 async function validateAuthToken(token){
  if(token === undefined)
      return Promise.reject('Auth token not provided');
  
  var cert = null;
  try{
    cert = fs.readFileSync(config.jwt.publicKeyPath);
  }catch(e){
    console.log(e);
    return Promise.reject('Auth token could not be validated.');
  }

  try{
    return await util.promisify(jwt.verify)(token, cert);
  }catch(e){
    console.log(e); 
    return Promise.reject('Auth token invalid.');
  }
}

module.exports = {
  createPasswordHash,
  verifyPassword,
  createAuthToken,
  validateAuthToken
}