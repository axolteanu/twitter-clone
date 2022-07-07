let db = require('../db.js');
let security = require('../security/security.js');

async function handle(req, res){
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', async () => {
    let params = new URLSearchParams(data);
    let hash = security.createPasswordHash(params.get('password'));
    let dob = `${params.get('dob-year')}-${params.get('dob-month')}-${params.get('dob-day')}`;
    var sql = `insert into users (name, passHash, passSalt, email, dob) values (
      '${params.get('name')}',
      '${hash.hash}',
      '${hash.salt}',
      '${params.get('email')}',
      '${dob}'
      )`;
    try{
      await db.query(sql);
      console.log("1 user saved");
      let authToken = security.createAuthToken({username: params.get('email')});
      res.writeHead(301,{
        'Location': '/',
        'Set-Cookie': `authToken=${authToken}; Max-Age=864000; Secure; HttpOnly`
      });
      res.end();
    }catch(e){
      console.log(err);
      console.log("User was not saved"); 
    }
  });
}

module.exports = {
  handle
}