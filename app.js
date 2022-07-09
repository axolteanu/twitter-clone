const config = require('./config/config.js');
const db = require('./services/db.js');
const server = require('./services/server.js');

let run = () => {
  db.connect(config.dbConInfo).
  then(server.start(config.port)).
  catch(e => {
    console.log(e);
    console.log('Failed to start app.');
  });
}

run();