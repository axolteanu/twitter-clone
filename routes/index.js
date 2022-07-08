const fs = require('fs')

module.exports.handle = async function (req, res) {
  if(req.cookies.authToken != undefined){
    res.statusCode = 301;
    res.setHeader('Location', '/home');
    res.end();
  }else{
    let data = fs.readFileSync('./views/index.html');
    res.setHeader('Content-Type', 'text/html');
    res.write(data);
    res.end();
  }
}