function handle(req, res){
  res.setHeader('Set-Cookie', `authToken=; Max-Age=0`);
  res.statusCode = 301;
  res.setHeader('Location', '/');
  res.end();
}

module.exports = {
  handle
}