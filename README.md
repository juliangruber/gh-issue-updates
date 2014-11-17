
# gh-issue-updates

  Get the comments and events for an issue, in order

## Example

```js
var getUpdates = require('gh-issue-updates');

getUpdates({
  repo: 'octocat/Spoon-Knife',
  issue: 3858
}, function(err, updates){
  if (err) throw err;
  console.log(updates);
});
```

## Installation

```bash
$ npm install gh-issue-updates
```

## License

  MIT

