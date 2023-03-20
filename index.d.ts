
import * as http from 'http';

class RequestClient {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public request(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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

  public get(): Promise<any> {
    this.config.method = 'GET';
    return this.request();
  }

  public post(data: any): Promise<any> {
    this.config.method = 'POST';
    this.config.body = data;
    this.config.headers = {
      'Content-Type': 'application/json'
    };
    return this.request();
  }

  public put(data: any): Promise<any> {
    this.config.method = 'PUT';
    this.config.body = data;
    this.config.headers = {
      'Content-Type': 'application/json'
    };
    return this.request();
  }

  public patch(data: any): Promise<any> {
    this.config.method = 'PATCH';
    this.config.body = data;
    this.config.headers = {
      'Content-Type': 'application/json'
    };
    return this.request();
  }

  public delete(): Promise<any> {
    this.config.method = 'DELETE';
    return this.request();
  }
}

export { RequestClient }; 