import Bralve from './src/index.d.ts';

// Create an instance of the Bralve class
const request = new Bralve();

// Test HTTP GET request
request.get('http://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('HTTP GET Error:', error);
  });

// Test HTTPS GET request
request.head('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('HTTPS GET Response:', response);
  })
  .catch(error => {
    console.error('HTTPS GET Error:', error);
  });
