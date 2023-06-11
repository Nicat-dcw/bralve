import Bralve from './src/index.js';

// Create an instance of the Request class
const request = new Bralve();
request.on("request", (e) => console.log("Res", e))
// Test HTTP GET request
request.get('http://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log(response.data)
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
