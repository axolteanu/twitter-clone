const config = require('./config/config.js');
const db = require('./services/db.js');
const server = require('./services/server.js');

let run = async () => {
  try{
    await db.connect(config.dbConInfo);
    server.start(config.port);
  }catch(e){
    console.log(e);
    console.log("App exited because of an error.");
  }
}

run();