import { IDataApi, ProBarQueryParam, QueryParam, QueryResult } from './interface';
import axios from 'axios';
import { api } from './const';
import axiosRetry from 'axios-retry';
import { merge, DataFrame, Series, toJSON } from 'danfojs-node';
// import { MA } from './formula';
import * as dateFns from 'date-fns';
const _endpoint = 'http://api.tushare.pro';
axiosRetry(axios, { retries: 3, shouldResetTimeout: true });
const ROUND = 4; //0.12345678=>0.12
const PRICE_COLS = ['open', 'close', 'high', 'low', 'pre_close'];
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
      // throw new Error('api not supported');
      console.warn('api [%s] may be not supported ', api_name);
    }

    // if fields not set, output all fields of api defined
    const _fields = fields && fields.length ? fields : api[api_name]?.fields;

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
      const df = new DataFrame(items, { columns });
      const data = df.toJSON({ format: 'column' }) as Record<string, any>[];
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
      start_date: input_start_date,
      end_date: input_end_date,
      offset,
      limit,
      freq: input_freq = 'D',
      asset: input_asset = 'E',
      exchange = '',
      adj,
      // ma = [],
      factors,
      contract_type = '',
    } = param;
    if (!input_ts_code && adj) {
      throw new Error('param.ts_code is required');
    }

    const asset = input_asset.trim().toUpperCase();
    const ts_code = asset != 'C' ? input_ts_code.trim().toUpperCase() : input_ts_code.trim().toLowerCase();
    let freq = asset != 'C' ? input_freq.trim().toUpperCase() : input_freq.trim().toLowerCase();
    if (freq.trim().length >= 3) {
      freq = freq.trim().toLowerCase();
    }
    let start_date = input_start_date,
      end_date = input_end_date;
    if (!freq?.includes('min')) {
      const today = dateFns.format(new Date(), 'yyyyMMdd');
      start_date = start_date ?? undefined;
      end_date = end_date ?? today;
    }

    let data = new DataFrame([]);
    let df = new DataFrame([]);
    if (asset === 'E') {
      if (freq === 'D') {
        const daily = await this.query({ api_name: 'daily', params: { ts_code, start_date, end_date, limit, offset } });
        if (!daily.data || daily.data.length < 1) {
          return { isSuccess: true, data: [] };
        }
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
        const weekly = await this.query({
          api_name: 'weekly',
          params: { ts_code, start_date, end_date, limit, offset },
        });
        df = new DataFrame(weekly.data);
      }
      if (freq === 'M') {
        const monthly = await this.query({
          api_name: 'monthly',
          params: { ts_code, start_date, end_date, limit, offset },
        });
        df = new DataFrame(monthly.data);
      }
      if (freq.includes('min')) {
        const stk_mins = await this.query({
          api_name: 'stk_mins',
          params: { ts_code, start_date, end_date, freq, limit, offset },
        });
        if (!stk_mins.isSuccess) {
          throw new Error(stk_mins.msg);
        }
        df = new DataFrame(stk_mins.data);
        df['trade_date'] = df.column('trade_time').map((t: string) => t?.replace(/-/g, '').slice(0, 8));
        const pre_close = df.column('close').iloc(['1:']).append([NaN], [-999]);
        pre_close.resetIndex();
        df.addColumn('pre_close', pre_close);
      }
      if (adj && df.values.length > 0) {
        const adj_factor = await this.query({
          api_name: 'adj_factor',
          params: { ts_code, start_date, end_date },
          fields: ['trade_date', 'adj_factor'],
        });
        let fcts = new DataFrame(adj_factor.data);
        fcts = fcts.setIndex({ column: 'trade_date', drop: false }) as DataFrame;
        df = df.setIndex({ column: 'trade_date', drop: false }) as DataFrame;
        df = merge({
          left: df,
          right: fcts,
          on: ['trade_date'],
          how: 'left',
        }) as DataFrame;
        if (freq.includes('min')) {
          df = df.sortValues('trade_time', { ascending: false }) as DataFrame;
        }
        df = df.fillNa(0, { columns: ['adj_factor'] }) as DataFrame;
        df = df.resetIndex() as DataFrame;
        data = df.copy() as DataFrame;
        for (const col of PRICE_COLS) {
          //后复权
          if (adj === 'hfq') {
            df[col] = data.column(col).mul(data['adj_factor']).round(ROUND);
          } else {
            //前复权
            let dc = data.column(col).mul(data['adj_factor']);
            const fct0 = fcts.column('adj_factor').iloc([0]).values[0] as number;
            dc = dc.div(fct0).round(ROUND);
            df[col] = dc;
          }
        }
        df = df.drop({ columns: ['adj_factor'] }) as DataFrame;

        if (!freq.includes('min')) {
          const change = (df['close'] as Series).sub(df['pre_close']);
          const pct_chg = change.div(data.column('pre_close')).mul(100).round(ROUND);
          df.addColumn('change', change.round(ROUND), { inplace: true });
          df.addColumn('pct_chg', pct_chg, { inplace: true });
        } else {
          df.drop({ columns: ['trade_date', 'pre_close'], inplace: true });
        }
        data = df;
      } else {
        data = df;
      }
    } else if (asset === 'I') {
      if (freq == 'D') {
        const index_daily = await this.query({ api_name: 'index_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(index_daily.data);
      }
      if (freq == 'W') {
        const index_daily = await this.query({ api_name: 'index_weekly', params: { ts_code, start_date, end_date } });
        data = new DataFrame(index_daily.data);
      }
      if (freq == 'M') {
        const index_daily = await this.query({ api_name: 'index_monthly', params: { ts_code, start_date, end_date } });
        data = new DataFrame(index_daily.data);
      }
      if (freq.includes('min')) {
        const stk_mins = await this.query({
          api_name: 'stk_mins',
          params: { ts_code, start_date, end_date, freq, limit, offset },
        });

        data = new DataFrame(stk_mins.data);
      }
    } else if (asset === 'FT') {
      if (freq == 'D') {
        const fut_daily = await this.query({ api_name: 'fut_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(fut_daily.data);
      }
      if (freq.includes('min')) {
        const ft_mins = await this.query({
          api_name: 'ft_mins',
          params: { ts_code, start_date, end_date, freq, limit, offset },
        });

        data = new DataFrame(ft_mins.data);
      }
    } else if (asset === 'O') {
      if (freq == 'D') {
        const opt_daily = await this.query({ api_name: 'opt_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(opt_daily.data);
      }
      if (freq.includes('min')) {
        const stk_mins = await this.query({
          api_name: 'stk_mins',
          params: { ts_code, start_date, end_date, freq, limit, offset },
        });

        data = new DataFrame(stk_mins.data);
      }
    } else if (asset === 'CB') {
      if (freq == 'D') {
        const cb_daily = await this.query({ api_name: 'cb_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(cb_daily.data);
      }
    } else if (asset === 'FD') {
      if (freq == 'D') {
        const fund_daily = await this.query({ api_name: 'fund_daily', params: { ts_code, start_date, end_date } });
        data = new DataFrame(fund_daily.data);
      }
      if (freq.includes('min')) {
        const stk_mins = await this.query({
          api_name: 'stk_mins',
          params: { ts_code, start_date, end_date, freq, limit, offset },
        });

        data = new DataFrame(stk_mins.data);
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
    // if (ma && ma.length > 0) {
    //   for (const a in ma) {
    //     const n = parseInt(a) || 1;
    //     const maN = new Series(MA(data['close'], n)).asType('float32').round(2);
    //     data.addColumn(`ma${n}`, maN, { inplace: true });
    //     const maVN = new Series(MA(data['vol'], n)).asType('float32').round(2);
    //     data.addColumn(`ma_v_${n}`, maVN, { inplace: true });
    //   }
    // }
    // data.print();
    return {
      isSuccess: true,
      data: toJSON(data) as Record<string, any>[],
    };
  }
}

export default Client;
