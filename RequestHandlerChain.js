const fs = require('fs');

function RouteHandler(url, method, handler){
  this.method = method;
  this.url = url;
  this.handler = handler;
  this.handle = function(req, res, next){
    if(req.url === this.url && req.method === this.method){
      this.handler(req, res, next);
    }else{
      next();
    }
  }
}

function handleStatic(req,res,next){
  if(/^\/[\w|-]+\.{1}\w+$/.test(req.url)){
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
  }else{
    res.statusCode = 400;
  }
  res.end();
}

class RequestHandlerChain{
  constructor(){
    this.handlers = [];
    this.req = null;
    this.res = null;
    
  }

  add(handler){
    this.handlers.push({"handle": handler});
  }

  addGet(url, handler){
    this.handlers.push(new RouteHandler(url, 'GET', handler));
  }

  addPost(url, handler){
    this.handlers.push(new RouteHandler(url, 'POST', handler));
  }

  addStatic(){
    this.handlers.push(handleStatic);
  }

  start(req, res){
    this.req = req;
    this.res = res;
    let handlers = this.handlers.map((x) => x);

    let next = function(){
      if(handlers.length > 0){
        let h = handlers.shift();
        h.handle(req,res,next);
      }
    }

    next();
  }
}

module.exports = RequestHandlerChain;