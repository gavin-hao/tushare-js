import TuShare from 'tushare-js';
import dotenv from 'dotenv';
import { DataFrame } from 'danfojs-node';
dotenv.config();
const token = process.env.TS_TOKEN || 'your token';
const tu = TuShare(token);

tu.daily({
  params: {
    ts_code: '000001.SZ',
    start_date: '20220701',
    end_date: '20220801',
  },
  fields: ['trade_date', 'open', 'close', 'high', 'low', 'vol', 'pct_chg'],
}).then((res) => {
  console.log(res);
  const df = new DataFrame(res.data);
  df.print();
});

tu.stock_basic({ params: { limit: 5 } }).then((res) => {
  console.log(res);
});
