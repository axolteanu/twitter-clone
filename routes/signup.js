let db = require('../services/db.js');
let security = require('../services/security.js');

module.exports.handle = async function(req, res){
  let params = new URLSearchParams(req.body);
  let hash = security.createPasswordHash(params.get('password'));
  let dob = `${params.get('dob-year')}-${params.get('dob-month')}-${params.get('dob-day')}`;
  var sql = `insert into users (name, passHash, passSalt, email, dob) values (
    '${params.get('name')}',
    '${hash.hash}',
    '${hash.salt}',
    '${params.get('email')}',
    '${dob}'
    )`;
  await db.query(sql);
  let authToken = security.createAuthToken({username: params.get('email')});
  res.setHeader('Set-Cookie', `authToken=${authToken}; Max-Age=864000; Secure; HttpOnly`);
  res.redirect(301, '/');
}