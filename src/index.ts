import Client from './client';
import { api, Api } from './const';
import { QueryResult, IDataApi, QueryParam, ProBarQueryParam } from './interface';
export * from './interface';
export * from './formula';
type ApiParam = Omit<QueryParam, 'api_name'>;
export type ITuShare = IDataApi & {
  [Property in keyof Api]: (param: ApiParam) => Promise<QueryResult>;
};

const TuShare = function (token: string, endpoint?: string, timeout?: number): ITuShare {
  const client = new Client(token, endpoint, timeout);

  const dataApi: ITuShare = {
    query: async (param: QueryParam) => await client.query(param),
    pro_bar: async (param: ProBarQueryParam) => await client.pro_bar(param),
  } as unknown as ITuShare;
  for (const apiName in api) {
    (dataApi as any)[apiName] = async (param: ApiParam) => {
      return client.query({ api_name: apiName, ...param });
    };
  }
  return dataApi;
};
export default TuShare;
