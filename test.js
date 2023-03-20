const { RequestClient } = require('./index');

// GET isteği
const request = new RequestClient({
  url: 'http://discord.com/api/v9/users/',
  method: 'GET'
});
request.request().then((x) => console.log(x))
/*
requestGet.get().then(function(response) {
  console.log('GET isteği\n', response);
}).catch(function(error) {
  console.error(error);
});

// POST isteği
const requestPost = new RequestClient({
  url: 'http://jsonplaceholder.typicode.com/posts',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    title: 'foo',
    body: 'bar',
    userId: 1
  }
});

requestPost.post(requestPost.config.body).then(function(response) {
  console.log('POST isteği\n', response);
}).catch(function(error) {
  console.error(error);
});

// PUT isteği
const requestPut = new RequestClient({
  url: 'http://jsonplaceholder.typicode.com/posts/1',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1
  }
});

requestPut.put(requestPut.config.body).then(function(response) {
  console.log('PUT isteği\n', response);
}).catch(function(error) {
  console.error(error);
});

// PATCH isteği
const requestPatch = new RequestClient({
  url: 'http://jsonplaceholder.typicode.com/posts/1',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    title: 'foo'
  }
});

requestPatch.patch(requestPatch.config.body).then(function(response) {
  console.log('PATCH isteği\n', response);
}).catch(function(error) {
  console.error(error);
});

// DELETE isteği
const requestDelete = new RequestClient({
  url: 'http://jsonplaceholder.typicode.com/posts/1',
  method: 'DELETE'
});

requestDelete.delete().then(function(response) {
  console.log('DELETE isteği\n', response);
}).catch(function(error) {
  console.error(error);
});
*/