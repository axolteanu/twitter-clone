const util = require('util');
const db = require('../services/db');
const security = require('../services/security');

module.exports.handle = async function(req, res, next){
  try{
    let params = new URLSearchParams(req.body);
    let hash = security.createPasswordHash(params.get('password'));
    let dob = `${params.get('dob-year')}-${params.get('dob-month')}-${params.get('dob-day')}`;
    let sql = `insert into users (name, passHash, passSalt, email, dob) values (
      '${params.get('name')}',
      '${hash.hash}',
      '${hash.salt}',
      '${params.get('email')}',
      '${dob}'
    )`;
    await util.promisify(db.connection.query.bind(db.connection))(sql);
    let authToken = security.createAuthToken({username: params.get('email')});
    res.setHeader('Set-Cookie', `authToken=${authToken}; Max-Age=864000; Secure; HttpOnly`);
    res.redirect(301, '/');
  }catch(e){
    next(e);
  }
}