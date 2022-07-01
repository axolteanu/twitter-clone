const fs = require('fs');

function getConfigFile(path){
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      resolve({err, data});
    });  
  });
}

let configs = {};

module.exports = {
  loadConfigs : async function (){
    let res = await getConfigFile('./app/config.json');
    if(res.err)
      console.log(`Could not load configs:\n${res.err.message}`);
    else
      configs = JSON.parse(res.data);
  },
  getDbConInfo: () => {return configs.dbConInfo;},
  getPort: () => {return configs.port;}
}