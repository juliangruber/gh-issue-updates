var getUpdates = require('./');

getUpdates({
  repo: 'octocat/Spoon-Knife',
  issue: 3858
}, function(err, updates){
  if (err) throw err;
  console.log(updates);
});
