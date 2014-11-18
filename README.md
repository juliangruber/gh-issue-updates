
# gh-issue-updates

  Get all activity for an issue or pull request, in order.

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

