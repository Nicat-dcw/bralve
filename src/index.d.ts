import http from 'http';
import https from 'https';
import url from 'url';

interface BralveConfig {
  url: string;
  method?: string;
  headers?: { [key: string]: string };
  data?: string;
}

interface BralveResponse {
  data: string;
  status: number;
  bralveConfig: BralveConfig;
  statusText: string;
  headers: http.IncomingHttpHeaders;
}

class Bralve {
  private makeRequest(config: BralveConfig): Promise<BralveResponse> {
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
            status: res.statusCode as number,
            bralveConfig: config,
            statusText: res.statusMessage as string,
            headers: res.headers
          };
          resolve(response);
        });
      });

      req.on('error', error => {
        reject(error);
      });

      if (config.data) {
        req.write(config.data);
      }

      req.end();
    });
  }

  public get(url: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'GET', url });
  }

  public post(url: string, data: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'POST', url, data });
  }

  public patch(url: string, data: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'PATCH', url, data });
  }

  public put(url: string, data: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'PUT', url, data });
  }

  public delete(url: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'DELETE', url });
  }

  public head(url: string, config?: BralveConfig): Promise<BralveResponse> {
    return this.makeRequest({ ...config, method: 'HEAD', url });
  }
}

export default Bralve;
