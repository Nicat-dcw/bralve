# Bralve - Simple Request Module uses Http/Https
### • Installation
```bash
npm i @nicat.dcw/bralve --g
```

### • Request Client Setup
```js
const { RequestClient } = require("@nicat.dcw/bralve") // JavaScript
import { RequestClient } from '@nicat.dcw/bralve' // TypeScript

const req = new RequestClient({
  url: '', // your request url with starts http or https
  method: '' // request method: options,get,post,head,patch,put,delete
});
req.request().then((data) => {
console.log(x)
})
.catch((err) => console.err(err)) // JavaScript & TypeScript
``` 

### • Use Without mention method in Client;
```js
req.options()
req.get()
req.post()
req.head()
req.patch()
req.put()
req.delete()
```

> Made By Nicat.dcw
