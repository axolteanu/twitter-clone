module.exports.handle = function (req, res) {
  res.render('home', {username: req.payload.username});
}