const util = require('util');
const db = require('../services/db');
const security = require('../services/security');

class SignupError extends Error{
  constructor(msg){
    super(msg);
  }
}

async function isEmailAlreadySaved(email){
  let sql = `select null from users where email = '${email}'`;
  let sqlRes = await util.promisify(db.connection.query.bind(db.connection))(sql);
  return sqlRes.length > 0;
}

async function saveUser(name, hash, salt, email, dob){
  let sql = `insert into users (name, passHash, passSalt, email, dob) values (
    '${name}',
    '${hash}',
    '${salt}',
    '${email}',
    '${dob}'
  )`;
  await util.promisify(db.connection.query.bind(db.connection))(sql);
}

module.exports.handle = async function(req, res, next){
  let resObj = {}
  try{
    let params = new URLSearchParams(req.body);
    let email = params.get('email');
    if(!(await isEmailAlreadySaved(email))){
      let hash = security.createPasswordHash(params.get('password'));
      let dob = `${params.get('dobYear')}-${params.get('dobMonth')}-${params.get('dobDay')}`;
      await saveUser(params.get('name'), hash.hash, hash.salt, email, dob);
      let authToken = security.createAuthToken({username: params.get('email')});
      res.setHeader('Set-Cookie', `authToken=${authToken}; Max-Age=864000; Secure; HttpOnly`);
    }else
      throw new SignupError('Signup failed: email is already registered.');
  }catch(e){
    if(e instanceof SignupError)
      resObj.error = e.message;
    else
      resObj.error = 'Signup failed because of an internal server error.';
    console.error(e);
  }finally{
    res.json(resObj);
  }
}