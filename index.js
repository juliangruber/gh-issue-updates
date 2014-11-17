var assert = require('assert');
var request = require('hyperquest');
var collect = require('collect-stream');
var once = require('once');

module.exports = updates;
function updates(opts, cb){
  assert(opts, 'settings required');
  assert(opts.repo, '.repo required');
  assert(opts.issue, '.issue required');
  cb = once(cb);
  
  var gh = function(endpoint){
    var req = request('https://api.github.com' + endpoint);
    req.setHeader('User-Agent', 'juliangruber/gh-issue-updates');
    if (opts.token) req.setHead('Authorization', opts.token);
    return req;
  };

  var comments, events;

  var c = gh('/repos/' + opts.repo + '/issues/' + opts.issue + '/comments');
  collect(c, function(err, body){
    if (err) return cb(err);
    try {
      comments = JSON.parse(body.toString()).map(function(comment){
        return {
          type: 'comment',
          data: comment
        };
      });
    } catch (err) {
      return cb(err);
    }
    if (events) next();
  });

  var e = gh('/repos/' + opts.repo + '/issues/' + opts.issue + '/events');
  collect(e, function(err, body){
    if (err) return cb(err);
    try {
      events = JSON.parse(body.toString()).map(function(event){
        return {
          type: 'event',
          data: event
        };
      });
    } catch (err) {
      return cb(err);
    }
    if (comments) next();
  });

  var next = function(){
    var out = comments.concat(events);
    out.sort(function(a, b){
      return date(a.created_at) - date(b.created_at);
    });
    cb(null, out);
  };
}

function date(str){
  return (new Date(str)).getTime();
}
