import { IDataApi, ProBarQueryParam, QueryParam, QueryResult } from './interface';
import axios from 'axios';
// import formatData from './formatData';
import { api } from './const';
import axiosRetry from 'axios-retry';
import dft, { DataFrame, Series } from 'danfojs-node';
const _endpoint = 'http://api.tushare.pro';
axiosRetry(axios, { retries: 3, shouldResetTimeout: true });
const PRICE_COLS = ['open', 'close', 'high', 'low', 'pre_close'];
// const FORMAT = lambda x: '%.2f' % x
const FREQS = { D: '1DAY', W: '1WEEK', Y: '1YEAR' };
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
      const { fields: columns, items, hasMore } = response.data.data;
      const df = new DataFrame(items, columns);
      const data = df.toJSON({ format: 'row' }) as Record<string, any>[];
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
  async pro_bar(param: ProBarQueryParam): Promise<QueryResult> {
    const {
      ts_code: input_ts_code,
      start_date,
      end_date,
      freq: input_freq = 'D',
      asset: input_asset = 'E',
      exchange = '',
      adj,
      ma = [],
      factors,
      contract_type = '',
    } = param;
    const asset = input_asset.trim().toUpperCase();
    const ts_code = asset != 'C' ? input_ts_code.trim().toUpperCase() : input_ts_code.trim().toLowerCase();
    const freq = asset != 'C' ? input_freq.trim().toUpperCase() : input_freq.trim().toLowerCase();
    let data: DataFrame = new DataFrame([]);
    let df = new DataFrame([]);
    if (asset === 'E') {
      if (freq === 'D') {
        const daily = await this.query({ api_name: 'daily', params: { ts_code, start_date, end_date } });
        df = new DataFrame(daily.data);
        if (factors && factors.length > 0) {
          const daily_basic = await this.query({
            api_name: 'daily_basic',
            params: { ts_code, start_date, end_date },
            fields: ['trade_date', 'turnover_rate', 'volume_ratio'],
          });
          let ds = new DataFrame(daily_basic.data);
          ds = ds.setIndex({ column: 'trade_date' }) as DataFrame;
          df = df.setIndex({ column: 'trade_date' }) as DataFrame;
          df = dft.merge({ left: df, right: ds, on: ['trade_date'], how: 'inner' }) as DataFrame;
          df = df.resetIndex() as DataFrame;
          if (factors.includes('tor') && !factors.includes('vr')) {
            df = df.drop({ columns: ['volume_ratio'] }) as DataFrame;
          } else {
            df = df.drop({ columns: ['turnover_rate'] }) as DataFrame;
          }
        }
      }
      if (freq === 'W') {
        const weekly = await this.query({ api_name: 'weekly', params: { ts_code, start_date, end_date } });
        df = new DataFrame(weekly.data);
      }
      if (freq === 'M') {
        const monthly = await this.query({ api_name: 'monthly', params: { ts_code, start_date, end_date } });
        df = new DataFrame(monthly.data);
      }
      if (adj) {
        const adj_factor = await this.query({
          api_name: 'adj_factor',
          params: { ts_code, start_date, end_date },
          fields: ['trade_date', 'adj_factor'],
        });
        const fcts = new DataFrame(adj_factor.data);
        df.setIndex({ column: 'trade_date', drop: false });
        df = dft.merge({
          left: df,
          right: fcts.setIndex({ column: 'trade_date' }),
          on: ['trade_date'],
          how: 'left',
        }) as DataFrame;
        data = df.fillNa(0, { columns: ['adj_factor'] });
        for (const col in PRICE_COLS) {
          //后复权
          if (adj === 'hfq') {
            data[col] = data[col] * data['adj_factor'];
          } else {
            //前复权
            data[col] = (data[col] * data['adj_factor']) / parseFloat(fcts['adj_factor'][0]);
          }
          data[col] = (data[col] as Series).map((x: number) => x.toFixed());
        }
        for (const col in PRICE_COLS) {
          data[col] = (data[col] as Series).asType('float32');
        }
        data = data.drop({ columns: ['adj_factor'] });
        df['change'] = (df['close'] as Series).sub(df['pre_close']);
        df['pct_change'] = parseFloat(df.pctChange(1)['close']) * 100; //(df['close'] as Series).pctChange() * 100;
      } else {
        data = df;
      }
    }

    return {
      isSuccess: true,
      data: data?.toJSON() as Record<string, any>[],
    };
  }
}

export default Client;
