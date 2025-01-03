export interface ErrorResponse {
  requestId: string;
  requestTimestamp?: string;
  message: string;
  cause?: any;
}

export interface ErrorLog {
  requestId: string;
  requestTimestamp: string;
  error: {
    message: string;
    name: string;
    statusCode?: number;
    code?: string;
    status?: number;
    stack?: any;
  };
  requestDetails: {
    url: string;
    headers: any;
    method: string;
    body: any;
    params: any;
    query: any;
  };
  response?: any;
}
