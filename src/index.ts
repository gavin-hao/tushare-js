import Client from './client';
import { api, Api } from './const';
import { QueryResult, IDataApi, QueryParam } from './interface';
export * from './interface';

type ApiParam = Omit<QueryParam, 'api_name'>;
export type ITuShare = IDataApi & {
  [Property in keyof Api]: (param: ApiParam) => Promise<QueryResult>;
};

const TuShare = function (token: string, endpoint?: string, timeout: number = 0): ITuShare {
  const client = new Client(token, endpoint, timeout);
  // const pro_bar = (
  //   ts_code: string,
  //   start_date?: string,
  //   end_date?: string,
  //   freq: string = 'D',
  //   asset: string = 'E',
  //   exchange: string = '',
  //   adj: string,
  //   ma: string[] = [],
  //   factors: string = undefined,
  //   contract_type: string = ''
  // ) => {
  //   let _ts_code = '';
  //   let _freq = '';
  //   let _asset = asset.trim().toUpperCase();
  //   if (asset != 'C') {
  //     _ts_code = ts_code.trim().toUpperCase();
  //     _freq = freq.trim().toUpperCase();
  //   } else {
  //     _ts_code = ts_code.trim().toLowerCase();
  //     _freq = freq.trim().toLowerCase();
  //   }
  //   // switch (_asset) {
  //   //   case 'E': {
  //   //     if (_freq == 'D') {
  //   //       const df = client.query({ api_name: 'daily', params: { ts_code: _ts_code, start_date, end_date } });
  //   //     } else if (_freq == 'W') {
  //   //       const df = client.query({ api_name: 'weekly', params: { ts_code: _ts_code, start_date, end_date } });
  //   //     } else if (_freq == 'M') {
  //   //       const df = client.query({ api_name: 'monthly', params: { ts_code: _ts_code, start_date, end_date } });
  //   //     }
  //   //   }
  //   // }
  //   return [];
  // };
  const dataApi: ITuShare = {
    query: client.query,
  } as unknown as ITuShare;
  for (const apiName in api) {
    (dataApi as any)[apiName] = (param: ApiParam) => {
      return client.query({ api_name: apiName, ...param });
    };
  }
  return dataApi;
};
export default TuShare;
