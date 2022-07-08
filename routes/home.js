const hbs = require('handlebars');
const fs = require('fs')

module.exports.handle = async function handle(req, res) {
  let template = fs.readFileSync('./views/home.hbs').toString();
  let view = hbs.compile(template);
  res.setHeader('Content-Type', 'text/html');
  res.write(view({"username": req.username}));
  res.end();
}