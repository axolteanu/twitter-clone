const fs = require ('fs');
const config = require('./config/config.js');
const security = require('./security/security.js');
const home = require('./routes/home');
const logout = require('./routes/logout')
const signup = require('./routes/signup');
const RequestHandlerChain = require('./RequestHandlerChain.js');

let rhc = new RequestHandlerChain();
rhc.addStatic();
rhc.addGet('/', index.handle);
rhc.addPost('/signup', signup.handle);
rhc.add(authenticate);
rhc.addGet('/home', home.handle);
rhc.addPost('/logout', logout.handle);

async function authenticate(res, req, next){
  try{
    let payload = await security.authenticate(req);
    req.username = payload.username;
    next();
  }catch(e){
    res.statusCode = 301;
    res.setHeader('Location', '/');
    res.end();
    console.log(e);
  }
}

// TODO: add handlers

/*let handlers = new Map();
handlers.set('/', home.handle);
handlers.set('/logout', logout.handle);
handlers.set('/signup', signin.handle);*/

async function handle(req, res){
  rhc.start(req,res);

  /*let handler = handlers.get(req.url);
  if(handler != undefined){
    try{
      let payload = await security.authenticate(req);
      req.username = payload.username;
      handler(req, res);
    }catch(e){
      res.statusCode = 301;
      res.setHeader('Location', '/index.html');
      res.end();
      console.log(e);
    }
  }else if(/^\/[\w|-]+\.{1}\w+$/.test(req.url)){
    handleFileRequest(req, res);
  }else{
    res.statusCode = 400;
    res.end();
  }*/
}

/*async function handleFileRequest(req, res){
  let fileType = req.url.split('.')[1];
  let mediaType = config.mediaTypes.get(fileType);
  try{
    let data = fs.readFileSync('.' + mediaType.path + req.url);
    res.setHeader('Content-Type', mediaType.mime);
    res.write(data);
    res.statusCode = 200;
  }catch(e){
    res.statusCode = 404;
    console.log(e);
    console.log(`Can't locate file ${req.url}`);
  }
  res.end();
}*/

module.exports = {
  handle
}