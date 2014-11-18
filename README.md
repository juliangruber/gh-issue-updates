
# gh-issue-updates

  Get all activity for an issue or pull request, in order.

## Example

```js
var getUpdates = require('gh-issue-updates');

getUpdates({
  repo: 'rvagg/through2',
  issue: 33
}).on('data', console.log)
```

  Output:

```bash
$ node example.js
{ type: 'issue',
  data: '...' }
{ type: 'commit comment',
  data:  '...' }
{ type: 'comment',
  data:  '...' }
...
```

## Installation

```bash
$ npm install gh-issue-updates
```

## Emitted events

  - issue
  - comment
  - commit comment
  - event (assigned, merged, watched etc)

## License

  MIT

