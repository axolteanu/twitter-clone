module.exports.handle = function (req, res, next) {
  if(req.cookies.authToken != undefined)
    res.redirect(301, '/home');
  else
    res.render('index');
}