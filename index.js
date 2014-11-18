var assert = require('assert');
var request = require('hyperquest');
var toStream = require('pull-stream-to-stream');
var toPull = require('stream-to-pull-stream');
var merge = require('pull-sorted-merge');
var JSONStream = require('JSONStream');
var through = require('through2');

module.exports = updates;
function updates(opts){
  assert(opts, 'settings required');
  assert(opts.repo, '.repo required');
  assert(opts.issue, '.issue required');
  
  var gh = function(endpoint){
    var req = request('https://api.github.com' + endpoint);
    req.setHeader('User-Agent', 'juliangruber/gh-issue-updates');
    if (opts.token) req.setHeader('Authorization', 'token ' + opts.token);
    return req;
  };

  var issue = gh('/repos/' + opts.repo + '/issues/' + opts.issue)
  .pipe(JSONStream.parse())
  .pipe(typeify('issue'));

  var comments = gh('/repos/' + opts.repo + '/issues/' + opts.issue + '/comments')
  .pipe(JSONStream.parse('*'))
  .pipe(typeify('comment'));

  var events = gh('/repos/' + opts.repo + '/issues/' + opts.issue + '/events')
  .pipe(JSONStream.parse('*'))
  .pipe(typeify('event'));

  var cmp = function(a, b){
    return date(a.data.created_at) - date(b.data.created_at);
  };

  return toStream.source(merge([
    toPull.source(issue),
    toPull.source(comments),
    toPull.source(events)
  ], cmp))
}

function typeify(t){
  return through.obj(function(data, _, done){
    done(null, {
      type: t,
      data: data
    })
  });
}

function date(str){
  return (new Date(str)).getTime();
}
