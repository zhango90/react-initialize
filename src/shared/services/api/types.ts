export interface IClientConfig {
  data?: Record<string, any>;
  token?: string;
  headers?: Partial<HeadersInit>;
  customConfig?: Partial<RequestInit>;
}
