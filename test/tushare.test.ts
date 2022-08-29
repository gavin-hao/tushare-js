import TuShare from '../src/index';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { stock_basic, daily } from './tushare.data';
import dotenv from 'dotenv';
import path from 'path';
import { DataFrame, Series } from 'danfojs-node';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
describe('TuShare Class', () => {
  const token = process.env.token || '97a54f9b384e648ec2fb0e4bb077febcb40b22856c75953997d01f6a';
  const ts = TuShare(token);
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('init client ', () => {
    const client = TuShare('', 'http://api.waditu.com', 30);
    expect(client).toBeTruthy();
    expect(client).toHaveProperty('daily_basic');
    // client.daily_basic
  });
  test('api not found', async () => {
    try {
      const result = await ts.query({ api_name: 'not_exits_api', params: { limit: 5, offset: 0 } });
    } catch (e: any) {
      expect(e.message).toBe('api not supported');
    }
  });

  test('query failed', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`http://api.tushare.pro`).reply(() =>
      // the actual id can be grabbed from config.url
      [200, { ...stock_basic, code: 4000, msg: 'error' }]
    );
    const result = await ts.query({ api_name: 'stock_basic', params: { limit: -5, offset: 0 } });
    expect(result.isSuccess).toBe(false);
  });

  test('stock_basic', async () => {
    const mock = new MockAdapter(axios);

    // Mock any Post request
    // arguments for reply are (status, data, headers)
    mock.onPost(`http://api.tushare.pro`).reply(() =>
      // the actual id can be grabbed from config.url
      [200, stock_basic]
    );
    const result = await ts.query({ api_name: 'stock_basic', params: { limit: 5, offset: 0 } });
    expect(result.isSuccess).toBe(true);
  });

  test('should contain daily method', () => {
    expect(ts.daily).toBeTruthy();
  });
  test('daily', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`http://api.tushare.pro`).reply(() =>
      // the actual id can be grabbed from config.url
      [200, daily]
    );
    const result = await ts.daily({
      params: {
        ts_code: '002156',
        trade_date: '20220809',
        start_date: '20200808',
        end_date: '20220809',
        limit: 5,
        offset: 0,
      },
      fields: ['ts_code', 'trade_date', 'open', 'high', 'low'],
    });
    expect(result.isSuccess).toBe(true);
  });
  // test('daily 2', async () => {
  //   const result = await ts.daily({
  //     params: {
  //       // ts_code: '002156',
  //       // trade_date: '20220809',
  //       // start_date: '20200808',
  //       // end_date: '20220809',
  //       limit: 5,
  //       offset: 0,
  //     },
  //     fields: ['ts_code', 'trade_date', 'open', 'high', 'low'],
  //   });
  //   console.log(result);
  // });
  // test('stk_min', async () => {
  //   const d = await ts.stk_mins({
  //     params: {
  //       ts_code: '000001.SZ',
  //       end_date: '20220821',
  //       // start_date: '20220108',
  //       // end_date: '20220809',
  //       freq: '5min',
  //     },
  //   });
  //   console.log(d);
  // });
  // test('adj_factor', async () => {
  //   const adj_factor = await ts.query({
  //     api_name: 'adj_factor',
  //     params: { ts_code: '000001.SZ', start_date: '20220108' },
  //     fields: ['trade_date', 'adj_factor'],
  //   });
  //   // console.log(adj_factor.data);
  //   let fcts = new DataFrame(adj_factor.data);
  //   fcts = fcts.setIndex({ column: 'trade_date', drop: false }) as DataFrame;
  //   // fcts.print();

  //   const sf = new Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  //   let adj = fcts.column('adj_factor').asType('float32');
  //   adj = adj.round(2);
  //   // adj.print();
  //   fcts['adj_factor'] = adj;
  //   fcts.print();
  //   fcts = fcts.resetIndex() as DataFrame;
  //   for (const col of ['trade_date', 'adj_factor']) {
  //     console.log('---', col);
  //     console.log(fcts['adj_factor'].values);
  //     // fcts.column(col).print();
  //   }
  //   // console.log(sf.dtype);
  // });
  test('pro_bar', async () => {
    jest.useFakeTimers();
    // jest.setTimeout(10000 * 1000);
    // const mock = new MockAdapter(axios);
    // mock.onPost(`http://api.tushare.pro`).reply(() =>
    //   // the actual id can be grabbed from config.url
    //   [200, daily]
    // );
    const d = await ts.pro_bar({
      ts_code: '000001.SZ',
      start_date: '20220108',
      // end_date: '20220809',
      freq: '15min',
      adj: 'qfq',
    });
    console.log(d);
    jest.useRealTimers();
  });
});
