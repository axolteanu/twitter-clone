const config = require('./config.js');
const db = require('./db.js');
const web = require('./web.js');

module.exports = async () => {
  await config.loadConfigs();
  await db.connect(config.getDbConInfo());
  web.start(config.getPort());
}