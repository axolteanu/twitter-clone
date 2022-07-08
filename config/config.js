const fs = require('fs');

let configs = {};
loadConfigs = function (){
  try{
    let data = fs.readFileSync("./config/config.json");
    configs = JSON.parse(data);
  }catch(e){
    console.log(e);
    console.log("Could not load configs.");
  }
}
loadConfigs();

module.exports = {
  dbConInfo: configs.dbConInfo,
  port: configs.port,
  mediaTypes: new Map(Object.entries(configs.mediaTypes)),
  https: configs.https,
  jwt: configs.jwt
}