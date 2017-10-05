let mongojs = require('mongojs');
let keys = require('./keys.json');

let db = mongojs(`mongodb://${keys.mLab.dbuser}:${keys.mLab.dbpassword}@ds127854.mlab.com:27854/jetro`,
  ['posts', 'portfolioItems', 'messages']);

module.exports = db;
