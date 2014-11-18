
# gh-issue-updates

  Get the comments and events for an issue, in order

## Example

```js
var getUpdates = require('gh-issue-updates');

getUpdates({
  repo: 'octocat/Spoon-Knife',
  issue: 3858
}).on('data', console.log)
```

## Installation

```bash
$ npm install gh-issue-updates
```

## License

  MIT

