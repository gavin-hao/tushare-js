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
  constructor(token: string, endpoint?: string, timeout: number = 0) {
    this.token = token;
    this.timeout = timeout;
    this.url = endpoint || _endpoint;
  }

  async query(param: QueryParam): Promise<QueryResult> {
    const { api_name, params, fields } = param;

    if (api[api_name]) {
      throw new Error('api_name not supported');
    }

    // if fields not set, output all fields of api defined
    const _fields = fields && fields.length ? fields : api[api_name]?.fields;

    try {
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
        const { fileds: data_fields, items: data_items, hasMore } = response.data.data;
        const data = formatData({ fields: data_fields, items: data_items });

        return {
          isSuccess: true,
          data,
          hasMore,
        };
      } else {
        return {
          isSuccess: false,
          msg: response.data.msg,
        };
      }
    } catch (error) {
      // Noncompliant
      throw error;
    }
  }
}

export default Client;
