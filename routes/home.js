module.exports.handle = async function handle(req, res) {
  res.render('home', {username: req.payload.username});
}