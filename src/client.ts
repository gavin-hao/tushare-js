import { IDataApi, QueryParam, QueryResult } from './interface';
import axios from 'axios';
import formatData from './formatData';
import { api } from './const';
import axiosRetry from 'axios-retry';

const _endpoint = 'http://api.tushare.pro';
axiosRetry(axios, { retries: 3, shouldResetTimeout: true });

class Client implements IDataApi {
  private token: string;
  private timeout: number | undefined;
  private url: string;
  constructor(token: string, endpoint?: string, timeout?: number) {
    this.token = token;
    this.timeout = timeout;
    this.url = endpoint || _endpoint;
  }

  async query(param: QueryParam): Promise<QueryResult> {
    const { api_name, params, fields } = param;

    if (!api[api_name]) {
      throw new Error('api not supported');
    }

    // if fields not set, output all fields of api defined
    const _fields = fields && fields.length ? fields : api[api_name].fields;

    const response = await axios.post(
      this.url,
      {
        api_name: api_name,
        token: this.token,
        params,
        fields: _fields,
      },
      { timeout: this.timeout }
    );
    if (response && response.data && response.data.code === 0) {
      const { fields: data_fields, items: data_items, hasMore } = response.data.data;
      const data = formatData({ fields: data_fields, items: data_items });

      return {
        isSuccess: true,
        data,
        hasMore,
      };
    } else {
      return {
        isSuccess: false,
        code: response.data.code,
        msg: response.data.msg,
      };
    }
  }
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
}

export default Client;
