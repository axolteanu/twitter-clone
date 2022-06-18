let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let fs = require('fs');

module.exports = {
  createPasswordHash: function (password){
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha512').toString('hex');
    return {salt: salt, hash: hash};
  },
  createAuthToken: function (payload){
    let privateKey = fs.readFileSync('./security/jwt.key');
    let token = jwt.sign(
      payload,
      privateKey,
      {algorithm: 'RS256'});
    return token;
  },
  validateToken: function(token){
    return new Promise(resolve => {
      var cert = fs.readFileSync('./security/jwt.key.pub');
      jwt.verify(token, cert, function(err, decoded) {
        resolve({err, decoded});
      });
    });
  }
}