let config = require('./config.js');
let home = require('./controllers/home');
let logout = require('./controllers/logout')
let signin = require('./controllers/signin');

let controllers = new Map();
controllers.set('/', home.handle);
controllers.set('/logout', logout.handle);
controllers.set('signin', signin.handle);

let mimes = new Map(config.mimes);

function handle(req, res){
  let handle = controllers.get(req.url);
  if(handle != undefined)
    handle(req, res);
  else{
    let fileType = ''; // parse extension
    let mime = mimes.get(fileType)
    handleFileRequest(req, res);
  }
    

  if(req.method === 'GET'){
    let handler = requestHandlers.gets.get(req.url);
    if(handler != undefined)
      handler(req, res);
    else
      requestHandlers.gets.get('static')(req, res);
  }else if(req.method === 'POST'){
    let handler = requestHandlers.posts.get(req.url);
    if(handler != undefined)
      handler(req, res);
    else
      res.end();
  }
}

function handleFileRequest(req, res){
  // get mime
  // get path
  // get file content
  // write in response and end
}

module.exports = {
  handle
}