module.exports.handle = function handle(req, res) {
  res.render('home', {username: req.payload.username});
}