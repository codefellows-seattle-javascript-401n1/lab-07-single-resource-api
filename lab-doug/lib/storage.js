'use strict';
const fs = require('fs');
const Storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

Storage.prototype.setItem = function(schema, item){
  return new Promise((resolve, reject) => {
    // item = JSON.stringify(item);
    console.log('setItem result: ', item);
    fs.writeFile(`${this.dataDir}/${schema}/${item.uuid}.json`, JSON.stringify(item), function(err){
      if(err) return reject(err);
      resolve(item);
    });
  });
};

Storage.prototype.fetchItem = function(schema, uuid){
  return new Promise((resolve, reject) => {
    fs.readFile(`${this.dataDir}/${schema}/${uuid}.json`, function(err, item){
      if(err) return reject(err);
      try{
        item = JSON.parse(item);
        console.log('fetched item after parse:', item);
        resolve(item);
      } catch (err){
        resolve(err);
      }
    });
  });
};
