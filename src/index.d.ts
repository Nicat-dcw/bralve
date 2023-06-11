import { createRequire } from 'module';
import KiwiEmitter from "@smootie/emitter";
const require = createRequire(import.meta.url);
import http from 'http';
import https from 'https';
import url from 'url';

interface BralveConfig {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  data?: string;
}

interface BralveResponse {
  data: string;
  status: number;
  bralveConfig: BralveConfig;
  statusText: string;
  headers: http.IncomingHttpHeaders;
}

class Bralve extends KiwiEmitter {
  makeRequest(config: BralveConfig): Promise<BralveResponse> {
    const { protocol, hostname, port, path } = url.parse(config.url);
    const protocolModule = protocol === 'https:' ? https : http;

    const requestOptions: http.RequestOptions = {
      method: config.method || 'GET',
      headers: {
        ...config.headers,
        'x-powered-by': 'Bralve By Nicat-dcw.',
        'x-request-date': Date.now().toString()
      },
      hostname,
      port: port ? parseInt(port) : undefined,
      path
    };

    return new Promise((resolve, reject) => {
      const req = protocolModule.request(requestOptions, res => {
        let responseData = '';

        res.on('data', chunk => {
          responseData += chunk;
        });

        res.on('end', () => {
          const response: BralveResponse = {
            data: responseData,
            status: res.statusCode!,
            bralveConfig: config,
            statusText: res.statusMessage!,
            headers: res.headers
          };
          this.emit("request", { type:"succeedRequest", ...response});
          resolve(response);
        });
      });

      req.on('error', error => {
        this.emit("request", { type:"error", ...error});
        this.emit("error", error);
        reject(error);
      });

      if (config.data) {
        req.write(config.data);
      }

      req.end();
    });
  }

  get(url: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'GET', url });
  }

  post(url: string, data: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'POST', url, data });
  }

  patch(url: string, data: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'PATCH', url, data });
  }

  put(url: string, data: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'PUT', url, data });
  }

  delete(url: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'DELETE', url });
  }

  head(url: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'HEAD', url });
  }
}

export default Bralve;
