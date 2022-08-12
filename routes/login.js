const util = require('util');
const db = require('../services/db');
const security = require('../services/security');

class LoginError extends Error{
  constructor(msg){
    super(msg);
  }
}

module.exports.handle = async function(req, res, next){
  let resObj = {}
  try{
    let params = new URLSearchParams(req.body);
    let sql = `select passHash, passSalt from users where email = '${params.get('email')}'`;
    let sqlRes = await util.promisify(db.connection.query.bind(db.connection))(sql);
    if(sqlRes.length > 0){
      if(security.verifyPassword(params.get('password'), sqlRes[0].passHash, sqlRes[0].passSalt)){
        let authToken = security.createAuthToken({username: params.get('email')});
        res.setHeader('Set-Cookie', `authToken=${authToken}; Max-Age=864000; Secure; HttpOnly`);
      }else
        throw new LoginError('Wrong password.');
    }else
      throw new LoginError('Email provided is not registered.');
  }catch(e){
    if(e instanceof LoginError)
      resObj.error = 'Login failed: could not authenticate user with email and password provided.'
    else
      resObj.error = 'Login failed because of an internal server error.'
    console.error(e);
  }finally{
    res.json(resObj);
  }
}