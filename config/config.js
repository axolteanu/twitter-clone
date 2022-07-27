const fs = require('fs');

let config = null;

let loadConfigs = function (){
  try{
    let data = fs.readFileSync("./config/config.json");
    config = JSON.parse(data);
  }catch(e){
    console.log(e);
    throw new Error("Could not load configuration.");
  }
}

loadConfigs();

module.exports = config;