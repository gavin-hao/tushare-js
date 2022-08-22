# tushare-js
tushare.pro node.js sdk

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://commitizen.github.io/cz-cli/)
[![Continuous Deployment](https://github.com/gavin-hao/tushare-js/actions/workflows/cd.yml/badge.svg)](https://github.com/gavin-hao/tushare-js/actions/workflows/cd.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgavin-hao%2Ftushare-js.svg?type=shield)](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgavin-hao%2Ftushare-js.svg?type=shield)
[![GitHub license](https://img.shields.io/github/license/gavin-hao/tushare-js)](https://github.com/gavin-hao/tushare-js/blob/master/LICENSE)

# usage

- external dependency - danfojs-node
## install
```bash
yarn add tushare-js danfojs-node
```


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

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgavin-hao%2Ftushare-js.svg?type=large)](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgavin-hao%2Ftushare-js.svg?type=badge_large)
# Analytics
![Alt](https://repobeats.axiom.co/api/embed/6847ed3eb95591ea0da8cc70e1d5adafcebf0aa5.svg "Repobeats analytics image")