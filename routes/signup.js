const userGateway = require('../services/user-gateway');
const security = require('../services/security');

class SignupError extends Error{
  constructor(msg){
    super(msg);
  }
}

module.exports.handle = async function(req, res, next){
  let resObj = {}
  try{
    let params = new URLSearchParams(req.body);
    let email = params.get('email');
    if(!(await userGateway.userWithEmailExists(email))){
      let hash = security.createPasswordHash(params.get('password'));
      let dob = `${params.get('dobYear')}-${params.get('dobMonth')}-${params.get('dobDay')}`;
      await userGateway.saveUser(params.get('name'), hash.hash, hash.salt, email, dob);
      let authToken = security.createAuthToken({userEmail: params.get('email')});
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