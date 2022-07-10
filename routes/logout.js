module.exports.handle = function (req, res){
  res.setHeader('Set-Cookie', 'authToken=; Max-Age=0');
  res.redirect(301, '/');
}