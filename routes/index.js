const hbs = require('handlebars');
const fs = require('fs')

async function handle(req, res) {
  try{
    let payload = await security.authenticate(req);
    next('/home');
  }catch(e){
    let data = fs.readFileSync('/views/index.html');
    res.setHeader('Content-Type', 'text/html');
    res.write(data);
    res.end();
  }
}

module.exports = {
  handle
}