const fs = require('fs')
const utils = require('../services/utils')

module.exports.handle = async function (req, res) {
  let authToken = utils.getCookie(req, 'authToken');
  if(authToken != ''){
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