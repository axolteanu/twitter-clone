const hbs = require('handlebars');
const fs = require('fs')

async function handle(req, res) {
  let template = fs.readFileSync('../../views/home.hbs');
  let view = hbs.compile(template);
  res.write(view({"username": req.username}));
  res.setHeader('Content-Type', 'text/html');
  res.end();
}

module.exports = {
  handle
}