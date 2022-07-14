module.exports.handle = function (req, res) {
  res.render('home', {authData: JSON.stringify(req.authData)});
}