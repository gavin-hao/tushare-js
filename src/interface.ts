export interface QueryResult {
  isSuccess: boolean;
  msg?: string;
  code?: number;
  data?: Record<string, any>[];
  hasMore?: boolean;
}
export type ResultData = {
  fields: string[];
  items: any[];
};
export interface QueryParam {
  api_name: string;
  params?: Record<string, any>;
  fields?: string[];
}
export interface IDataApi {
  // token: string;
  // setToken(token: string): void;
  query(param: QueryParam): Promise<QueryResult>;
}
