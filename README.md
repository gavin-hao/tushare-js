# tushare-js
tushare.pro node.js sdk

# usage

```js
import TuShare from 'tushare-js';

const ts=TuShare('your token');
//stock daily api
const daily_datas=ts.daily({
  params: { ts_code: '002156',start_date: '20200808',end_date: '20220809'},
  fields: ['ts_code', 'trade_date', 'open', 'high', 'low'],
})
// common api query
const dt=ts.query({
  api_name:'daily'
  params: { ts_code: '002156',start_date: '20200808',end_date: '20220809'},
  fields: ['ts_code', 'trade_date', 'open', 'high', 'low'],
})

```