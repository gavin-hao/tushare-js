import { IDataApi, ProBarQueryParam, QueryParam, QueryResult } from './interface';
import axios from 'axios';
// import formatData from './formatData';
import { api } from './const';
import axiosRetry from 'axios-retry';
import { merge, DataFrame, Series } from 'danfojs-node';
import { MA } from './formula';
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
  /**
   * http查询接口
   * @param param {@link QueryParam} {api_name: string;params?: Record<string, any>;fields?: string[]; }
   * @param param.api_name rest api name {string}
   * @param param.params input parameter  { object }
   * @param param.fields output fileds { string[] }
   * @returns Promise<QueryResult> {@link QueryResult}
   *
   * @example
   * ```
   * const tu = TuShare(token);

      tu.query({
        api_name: 'daily'
        params: {
          ts_code: '000001.SZ',
          start_date: '20220701',
          end_date: '20220801',
        },
        fields: ['trade_date', 'open', 'close', 'high', 'low', 'vol', 'pct_chg'],
      })
   * ```
   */
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
  /**
   * 通用行情接口
   * @param param 输入参数 {@link ProBarQueryParam} {
      ts_code: string,
      start_date:{string: '20020801'}  ,
      end_date:{string: '20020801'}  ,
      freq:{string 'D''},
      asset: {string 'E''},
      exchange :string,
      adj,
      ma:{ string[]},
      factors,
      contract_type = '',
    }
   * @returns Promise<QueryResult> {@link QueryResult}
   */
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
    let data = new DataFrame([]);
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
          df = merge({ left: df, right: ds, on: ['trade_date'], how: 'inner' }) as DataFrame;
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
        df = merge({
          left: df,
          right: fcts.setIndex({ column: 'trade_date' }),
          on: ['trade_date'],
          how: 'left',
        }) as DataFrame;
        df.fillNa(0, { columns: ['adj_factor'], inplace: true }) as DataFrame;
        for (const col in PRICE_COLS) {
          //后复权
          if (adj === 'hfq') {
            df[col] = (df[col] as Series).mul(df['adj_factor']);
          } else {
            //前复权
            df[col] = (df[col] as Series).mul(df['adj_factor']).div(parseFloat(fcts['adj_factor'][0]));
          }
          df[col] = (df[col] as Series).asType('float32').round(2);
        }

        df = df.drop({ columns: ['adj_factor'] }) as DataFrame;
        df['change'] = (df['close'] as Series).sub(df['pre_close']);
        const pct_change = (df.pctChange(1)['close'] as Series).mul(100).asType('float32');
        df.addColumn('pct_change', pct_change, { inplace: true });
        data = df;
      } else {
        data = df;
      }
    } else if (asset === 'I') {
      if (freq == 'D') {
        const index_daily = await this.query({ api_name: 'index_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(index_daily.data);
      }
    } else if (asset === 'FT') {
      if (freq == 'D') {
        const fut_daily = await this.query({ api_name: 'fut_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(fut_daily.data);
      }
    } else if (asset === 'O') {
      if (freq == 'D') {
        const opt_daily = await this.query({ api_name: 'opt_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(opt_daily.data);
      }
    } else if (asset === 'FD') {
      if (freq == 'D') {
        const fund_daily = await this.query({ api_name: 'fund_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(fund_daily.data);
      }
    } else if (asset === 'C') {
      let coinbar_freq = freq;
      if (freq === 'd') {
        coinbar_freq = 'daily';
      }
      if (freq === 'w') {
        coinbar_freq = 'week';
      }
      const coinbar = await this.query({
        api_name: 'coinbar',
        params: { symbol: ts_code, start_date, end_date, contract_type, exchange, freq: coinbar_freq },
      });
      data = new DataFrame(coinbar.data);

      if (freq == 'D') {
        const opt_daily = await this.query({ api_name: 'opt_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(opt_daily.data);
      }
    }
    // calculate MA
    if (ma && ma.length > 0) {
      for (const a in ma) {
        const n = parseInt(a) || 1;
        const maN = new Series(MA(data['close'], n)).asType('float32').round(2);
        data.addColumn(`ma${n}`, maN, { inplace: true });
        const maVN = new Series(MA(data['vol'], n)).asType('float32').round(2);
        data.addColumn(`ma_v_${n}`, maVN, { inplace: true });
      }
    }

    return {
      isSuccess: true,
      data: data?.toJSON() as Record<string, any>[],
    };
  }
}

export default Client;
