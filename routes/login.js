const util = require('util');
const db = require('../services/db');
const security = require('../services/security');

module.exports.handle = async function(req, res, next){
  try{
    let params = new URLSearchParams(req.body);
    let sql = `select passHash, passSalt from users where email = '${params.get('email')}'`;
    let sqlRes = await util.promisify(db.connection.query.bind(db.connection))(sql);
    if(sqlRes.length > 0){
      if(security.verifyPassword(params.get('password'), sqlRes[0].passHash, sqlRes[0].passSalt)){
        let authToken = security.createAuthToken({username: params.get('email')});
        res.setHeader('Set-Cookie', `authToken=${authToken}; Max-Age=864000; Secure; HttpOnly`);
        res.redirect(301, '/home');
      }else
        throw new Error('Wrong password.');
    }else{
      throw new Error('Email provided is not registered.');
    }
  }catch(e){
    next(e);
  }
}