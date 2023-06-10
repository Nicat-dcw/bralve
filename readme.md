
# Bralve HTTP Request Module

The Bralve HTTP Request Module is a lightweight module for making HTTP and HTTPS requests in Node.js using the XMLHttpRequest API. It provides a simple and intuitive interface for making GET, POST, PATCH, PUT, and DELETE requests.

## Installation

Install the module using npm & yarn & pnpm:

```
npm install @nicat.dcw/bralve 
yarn add @nicat.dcw/bralve 
npm i pnpm && pnpm i @nicat.dcw/bralve/
```

## Runtimes 
also you can use bralve with `typescript` and `commonjs`.

## Usage

```javascript
import Bralve from '@nicat.dcw/bralve';

// Create an instance of the Request class
const request = new Bralve();

// Make an HTTP GET request
request.get('http://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('Bralve Response:', response);
  })
  .catch(error => {
    console.error('Bralve Error:', error);
  });

// Make an HTTPS POST request
const postData = JSON.stringify({ title: 'foo', body: 'bar', userId: 1 });
request.post('https://jsonplaceholder.typicode.com/posts', postData, { headers: { 'Content-Type': 'application/json' } })
  .then(response => {
    console.log('Bralve POST Response:', response);
  })
  .catch(error => {
    console.error('Bralve POST Error:', error);
  });

```

## API

### `Bralve`

The `Bralve` class represents the HTTP request constructor.

#### `get(url, config?)`

Sends an HTTP GET request to the specified URL.

- `url` (string): The URL to send the request to.
- `config` (optional, object): Additional configuration options for the request.

#### `post(url, data, config?)`

Sends an HTTP POST request to the specified URL.

- `url` (string): The URL to send the request to.
- `data` (string): The request payload data.
- `config` (optional, object): Additional configuration options for the request.

#### `patch(url, data, config?)`

Sends an HTTP PATCH request to the specified URL.

- `url` (string): The URL to send the request to.
- `data` (string): The request payload data.
- `config` (optional, object): Additional configuration options for the request.

#### `put(url, data, config?)`

Sends an HTTP PUT request to the specified URL.

- `url` (string): The URL to send the request to.
- `data` (string): The request payload data.
- `config` (optional, object): Additional configuration options for the request.

#### `delete(url, config?)`

Sends an HTTP DELETE request to the specified URL.

- `url` (string): The URL to send the request to.
- `config` (optional, object): Additional configuration options for the request.
- 
#### `head(url, config?)`

Sends an HTTP HEAD request to the specified URL.

- `url` (string): The URL to send the request to.
- `config` (optional, object): Additional configuration options for the request.
  
## License

This module is licensed under the [MIT License](https://github.com/Nicat-dcw/bralve).

Feel free to further customize the styling and content of the README.md file to suit your preferences and specific module details.

Let me know if there's anything else I can help you with!