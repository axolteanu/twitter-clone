module.exports.handle = function handle(req, res){
  res.setHeader('Set-Cookie', `authToken=; Max-Age=0`);
  res.redirect(301, '/');
}