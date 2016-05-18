## Blackadder

Async [Flashheart](https://www.npmjs.com/package/flashheart)

## API

Using async-await,

```js
const client = new Blackadder(),
    { body } = await client.get('http://hihi.com/haha.json');
```

Promise?

```js
const Blackadder = require('blackadder').default,
    client = new Blackadder();
    client.get('http://hihi.com/haha.json')
        .then((res) => { console.log(res.body); console.log(res.response); })
        .catch((err)) => { console.log(err); });
```

## Credits
- Copyright © 2016 HOOQ Digital Pte. Ltd. and project authors.
- Licensed under MIT
