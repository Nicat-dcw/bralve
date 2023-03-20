
const http = require('http');
const querystring = require('querystring');
const colorette = require("colorette")
class RequestClient {
  constructor(config) {
    //if(!config) console.error(colorette.red("You must fill the Request Client"))
    this.config = config;
  }

  request() {
    return new Promise((resolve, reject) => {
      const options = {
        method: this.config.method,
        headers: this.config.headers || {}
      };

      let data = this.config.body;
      if (data) {
        if (typeof data !== 'string') {
          data = JSON.stringify(data);
        }
        options.headers['Content-Length'] = Buffer.byteLength(data);
      }

      const req = http.request(this.config.url, options, (res) => {
        let response = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          response += chunk;
        });
        res.on('end', () => {
          resolve(JSON.parse(response));
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (data) {
        req.write(data);
      }

      req.end();
    });
  }
  options(){
    this.config.method = "OPTIONS"
    return this.request();
  }
  get() {
    this.config.method = 'GET';
    return this.request();
  }

  post(data) {
    this.config.method = 'POST';
    this.config.body = data;
    this.config.headers = {
      'Content-Type': 'application/json'
    };
    return this.request();
  }
  head(data) {
    this.config.method = 'HEAD';
    this.config.body = data;
    this.config.headers = {
      'Content-Type': 'application/json'
    };
    return this.request();
  }
 
  put(data) {
    this.config.method = 'PUT';
    this.config.body = data;
    this.config.headers = {
      'Content-Type': 'application/json'
    };
    return this.request();
  }

  patch(data) {
    this.config.method = 'PATCH';
    this.config.body = data;
    this.config.headers = {
      'Content-Type': 'application/json'
    };
    return this.request();
  }

  delete() {
    this.config.method = 'DELETE';
    return this.request();
  }
}

module.exports = { RequestClient };