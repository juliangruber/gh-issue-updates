var getUpdates = require('./');

getUpdates({
  repo: 'rvagg/through2',
  issue: 33
}).on('data', console.log);
