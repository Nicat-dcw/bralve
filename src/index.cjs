const { createRequire } = require('module');
const KiwiEmitter = require('@smootie/emitter');
const http = require('http');
const https = require('https');
const url = require('url');

const requireFunc = createRequire(import.meta.url);
const require = requireFunc.bind(requireFunc);

class Bralve extends KiwiEmitter {
  makeRequest(config) {
    const { protocol, hostname, port, path } = url.parse(config.url);
    const protocolModule = protocol === 'https:' ? https : http;

    const requestOptions = {
      method: config.method || 'GET',
      headers: {
        ...config.headers,
        'x-powered-by': 'Bralve By Nicat-dcw.',
        'x-request-date': Date.now()
      },
      hostname,
      port,
      path
    };

    return new Promise((resolve, reject) => {
      const req = protocolModule.request(requestOptions, res => {
        let responseData = '';

        res.on('data', chunk => {
          responseData += chunk;
        });

        res.on('end', () => {
          const response = {
            data: responseData,
            status: res.statusCode,
            bralveConfig: config,
            statusText: res.statusMessage,
            headers: res.headers
          };
          this.emit("request", { type:"succeedRequest", ...response})
          resolve(response);
        });
      });

      req.on('error', error => {
        this.emit("request", { type:"error", ...error})
        this.emit("error", error)
        reject(error);
      });

      if (config.data) {
        req.write(config.data);
      }

      req.end();
    });
  }

  get(url, config) {
    return this.makeRequest({ ...config, method: 'GET', url });
  }

  post(url, data, config) {
    return this.makeRequest({ ...config, method: 'POST', url, data });
  }

  patch(url, data, config) {
    return this.makeRequest({ ...config, method: 'PATCH', url, data });
  }

  put(url, data, config) {
    return this.makeRequest({ ...config, method: 'PUT', url, data });
  }

  delete(url, config) {
    return this.makeRequest({ ...config, method: 'DELETE', url });
  }
  
  head(url, config) {
    return this.makeRequest({ ...config, method: 'HEAD', url });
  }
}

module.exports = Bralve;
