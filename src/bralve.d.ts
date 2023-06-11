import { IncomingHttpHeaders, ClientRequest } from 'http';

declare class Bralve {
  makeRequest(config: Bralve.RequestConfig): Promise<Bralve.Response>;

  get(url: string, config?: Bralve.RequestConfig): Promise<Bralve.Response>;
  post(url: string, data: any, config?: Bralve.RequestConfig): Promise<Bralve.Response>;
  patch(url: string, data: any, config?: Bralve.RequestConfig): Promise<Bralve.Response>;
  put(url: string, data: any, config?: Bralve.RequestConfig): Promise<Bralve.Response>;
  delete(url: string, config?: Bralve.RequestConfig): Promise<Bralve.Response>;
  head(url: string, config?: Bralve.RequestConfig): Promise<Bralve.Response>;
}

declare namespace Bralve {
  interface RequestConfig {
    method?: string;
    headers?: IncomingHttpHeaders;
    data?: any;
    url: string;
  }

  interface Response {
    data: string;
    status: number;
    bralveConfig: RequestConfig;
    statusText: string;
    headers: IncomingHttpHeaders;
  }
}

export default Bralve;
