const config = require('./config/config');
const db = require('./services/db');
const server = require('./services/server');

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