export interface ApiDescription {
  /**
   * 输入参数
   */
  params?: Object;
  /**
   * 输出参数
   */
  fields: string[];
}
export interface Api {
  [name: string]: ApiDescription;
  stock_basic: ApiDescription;
  stock_company: ApiDescription;
  stk_managers: ApiDescription;
  stk_rewards: ApiDescription;
  new_share: ApiDescription;
  hs_const: ApiDescription;
  namechange: ApiDescription;
  bak_basic: ApiDescription;
  trade_cal: ApiDescription;
  daily: ApiDescription;
  weekly: ApiDescription;
  monthly: ApiDescription;
  adj_factor: ApiDescription;
  suspend: ApiDescription;
  suspend_d: ApiDescription;
  daily_basic: ApiDescription;
  moneyflow: ApiDescription;
  stk_limit: ApiDescription;
  limit_list: ApiDescription;
  moneyflow_hsgt: ApiDescription;
  hsgt_top10: ApiDescription;
  ggt_top10: ApiDescription;
  hk_hold: ApiDescription;
  ggt_daily: ApiDescription;
  ggt_monthly: ApiDescription;
  bak_daily: ApiDescription;
  income: ApiDescription;
  balancesheet: ApiDescription;
  cashflow: ApiDescription;
  forecast: ApiDescription;
  express: ApiDescription;
  dividend: ApiDescription;
  fina_indicator: ApiDescription;
  fina_audit: ApiDescription;
  fina_mainbz: ApiDescription;
  disclosure_date: ApiDescription;
  margin: ApiDescription;
  margin_detail: ApiDescription;
  margin_target: ApiDescription;
  top10_holders: ApiDescription;
  top10_floatholders: ApiDescription;
  top_list: ApiDescription;
  top_inst: ApiDescription;
  pledge_stat: ApiDescription;
  pledge_detail: ApiDescription;
  repurchase: ApiDescription;
  concept: ApiDescription;
  concept_detail: ApiDescription;
  share_float: ApiDescription;
  block_trade: ApiDescription;
  stk_holdernumber: ApiDescription;
  stk_holdertrade: ApiDescription;
  broker_recommend: ApiDescription;
  index_basic: ApiDescription;
  index_daily: ApiDescription;
  index_weekly: ApiDescription;
  index_monthly: ApiDescription;
  index_weight: ApiDescription;
  index_dailybasic: ApiDescription;
  index_classify: ApiDescription;
  index_member: ApiDescription;
  daily_info: ApiDescription;
  sz_daily_info: ApiDescription;
  ths_index: ApiDescription;
  ths_daily: ApiDescription;
  ths_member: ApiDescription;
  index_global: ApiDescription;
  fund_basic: ApiDescription;
  fund_company: ApiDescription;
  fund_manager: ApiDescription;
  fund_share: ApiDescription;
  fund_nav: ApiDescription;
  fund_div: ApiDescription;
  fund_portfolio: ApiDescription;
  fund_daily: ApiDescription;
  fund_adj: ApiDescription;
  coin_bar: ApiDescription;
  opt_daily: ApiDescription;
  fut_daily: ApiDescription;
  stk_mins: ApiDescription;
}

export const fieldsDescription = {
  is_hs: '是否沪深港通标的,N否 H沪股通 S深股通',
  list_status: '上市状态: L上市 D退市 P暂停上市',
  exchange: '交易所代码 SSE上交所 SZSE深交所 HKEX港交所(未上线)',
  ts_code: 'TS代码',
  symbol: '股票代码',
  name: '股票名称',
  area: '所在地域',
  industry: '所属行业',
  fullname: '股票全称',
  enname: '英文全称',
  market: '市场类型 (主板/中小板/创业板/科创板)',
  curr_type: '交易货币',
  list_date: '上市日期',
  delist_date: '退市日期',
  start_date: '开始日期',
  end_date: '结束日期',
  is_open: '是否交易 0 休市 1交易',
  cal_date: '日历日期',
  pretrade_date: '上一个交易日',
  ann_date: '公告日期(YYYYMMDD格式)',
  change_reason: '变更原因',

  chairman: '法人代表',
  manager: '总经理',
  secretary: '董秘',
  reg_capital: '注册资本',
  setup_date: '注册日期',
  province: '所在省份',
  city: '所在城市',
  introduction: '公司介绍',
  website: '公司主页',
  email: '电子邮件',
  office: '办公室',
  employees: '员工人数',
  main_business: '主要业务及产品',
  business_scope: '经营范围',
  gender: '性别',
  lev: '岗位类别',
  title: '岗位',
  edu: '学历',
  national: '国籍',
  birthday: '出生年月',
  begin_date: '上任日期',
  // end_date: '离任日期',
  resume: '个人简历',
  trade_date: '交易日期',
  open: '开盘价',
  high: '最高价',
  low: '最低价',
  close: '收盘价',
  pre_close: '昨收价',
  change: '涨跌额',
  pct_chg: '涨跌幅 (未复权)',
  vol: '成交量 (手)',
  amount: '成交额 (千元)',
  adj_factor: '复权因子',
  suspend_type: '停复牌类型:S-停牌,R-复牌',
  suspend_timing: '日内停牌时间段',
  turnover_rate: '换手率(%)',
  turnover_rate_f: '换手率(自由流通股)',
  volume_ratio: '量比',
  pe: '市盈率(总市值/净利润, 亏损的PE为空)',
  pe_ttm: '市盈率(TTM,亏损的PE为空)',
  pb: '市净率(总市值/净资产)',
  ps: '市销率',
  ps_ttm: '市销率(TTM)',
  dv_ratio: '股息率 (%)',
  dv_ttm: '股息率(TTM)(%)',
  total_share: '总股本 (万股)',
  float_share: '流通股本 (万股)',
  free_share: '自由流通股本 (万)',
  total_mv: '总市值 (万元)',
  circ_mv: '流通市值(万元)',
};

/**
 * all supported apis
 * */
export const api: Api = {
  /**
   *股票列表 基础信息数据
   * @remarks 获取基础信息数据,包括股票代码、名称、上市日期、退市日期等
   */
  stock_basic: {
    params: {
      // 名称	                类型    必选  描述
      // "is_hs": "",        // str  N    是否沪深港通标的,N否 H沪股通 S深股通
      // "list_status": "",  // str  N    上市状态 L上市 D退市 P暂停上市,默认是L
      // "exchange": "",     // str  N    交易所 SSE上交所 SZSE深交所
      // "ts_code": "",      // str  N    TS股票代码
      // "market": "",       // str  N    市场类别
      // "limit": "",        // int  N
      // "offset": "",       // int  N
      // "name": "",         // str  N    名称
    },
    fields: [],
  },
  /**
   * 上市公司基本信息
   * 接口:stock_company,可以通过数据工具调试和查看数据。
   * 描述:获取上市公司基础信息,单次提取4500条,可以根据交易所分批提取
   * 积分:用户需要至少120积分才可以调取,具体请参阅积分获取办法
   */
  stock_company: {
    params: {
      // 名称              类型     必须  描述
      // "ts_code":"",    // str   N    股票代码
      // "exchange": "",  // str   N    交易所代码: SSE上交所 SZSE深交所
    },
    fields: [
      // 名称           // 类型   默认显示  描述
      'ts_code', // str    Y       股票代码
      'exchange', // str    Y       交易所代码 ,SSE上交所 SZSE深交所
      'chairman', // str    Y       法人代表
      'manager', // str    Y       总经理
      'secretary', // str    Y       董秘
      'reg_capital', // float  Y       注册资本
      'setup_date', // str    Y       注册日期
      'province', // str    Y       所在省份
      'city', // str    Y       所在城市
      'introduction', // str    N       公司介绍
      'website', // str    Y       公司主页
      'email', // str    Y       电子邮件
      'office', // str    N       办公室
      'employees', // int    Y       员工人数
      'main_business', // str    N       主要业务及产品
      'business_scope', // str    N       经营范围
    ],
  },
  // 上市公司管理层
  // 接口:stk_managers
  // 描述:获取上市公司管理层
  // 积分:用户需要2000积分才可以调取,5000积分以上频次相对较高,具体请参阅积分获取办法
  stk_managers: {
    params: {
      // 名称               类型   必须  描述
      // "ts_code":"",     // str    N    股票代码,支持单个或多个股票输入
      // "ann_date":"",    // str    N    公告日期(YYYYMMDD格式,下同)
      // "start_date":"",  // str    N    公告开始日期
      // "end_date":"",    // str    N    公告结束日期
    },
    fields: [
      // 名称         类型      默认显示  描述
      'ts_code', // str    Y       TS股票代码
      'ann_date', // str    Y       公告日期
      'name', // str    Y       姓名
      'gender', // str    Y       性别
      'lev', // str    Y       岗位类别
      'title', // str    Y       岗位
      'edu', // str    Y       学历
      'national', // str    Y       国籍
      'birthday', // str    Y       出生年月
      'begin_date', // str    Y       上任日期
      'end_date', // str    Y       离任日期
      'resume', // str    N       个人简历
    ],
  },
  /**
   * 管理层薪酬和持股
   * 接口:stk_rewards
   * 描述:获取上市公司管理层薪酬和持股
   * 积分:用户需要2000积分才可以调取,5000积分以上频次相对较高,具体请参阅积分获取办法
   */
  stk_rewards: {
    params: {
      // 名称               类型      必须  描述
      // "ts_code":"",     // str    N    股票代码,支持单个或多个股票输入
      // "end_date":"",    // str    N    报告期
    },
    fields: [
      // 名称         类型      默认显示  描述
      'ts_code', // str    Y       TS股票代码
      'ann_date', // str    Y       公告日期
      'end_date', // str    Y       截止日期
      'name', // str    Y       姓名
      'title', // str    Y       职务
      'reward', // float  N       报酬
      'hold_vol', // float  N       持股数
    ],
  },
  /** IPO新股列表
   * 接口:new_share
   * 描述:获取新股上市列表数据
   * 限量:单次最大2000条,总量不限制
   * 积分:用户需要至少120积分才可以调取,具体请参阅积分获取办法
   */
  new_share: {
    params: {
      // 名称               类型      必须  描述
      // "start_date":"",  // str    N    上网发行开始日期
      // "end_date":"",    // str    N    上网发行结束日期
    },
    fields: [
      // 名称           类型       默认显示  描述
      'ts_code', // str     Y       TS股票代码
      'sub_code', // str     Y       申购代码
      'name', // str     Y       名称
      'ipo_date', // str     Y       上网发行日期
      'issue_date', // str     Y       上市日期
      'amount', // float   Y       发行总量(万股)
      'market_amount', // float   Y       上网发行总量(万股)
      'price', // float   Y       发行价格
      'pe', // float   Y       市盈率
      'limit_amount', // float   Y       个人申购上限(万股)
      'funds', // float   Y       募集资金(亿元)
      'ballot', // float   Y       中签率
    ],
  },
  /**
   * 沪深股通成份股
   * 接口:hs_const
   * 描述:获取沪股通、深股通成分数据
   */
  hs_const: {
    params: {
      // 名称             类型      必须  描述
      hs_type: '', // str    Y    类型SH沪股通SZ深股通
      // "is_new":"",    str    N    是否最新 1 是 0 否 (默认1)
    },
    fields: [
      // 名称            类型  默认显示  描述
      'ts_code', // str   Y       TS代码
      'hs_type', // str   Y       沪深港通类型SH沪SZ深
      'in_date', // str   Y       纳入日期
      'out_date', // str   Y       剔除日期
      'is_new', // str   Y       是否最新 1是 0否
    ],
  },
  /**
   * 股票曾用名
   * 接口:namechange
   * 描述:历史名称变更记录
   */
  namechange: {
    params: {
      // 名称                  类型   必须  描述
      // "ts_code":"",     // str    N    股票代码
      // "start_date":"",  // str    N    公告开始日期
      // "end_date":"",    // str    N    公告结束日期
    },
    fields: [
      // 名称                类型   默认显示  描述
      'ts_code', // str    Y       TS代码
      'name', // str    Y       证券名称
      'start_date', // str    Y       开始日期
      'end_date', // str    Y       结束日期
      'ann_date', // str    Y       公告日期
      'change_reason', // str    Y       变更原因
    ],
  },
  /**
   * 备用列表
   * 接口:bak_basic
   * 描述:获取备用基础列表
   * 限量:单次最大5000条,可以根据日期参数循环获取历史,正式权限需要5000积分。
   */
  bak_basic: {
    params: {
      // 名称                  类型   必须  描述
      // "trade_date":"",  // str    N    交易日期
      // "ts_code":""      // str    N    股票代码
    },
    fields: [
      // 名称                   类型   默认显示	描述
      'trade_date', // str    Y        交易日期
      'ts_code', // str    Y        TS股票代码
      'name', // str    Y        股票名称
      'industry', // str    Y        行业
      'area', // str    Y        地域
      'pe', // float  Y        市盈率(动)
      'float_share', // float  Y        流通股本(万)
      'total_share', // float  Y        总股本(万)
      'total_assets', // float  Y        总资产(万)
      'liquid_assets', // float  Y        流动资产(万)
      'fixed_assets', // float  Y        固定资产(万)
      'reserved', // float  Y        公积金
      'reserved_pershare', // float  Y        每股公积金
      'eps', // float  Y        每股收益
      'bvps', // float  Y        每股净资产
      'pb', // float  Y        市净率
      'list_date', // str    Y        上市日期
      'undp', // float  Y        未分配利润
      'per_undp', // float  Y        每股未分配利润
      'rev_yoy', // float  Y        收入同比(%)
      'profit_yoy', // float  Y        利润同比(%)
      'gpr', // float  Y        毛利率(%)
      'npr', // float  Y        净利润率(%)
      'holder_num', // int    Y        股东人数
    ],
  },
  /**
   * 接口:trade_cal
   * 描述:获取各大交易所交易日历数据,默认提取的是上交所
   */
  trade_cal: {
    params: {
      // 名称               // 类型    必须   描述
      // "exchange":"",     // str    N    交易所 SSE上交所,SZSE深交所,CFFEX 中金所,SHFE 上期所,CZCE 郑商所,DCE 大商所,INE 上能源,IB 银行间,XHKG 港交所
      // "start_date":"",   // str    N    开始日期 (格式:YYYYMMDD 下同)
      // "end_date":"",     // str    N    结束日期
      // "is_open":"",      // str    N    是否交易 '0'休市 '1'交易
    },
    fields: [
      // 名称             类型    默认显示   描述
      'exchange', // str    Y        交易所 SSE上交所 SZSE深交所
      'cal_date', // str    Y        日历日期
      'is_open', // str    Y        是否交易 0休市 1交易
      'pretrade_date', // str    N        上一个交易日
    ],
  },
  /**
   * 接口:daily,可以通过数据工具调试和查看数据。
   * 数据说明:交易日每天15点～16点之间。本接口是未复权行情,停牌期间不提供数据。
   * 调取说明:基础积分每分钟内最多调取500次,每次5000条数据,相当于23年历史,用户获得超过5000积分正常调取无频次限制。
   * 描述:获取股票行情数据,或通过通用行情接口获取数据,包含了前后复权数据。
   */
  daily: {
    params: {
      // 名称                类型    必须  描述
      // "ts_code",       // str    N    股票代码(支持多个股票同时提取,逗号分隔)
      // "trade_date",    // str    N    交易日期(YYYYMMDD)
      // "start_date",    // str    N    开始日期(YYYYMMDD)
      // "end_date",      // str    N    结束日期(YYYYMMDD)
    },
    fields: [
      // 名称         类型      默认显示  描述
      'ts_code', // str        股票代码
      'trade_date', // str        交易日期
      'open', // float      开盘价
      'high', // float      最高价
      'low', // float      最低价
      'close', // float      收盘价
      'pre_close', // float      昨收价
      'change', // float      涨跌额
      'pct_chg', // float      涨跌幅 (未复权,如果是复权请用 通用行情接口 )
      'vol', // float      成交量 (手)
      'amount', // float      成交额 (千元)
    ],
  },
  /**
   * 周线行情
   * 接口:weekly
   * 描述:获取A股周线行情
   * 限量:单次最大4500行,总量不限制
   * 积分:用户需要至少300积分才可以调取,具体请参阅积分获取办法
   */
  weekly: {
    params: {
      // ts_code: '',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // limit: '',
      // offset: '',
    },
    fields: [
      'ts_code',
      'trade_date',
      'close',
      'open',
      'high',
      'low',
      'pre_close',
      'change',
      'pct_chg',
      'vol',
      'amount',
    ],
  },
  /**
   * 月线行情
   * 接口:monthly
   * 描述:获取A股月线数据
   * 限量:单次最大4500行,总量不限制
   * 积分:用户需要至少300积分才可以调取,具体请参阅积分获取办法
   */
  monthly: {
    params: {
      // ts_code: '',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // limit: '',
      // offset: '',
    },
    fields: [
      'ts_code',
      'trade_date',
      'close',
      'open',
      'high',
      'low',
      'pre_close',
      'change',
      'pct_chg',
      'vol',
      'amount',
    ],
  },
  // A股复权行情
  // 接口名称 :pro_bar
  // 接口说明 :复权行情通过通用行情接口实现,利用Tushare Pro提供的复权因子进行计算,目前暂时只在SDK中提供支持,http方式无法调取。
  // Python SDK版本要求: >= 1.2.26
  // "pro_bar": {
  //     "params": {

  //     },
  //     "fields": [

  //     ],
  // },
  /**
   * 复权因子
   * 接口:adj_factor,可以通过数据工具调试和查看数据。
   * 更新时间:早上9点30分
   * 描述:获取股票复权因子,可提取单只股票全部历史复权因子,也可以提取单日全部股票的复权因子。
   */
  adj_factor: {
    params: {
      // ts_code: '',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // limit: '',
      // offset: '',
    },
    fields: ['ts_code', 'trade_date', 'adj_factor'],
  },
  /**
   * 停复牌信息
   * 接口:suspend
   * 更新时间:不定期
   * 描述:获取股票每日停复牌信息
   */
  suspend: {
    params: {},
    fields: ['ts_code', 'suspend_date', 'resume_date', 'suspend_reason'],
  },
  /**
   * 每日停复牌信息
   * 接口:suspend_d
   * 更新时间:不定期
   * 描述:按日期方式获取股票每日停复牌信息
   */
  suspend_d: {
    params: {
      // ts_code: '',
      // suspend_type: '',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // limit: '',
      // offset: '',
    },
    fields: ['ts_code', 'trade_date', 'suspend_timing', 'suspend_type'],
  },
  /**
   * 每日指标
   * 接口:daily_basic,可以通过数据工具调试和查看数据。
   * 更新时间:交易日每日15点～17点之间
   * 描述:获取全部股票每日重要的基本面指标,可用于选股分析、报表展示等。
   * 积分:用户需要至少600积分才可以调取,具体请参阅积分获取办法
   */
  daily_basic: {
    params: {
      // ts_code: '',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // limit: '',
      // offset: '',
    },
    fields: [
      'ts_code',
      'trade_date',
      'close',
      'turnover_rate',
      'turnover_rate_f',
      'volume_ratio',
      'pe',
      'pe_ttm',
      'pb',
      'ps',
      'ps_ttm',
      'dv_ratio',
      'dv_ttm',
      'total_share',
      'float_share',
      'free_share',
      'total_mv',
      'circ_mv',
    ],
  },
  /**
   * 通用行情接口
   * 接口名称:pro_bar,可以通过数据工具调试和查看数据。
   * 更新时间:股票和指数通常在15点～17点之间,数字货币实时更新,具体请参考各接口文档明细。
   * 描述:目前整合了股票(未复权、前复权、后复权)、指数、数字货币、ETF基金、期货、期权的行情数据,未来还将整合包括外汇在内的所有交易行情数据,同时提供分钟数据。不同数据对应不同的积分要求,具体请参阅每类数据的文档说明。
   * 其它:由于本接口是集成接口,在SDK层做了一些逻辑处理,目前暂时没法用http的方式调取通用行情接口。用户可以访问Tushare的Github,查看源代码完成类似功能。
   */
  // pro_bar: {
  //   params: {},
  //   fields: [],
  // },

  /**
   * 个股资金流向
   * 接口:moneyflow,可以通过数据工具调试和查看数据。
   * 描述:获取沪深A股票资金流向数据,分析大单小单成交情况,用于判别资金动向
   * 限量:单次最大提取4500行记录,总量不限制
   * 积分:用户需要至少2000积分才可以调取,基础积分有流量控制,积分越多权限越大,请自行提高积分,具体请参阅积分获取办法
   */
  moneyflow: {
    params: {
      // ts_code: '',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // limit: '',
      // offset: '',
    },
    fields: [
      'ts_code',
      'trade_date',
      'buy_sm_vol',
      'buy_sm_amount',
      'sell_sm_vol',
      'sell_sm_amount',
      'buy_md_vol',
      'buy_md_amount',
      'sell_md_vol',
      'sell_md_amount',
      'buy_lg_vol',
      'buy_lg_amount',
      'sell_lg_vol',
      'sell_lg_amount',
      'buy_elg_vol',
      'buy_elg_amount',
      'sell_elg_vol',
      'sell_elg_amount',
      'net_mf_vol',
      'net_mf_amount',
    ],
  },
  /**
   * 每日涨跌停价格
   * 接口:stk_limit
   * 描述:获取全市场(包含A/B股和基金)每日涨跌停价格,包括涨停价格,跌停价格等,每个交易日8点40左右更新当日股票涨跌停价格。
   * 限量:单次最多提取4800条记录,可循环调取,总量不限制
   * 积分:用户积600积分可调取,单位分钟有流控,积分越高流量越大,请自行提高积分,具体请参阅积分获取办法
   */
  stk_limit: {
    params: {},
    fields: ['trade_date', 'ts_code', 'up_limit', 'down_limit'],
  },
  /**
   * 每日涨跌停统计
   * 接口:limit_list,可以通过数据工具调试和查看数据。
   * 描述:获取每日涨跌停股票统计,包括封闭时间和打开次数等数据,帮助用户快速定位近期强(弱)势股,以及研究超短线策略。
   * 限量:单次最大1000,总量不限制
   * 积分:用户积2000积分可调取,5000积分以上可高频使用,具体请参阅积分获取办法
   */
  limit_list: {
    params: {},
    fields: [
      'trade_date',
      'ts_code',
      'name',
      'close',
      'pct_chg',
      'amp',
      'fc_ratio',
      'fl_ratio',
      'fd_amount',
      'first_time',
      'last_time',
      'open_times',
      'strth',
      'limit',
    ],
  },
  /**
   * 沪深港通资金流向
   * 接口:moneyflow_hsgt,可以通过数据工具调试和查看数据。
   * 描述:获取沪股通、深股通、港股通每日资金流向数据,每次最多返回300条记录,总量不限制。
   */
  moneyflow_hsgt: {
    params: {},
    fields: ['trade_date', 'ggt_ss', 'ggt_sz', 'hgt', 'sgt', 'north_money', 'south_money'],
  },
  /**
   * 沪深股通十大成交股
   * 接口:hsgt_top10
   * 描述:获取沪股通、深股通每日前十大成交详细数据
   */
  hsgt_top10: {
    params: {
      // ts_code: '',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // market_type: '',
      // limit: '',
      // offset: '',
    },
    fields: [
      'trade_date',
      'ts_code',
      'name',
      'close',
      'change',
      'rank',
      'market_type',
      'amount',
      'net_amount',
      'buy',
      'sell',
    ],
  },
  /**
   * 港股通十大成交股
   * 接口:ggt_top10
   * 描述:获取港股通每日成交数据,其中包括沪市、深市详细数据
   */
  ggt_top10: {
    params: {
      // ts_code: '',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // market_type: '',
      // limit: '',
      // offset: '',
    },
    fields: [
      'trade_date',
      'ts_code',
      'name',
      'close',
      'p_change',
      'rank',
      'market_type',
      'amount',
      'net_amount',
      'sh_amount',
      'sh_net_amount',
      'sh_buy',
      'sh_sell',
      'sz_amount',
      'sz_net_amount',
      'sz_buy',
      'sz_sell',
    ],
  },
  /**
   * 沪深港股通持股明细
   * 接口:hk_hold,可以通过数据工具调试和查看数据。
   * 描述:获取沪深港股通持股明细,数据来源港交所。
   * 限量:单次最多提取3800条记录,可循环调取,总量不限制
   * 积分:用户积120积分可调取试用,2000积分可正常使用,单位分钟有流控,积分越高流量越大,请自行提高积分,具体请参阅积分获取办法
   */
  hk_hold: {
    params: {},
    fields: ['code', 'trade_date', 'ts_code', 'name', 'vol', 'ratio', 'exchange'],
  },
  /**
   * 港股通每日成交统计
   * 接口:ggt_daily
   * 描述:获取港股通每日成交信息,数据从2014年开始
   * 限量:单次最大1000,总量数据不限制
   * 积分:用户积2000积分可调取,5000积分以上频次相对较高,请自行提高积分,具体请参阅积分获取办法
   */
  ggt_daily: {
    params: {
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // limit: '',
      // offset: '',
    },
    fields: ['trade_date', 'buy_amount', 'buy_volume', 'sell_amount', 'sell_volume'],
  },
  /**
   * 港股通每月成交统计
   * 接口:ggt_monthly
   * 描述:港股通每月成交信息,数据从2014年开始
   * 限量:单次最大1000
   * 积分:用户积5000积分可调取,请自行提高积分,具体请参阅积分获取办法
   */
  ggt_monthly: {
    params: {},
    fields: [
      'month',
      'day_buy_amt',
      'day_buy_vol',
      'day_sell_amt',
      'day_sell_vol',
      'total_buy_amt',
      'total_buy_vol',
      'total_sell_amt',
      'total_sell_vol',
    ],
  },
  /**
   * 备用行情
   * 接口:bak_daily
   * 描述:获取备用行情,包括特定的行情指标
   * 限量:单次最大5000行数据,可以根据日期参数循环获取,正式权限需要5000积分。
   */
  bak_daily: {
    params: {
      // ts_code: 'xxx',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // offset: '',
      // limit: '',
    },
    fields: [
      'ts_code',
      'trade_date',
      'name',
      'pct_change',
      'close',
      'change',
      'open',
      'high',
      'low',
      'pre_close',
      'vol_ratio',
      'turn_over',
      'swing',
      'vol',
      'amount',
      'selling',
      'buying',
      'total_share',
      'float_share',
      'pe',
      'industry',
      'area',
      'float_mv',
      'total_mv',
      'avg_price',
      'strength',
      'activity',
      'avg_turnover',
      'attack',
      'interval_3',
      'interval_6',
    ],
  },
  /**
   * 利润表
   * 接口:income,可以通过数据工具调试和查看数据。
   * 描述:获取上市公司财务利润表数据
   * 积分:用户需要至少800积分才可以调取,具体请参阅积分获取办法
   * 提示:当前接口只能按单只股票获取其历史数据,如果需要获取某一季度全部上市公司数据,请使用income_vip接口(参数一致),需积攒5000积分。
   */
  income: {
    params: {},
    fields: [
      'ts_code',
      'ann_date',
      'f_ann_date',
      'end_date',
      'report_type',
      'comp_type',
      'end_type',
      'basic_eps',
      'diluted_eps',
      'total_revenue',
      'revenue',
      'int_income',
      'prem_earned',
      'comm_income',
      'n_commis_income',
      'n_oth_income',
      'n_oth_b_income',
      'prem_income',
      'out_prem',
      'une_prem_reser',
      'reins_income',
      'n_sec_tb_income',
      'n_sec_uw_income',
      'n_asset_mg_income',
      'oth_b_income',
      'fv_value_chg_gain',
      'invest_income',
      'ass_invest_income',
      'forex_gain',
      'total_cogs',
      'oper_cost',
      'int_exp',
      'comm_exp',
      'biz_tax_surchg',
      'sell_exp',
      'admin_exp',
      'fin_exp',
      'assets_impair_loss',
      'prem_refund',
      'compens_payout',
      'reser_insur_liab',
      'div_payt',
      'reins_exp',
      'oper_exp',
      'compens_payout_refu',
      'insur_reser_refu',
      'reins_cost_refund',
      'other_bus_cost',
      'operate_profit',
      'non_oper_income',
      'non_oper_exp',
      'nca_disploss',
      'total_profit',
      'income_tax',
      'n_income',
      'n_income_attr_p',
      'minority_gain',
      'oth_compr_income',
      't_compr_income',
      'compr_inc_attr_p',
      'compr_inc_attr_m_s',
      'ebit',
      'ebitda',
      'insurance_exp',
      'undist_profit',
      'distable_profit',
      'rd_exp',
      'fin_exp_int_exp',
      'fin_exp_int_inc',
      'transfer_surplus_rese',
      'transfer_housing_imprest',
      'transfer_oth',
      'adj_lossgain',
      'withdra_legal_surplus',
      'withdra_legal_pubfund',
      'withdra_biz_devfund',
      'withdra_rese_fund',
      'withdra_oth_ersu',
      'workers_welfare',
      'distr_profit_shrhder',
      'prfshare_payable_dvd',
      'comshare_payable_dvd',
      'capit_comstock_div',
      'continued_net_profit',
      'update_flag',
    ],
  },
  /**
   * 资产负债表
   * 接口:balancesheet,可以通过数据工具调试和查看数据。
   * 描述:获取上市公司资产负债表
   * 积分:用户需要至少800积分才可以调取,具体请参阅积分获取办法
   * 提示:当前接口只能按单只股票获取其历史数据,如果需要获取某一季度全部上市公司数据,请使用balancesheet_vip接口(参数一致),需积攒5000积分。
   */
  balancesheet: {
    params: {
      // ts_code: 'xx',
      // ann_date: '',
      // f_ann_date: '',
      // start_date: '',
      // end_date: '',
      // period: '',
      // report_type: '',
      // comp_type: '',
      // end_type: '',
      // limit: '',
      // offset: '',
    },
    fields: [
      'ts_code',
      'ann_date',
      'f_ann_date',
      'end_date',
      'report_type',
      'comp_type',
      'end_type',
      'total_share',
      'cap_rese',
      'undistr_porfit',
      'surplus_rese',
      'special_rese',
      'money_cap',
      'trad_asset',
      'notes_receiv',
      'accounts_receiv',
      'oth_receiv',
      'prepayment',
      'div_receiv',
      'int_receiv',
      'inventories',
      'amor_exp',
      'nca_within_1y',
      'sett_rsrv',
      'loanto_oth_bank_fi',
      'premium_receiv',
      'reinsur_receiv',
      'reinsur_res_receiv',
      'pur_resale_fa',
      'oth_cur_assets',
      'total_cur_assets',
      'fa_avail_for_sale',
      'htm_invest',
      'lt_eqt_invest',
      'invest_real_estate',
      'time_deposits',
      'oth_assets',
      'lt_rec',
      'fix_assets',
      'cip',
      'const_materials',
      'fixed_assets_disp',
      'produc_bio_assets',
      'oil_and_gas_assets',
      'intan_assets',
      'r_and_d',
      'goodwill',
      'lt_amor_exp',
      'defer_tax_assets',
      'decr_in_disbur',
      'oth_nca',
      'total_nca',
      'cash_reser_cb',
      'depos_in_oth_bfi',
      'prec_metals',
      'deriv_assets',
      'rr_reins_une_prem',
      'rr_reins_outstd_cla',
      'rr_reins_lins_liab',
      'rr_reins_lthins_liab',
      'refund_depos',
      'ph_pledge_loans',
      'refund_cap_depos',
      'indep_acct_assets',
      'client_depos',
      'client_prov',
      'transac_seat_fee',
      'invest_as_receiv',
      'total_assets',
      'lt_borr',
      'st_borr',
      'cb_borr',
      'depos_ib_deposits',
      'loan_oth_bank',
      'trading_fl',
      'notes_payable',
      'acct_payable',
      'adv_receipts',
      'sold_for_repur_fa',
      'comm_payable',
      'payroll_payable',
      'taxes_payable',
      'int_payable',
      'div_payable',
      'oth_payable',
      'acc_exp',
      'deferred_inc',
      'st_bonds_payable',
      'payable_to_reinsurer',
      'rsrv_insur_cont',
      'acting_trading_sec',
      'acting_uw_sec',
      'non_cur_liab_due_1y',
      'oth_cur_liab',
      'total_cur_liab',
      'bond_payable',
      'lt_payable',
      'specific_payables',
      'estimated_liab',
      'defer_tax_liab',
      'defer_inc_non_cur_liab',
      'oth_ncl',
      'total_ncl',
      'depos_oth_bfi',
      'deriv_liab',
      'depos',
      'agency_bus_liab',
      'oth_liab',
      'prem_receiv_adva',
      'depos_received',
      'ph_invest',
      'reser_une_prem',
      'reser_outstd_claims',
      'reser_lins_liab',
      'reser_lthins_liab',
      'indept_acc_liab',
      'pledge_borr',
      'indem_payable',
      'policy_div_payable',
      'total_liab',
      'treasury_share',
      'ordin_risk_reser',
      'forex_differ',
      'invest_loss_unconf',
      'minority_int',
      'total_hldr_eqy_exc_min_int',
      'total_hldr_eqy_inc_min_int',
      'total_liab_hldr_eqy',
      'lt_payroll_payable',
      'oth_comp_income',
      'oth_eqt_tools',
      'oth_eqt_tools_p_shr',
      'lending_funds',
      'acc_receivable',
      'st_fin_payable',
      'payables',
      'hfs_assets',
      'hfs_sales',
      'cost_fin_assets',
      'fair_value_fin_assets',
      'contract_assets',
      'contract_liab',
      'accounts_receiv_bill',
      'accounts_pay',
      'oth_rcv_total',
      'fix_assets_total',
      'cip_total',
      'oth_pay_total',
      'long_pay_total',
      'debt_invest',
      'oth_debt_invest',
      'update_flag',
    ],
  },
  /**
   * 现金流量表
   * 接口:cashflow,可以通过数据工具调试和查看数据。
   * 描述:获取上市公司现金流量表
   * 积分:用户需要至少800积分才可以调取,具体请参阅积分获取办法
   * 提示:当前接口只能按单只股票获取其历史数据,如果需要获取某一季度全部上市公司数据,请使用cashflow_vip接口(参数一致),需积攒5000积分。
   */
  cashflow: {
    params: {},
    fields: [
      'ts_code',
      'ann_date',
      'f_ann_date',
      'end_date',
      'comp_type',
      'report_type',
      'end_type',
      'net_profit',
      'finan_exp',
      'c_fr_sale_sg',
      'recp_tax_rends',
      'n_depos_incr_fi',
      'n_incr_loans_cb',
      'n_inc_borr_oth_fi',
      'prem_fr_orig_contr',
      'n_incr_insured_dep',
      'n_reinsur_prem',
      'n_incr_disp_tfa',
      'ifc_cash_incr',
      'n_incr_disp_faas',
      'n_incr_loans_oth_bank',
      'n_cap_incr_repur',
      'c_fr_oth_operate_a',
      'c_inf_fr_operate_a',
      'c_paid_goods_s',
      'c_paid_to_for_empl',
      'c_paid_for_taxes',
      'n_incr_clt_loan_adv',
      'n_incr_dep_cbob',
      'c_pay_claims_orig_inco',
      'pay_handling_chrg',
      'pay_comm_insur_plcy',
      'oth_cash_pay_oper_act',
      'st_cash_out_act',
      'n_cashflow_act',
      'oth_recp_ral_inv_act',
      'c_disp_withdrwl_invest',
      'c_recp_return_invest',
      'n_recp_disp_fiolta',
      'n_recp_disp_sobu',
      'stot_inflows_inv_act',
      'c_pay_acq_const_fiolta',
      'c_paid_invest',
      'n_disp_subs_oth_biz',
      'oth_pay_ral_inv_act',
      'n_incr_pledge_loan',
      'stot_out_inv_act',
      'n_cashflow_inv_act',
      'c_recp_borrow',
      'proc_issue_bonds',
      'oth_cash_recp_ral_fnc_act',
      'stot_cash_in_fnc_act',
      'free_cashflow',
      'c_prepay_amt_borr',
      'c_pay_dist_dpcp_int_exp',
      'incl_dvd_profit_paid_sc_ms',
      'oth_cashpay_ral_fnc_act',
      'stot_cashout_fnc_act',
      'n_cash_flows_fnc_act',
      'eff_fx_flu_cash',
      'n_incr_cash_cash_equ',
      'c_cash_equ_beg_period',
      'c_cash_equ_end_period',
      'c_recp_cap_contrib',
      'incl_cash_rec_saims',
      'uncon_invest_loss',
      'prov_depr_assets',
      'depr_fa_coga_dpba',
      'amort_intang_assets',
      'lt_amort_deferred_exp',
      'decr_deferred_exp',
      'incr_acc_exp',
      'loss_disp_fiolta',
      'loss_scr_fa',
      'loss_fv_chg',
      'invest_loss',
      'decr_def_inc_tax_assets',
      'incr_def_inc_tax_liab',
      'decr_inventories',
      'decr_oper_payable',
      'incr_oper_payable',
      'others',
      'im_net_cashflow_oper_act',
      'conv_debt_into_cap',
      'conv_copbonds_due_within_1y',
      'fa_fnc_leases',
      'im_n_incr_cash_equ',
      'net_dism_capital_add',
      'net_cash_rece_sec',
      'credit_impa_loss',
      'use_right_asset_dep',
      'oth_loss_asset',
      'end_bal_cash',
      'beg_bal_cash',
      'end_bal_cash_equ',
      'beg_bal_cash_equ',
      'update_flag',
    ],
  },
  /**
   * 业绩预告
   * 接口:forecast,可以通过数据工具调试和查看数据。
   * 描述:获取业绩预告数据
   * 权限:用户需要至少800积分才可以调取,具体请参阅积分获取办法
   * 提示:当前接口只能按单只股票获取其历史数据,如果需要获取某一季度全部上市公司数据,请使用forecast_vip接口(参数一致),需积攒5000积分。
   */
  forecast: {
    params: {},
    fields: [
      'ts_code',
      'ann_date',
      'end_date',
      'type',
      'p_change_min',
      'p_change_max',
      'net_profit_min',
      'net_profit_max',
      'last_parent_net',
      'first_ann_date',
      'summary',
      'change_reason',
    ],
  },
  /**
   * 业绩快报
   * 接口:express
   * 描述:获取上市公司业绩快报
   * 权限:用户需要至少800积分才可以调取,具体请参阅积分获取办法
   * 提示:当前接口只能按单只股票获取其历史数据,如果需要获取某一季度全部上市公司数据,请使用express_vip接口(参数一致),需积攒5000积分。
   */
  express: {
    params: {},
    fields: [
      'ts_code',
      'ann_date',
      'end_date',
      'revenue',
      'operate_profit',
      'total_profit',
      'n_income',
      'total_assets',
      'total_hldr_eqy_exc_min_int',
      'diluted_eps',
      'diluted_roe',
      'yoy_net_profit',
      'bps',
      'perf_summary',
    ],
  },
  /**
   * 分红送股
   * 接口:dividend
   * 描述:分红送股数据
   * 权限:用户需要至少900积分才可以调取,具体请参阅积分获取办法
   */
  dividend: {
    params: {},
    fields: [
      'ts_code',
      'end_date',
      'ann_date',
      'div_proc',
      'stk_div',
      'stk_bo_rate',
      'stk_co_rate',
      'cash_div',
      'cash_div_tax',
      'record_date',
      'ex_date',
      'pay_date',
      'div_listdate',
      'imp_ann_date',
    ],
  },
  /**
   * 财务指标数据
   * 接口:fina_indicator,可以通过数据工具调试和查看数据。
   * 描述:获取上市公司财务指标数据,为避免服务器压力,现阶段每次请求最多返回60条记录,可通过设置日期多次请求获取更多数据。
   * 权限:用户需要至少800积分才可以调取,具体请参阅积分获取办法
   * 提示:当前接口只能按单只股票获取其历史数据,如果需要获取某一季度全部上市公司数据,请使用fina_indicator_vip接口(参数一致),需积攒5000积分。
   */
  fina_indicator: {
    params: {
      // ts_code: 'xx',
      // ann_date: '',
      // start_date: '',
      // end_date: '',
      // period: '',
      // update_flag: '',
      // limit: '',
      // offset: '',
    },
    fields: [
      'ts_code',
      'ann_date',
      'end_date',
      'eps',
      'dt_eps',
      'total_revenue_ps',
      'revenue_ps',
      'capital_rese_ps',
      'surplus_rese_ps',
      'undist_profit_ps',
      'extra_item',
      'profit_dedt',
      'gross_margin',
      'current_ratio',
      'quick_ratio',
      'cash_ratio',
      'ar_turn',
      'ca_turn',
      'fa_turn',
      'assets_turn',
      'op_income',
      'ebit',
      'ebitda',
      'fcff',
      'fcfe',
      'current_exint',
      'noncurrent_exint',
      'interestdebt',
      'netdebt',
      'tangible_asset',
      'working_capital',
      'networking_capital',
      'invest_capital',
      'retained_earnings',
      'diluted2_eps',
      'bps',
      'ocfps',
      'retainedps',
      'cfps',
      'ebit_ps',
      'fcff_ps',
      'fcfe_ps',
      'netprofit_margin',
      'grossprofit_margin',
      'cogs_of_sales',
      'expense_of_sales',
      'profit_to_gr',
      'saleexp_to_gr',
      'adminexp_of_gr',
      'finaexp_of_gr',
      'impai_ttm',
      'gc_of_gr',
      'op_of_gr',
      'ebit_of_gr',
      'roe',
      'roe_waa',
      'roe_dt',
      'roa',
      'npta',
      'roic',
      'roe_yearly',
      'roa2_yearly',
      'debt_to_assets',
      'assets_to_eqt',
      'dp_assets_to_eqt',
      'ca_to_assets',
      'nca_to_assets',
      'tbassets_to_totalassets',
      'int_to_talcap',
      'eqt_to_talcapital',
      'currentdebt_to_debt',
      'longdeb_to_debt',
      'ocf_to_shortdebt',
      'debt_to_eqt',
      'eqt_to_debt',
      'eqt_to_interestdebt',
      'tangibleasset_to_debt',
      'tangasset_to_intdebt',
      'tangibleasset_to_netdebt',
      'ocf_to_debt',
      'turn_days',
      'roa_yearly',
      'roa_dp',
      'fixed_assets',
      'profit_to_op',
      'q_saleexp_to_gr',
      'q_gc_to_gr',
      'q_roe',
      'q_dt_roe',
      'q_npta',
      'q_ocf_to_sales',
      'basic_eps_yoy',
      'dt_eps_yoy',
      'cfps_yoy',
      'op_yoy',
      'ebt_yoy',
      'netprofit_yoy',
      'dt_netprofit_yoy',
      'ocf_yoy',
      'roe_yoy',
      'bps_yoy',
      'assets_yoy',
      'eqt_yoy',
      'tr_yoy',
      'or_yoy',
      'q_sales_yoy',
      'q_op_qoq',
      'equity_yoy',
    ],
  },
  /**
   * 财务审计意见
   * 接口:fina_audit
   * 描述:获取上市公司定期财务审计意见数据
   * 权限:用户需要至少500积分才可以调取,具体请参阅积分获取办法
   */
  fina_audit: {
    params: {},
    fields: ['ts_code', 'ann_date', 'end_date', 'audit_result', 'audit_agency', 'audit_sign'],
  },
  /**
   * 主营业务构成
   * 接口:fina_mainbz
   * 描述:获得上市公司主营业务构成,分地区和产品两种方式
   * 权限:用户需要至少900积分才可以调取,具体请参阅积分获取办法 ,单次最大提取100行,总量不限制,可循环获取。
   * 提示:当前接口只能按单只股票获取其历史数据,如果需要获取某一季度全部上市公司数据,请使用fina_mainbz_vip接口(参数一致),需积攒5000积分。
   */
  fina_mainbz: {
    params: {
      // ts_code: 'xx',
      // period: '',
      // type: '',
      // start_date: '',
      // end_date: '',
      // is_publish: '',
      // limit: '',
      // offset: '',
    },
    fields: ['ts_code', 'end_date', 'bz_item', 'bz_sales', 'bz_profit', 'bz_cost', 'curr_type'],
  },
  /**
   * 财报披露计划
   * 接口:disclosure_date
   * 描述:获取财报披露计划日期
   * 限量:单次最大3000,总量不限制
   * 积分:用户需要至少500积分才可以调取,积分越多权限越大,具体请参阅积分获取办法
   */
  disclosure_date: {
    params: {},
    fields: ['ts_code', 'ann_date', 'end_date', 'pre_date', 'actual_date'],
  },
  /**
   * 融资融券交易汇总
   * 接口:margin
   * 描述:获取融资融券每日交易汇总数据
   */
  margin: {
    params: {},
    fields: ['trade_date', 'exchange_id', 'rzye', 'rzmre', 'rzche', 'rqye', 'rqmcl', 'rzrqye', 'rqyl'],
  },
  /**
   * 融资融券交易明细
   * 接口:margin_detail
   * 描述:获取沪深两市每日融资融券明细
   */
  margin_detail: {
    params: {},
    fields: ['trade_date', 'ts_code', 'rzye', 'rqye', 'rzmre', 'rqyl', 'rzche', 'rqchl', 'rqmcl', 'rzrqye'],
  },
  /**
   * 接口：margin_target
   * 描述：获取全市场融资融券标的
   * 限量：单次最大5000条，一次可以获取全部数据
   * 积分：用户积5000积分可调取，具体请参阅积分获取办法
   */
  margin_target: {
    params: {},
    fields: ['ts_code', 'mg_type', 'is_new', 'in_date', 'out_date', 'ann_date'],
  },
  /**
   * 前十大股东
   * 接口:top10_holders
   * 描述:获取上市公司前十大股东数据,包括持有数量和比例等信息。
   */
  top10_holders: {
    params: {},
    fields: ['ts_code', 'ann_date', 'end_date', 'holder_name', 'hold_amount', 'hold_ratio'],
  },
  /**
   * 前十大流通股东
   * 接口:top10_floatholders
   * 描述:获取上市公司前十大流通股东数据。
   */
  top10_floatholders: {
    params: {},
    fields: ['ts_code', 'ann_date', 'end_date', 'holder_name', 'hold_amount'],
  },
  /**
   * 龙虎榜每日明细
   * 接口:top_list
   * 描述:龙虎榜每日交易明细
   * 数据历史: 2005年至今
   * 限量:单次最大10000
   * 积分:用户需要至少300积分才可以调取,具体请参阅积分获取办法
   */
  top_list: {
    params: {},
    fields: [
      'trade_date',
      'ts_code',
      'name',
      'close',
      'pct_change',
      'turnover_rate',
      'amount',
      'l_sell',
      'l_buy',
      'l_amount',
      'net_amount',
      'net_rate',
      'amount_rate',
      'float_values',
      'reason',
    ],
  },
  /**
   * 龙虎榜机构明细
   * 接口:top_inst
   * 描述:龙虎榜机构成交明细
   * 限量:单次最大10000
   * 积分:用户需要至少300积分才可以调取,具体请参阅积分获取办法
   */
  top_inst: {
    params: {},
    fields: ['trade_date', 'ts_code', 'exalter', 'buy', 'buy_rate', 'sell', 'sell_rate', 'net_buy', 'side', 'reason'],
  },
  /**
   * 股权质押统计数据
   * 接口:pledge_stat
   * 描述:获取股票质押统计数据
   * 限量:单次最大1000
   * 积分:用户需要至少500积分才可以调取,具体请参阅积分获取办法
   */
  pledge_stat: {
    params: {},
    fields: ['ts_code', 'end_date', 'pledge_count', 'unrest_pledge', 'rest_pledge', 'total_share', 'pledge_ratio'],
  },
  /**
   * 股权质押明细
   * 接口:pledge_detail
   * 描述:获取股票质押明细数据
   * 限量:单次最大1000
   * 积分:用户需要至少500积分才可以调取,具体请参阅积分获取办法
   */
  pledge_detail: {
    params: {},
    fields: [
      'ts_code',
      'ann_date',
      'holder_name',
      'pledge_amount',
      'start_date',
      'end_date',
      'is_release',
      'release_date',
      'pledgor',
      'holding_amount',
      'pledged_amount',
      'p_total_ratio',
      'h_total_ratio',
      'is_buyback',
    ],
  },
  /**
   * 股票回购
   * 接口:repurchase
   * 描述:获取上市公司回购股票数据
   * 积分:用户需要至少600积分才可以调取,具体请参阅积分获取办法
   */
  repurchase: {
    params: {},
    fields: ['ts_code', 'ann_date', 'end_date', 'proc', 'exp_date', 'vol', 'amount', 'high_limit', 'low_limit'],
  },
  /**
   * 概念股分类
   * 接口:concept
   * 描述:获取概念股分类,目前只有ts一个来源,未来将逐步增加来源
   * 积分:用户需要至少300积分才可以调取,具体请参阅积分获取办法
   */
  concept: {
    params: {},
    fields: ['code', 'name', 'src'],
  },
  /**
   * 概念股列表
   * 接口:concept_detail
   * 描述:获取概念股分类明细数据
   * 积分:用户需要至少300积分才可以调取,具体请参阅积分获取办法
   */
  concept_detail: {
    params: {},
    fields: ['id', 'concept_name', 'ts_code', 'name'],
  },
  /**
   * 限售股解禁
   * 接口:share_float
   * 描述:获取限售股解禁
   * 限量:单次最大5000条,总量不限制
   * 积分:120分可调取,每分钟内限制次数,超过5000积分频次相对较高,具体请参阅积分获取办法
   */
  share_float: {
    params: {},
    fields: ['ts_code', 'ann_date', 'float_date', 'float_share', 'float_ratio', 'holder_name', 'share_type'],
  },
  /**
   * 大宗交易
   * 接口:block_trade
   * 描述:大宗交易
   * 限量:单次最大1000条,总量不限制
   * 积分:300积分可调取,每分钟内限制次数,超过5000积分频次相对较高,具体请参阅积分获取办法
   */
  block_trade: {
    params: {},
    fields: ['ts_code', 'trade_date', 'price', 'vol', 'amount', 'buyer', 'seller'],
  },
  /**
   * 股东人数
   * 接口:stk_holdernumber
   * 描述:获取上市公司股东户数数据,数据不定期公布
   * 限量:单次最大3000,总量不限制
   * 积分:600积分可调取,基础积分每分钟调取100次,5000积分以上频次相对较高。具体请参阅积分获取办法
   */
  stk_holdernumber: {
    params: {},
    fields: ['ts_code', 'ann_date', 'end_date', 'holder_num'],
  },
  /**
   * 股东增减持
   * 接口:stk_holdertrade
   * 描述:获取上市公司增减持数据,了解重要股东近期及历史上的股份增减变化
   * 限量:单次最大提取3000行记录,总量不限制
   * 积分:用户需要至少2000积分才可以调取。基础积分有流量控制,积分越多权限越大,5000积分以上无明显限制,请自行提高积分,具体请参阅积分获取办法
   */
  stk_holdertrade: {
    params: {
      // ts_code: '',
      // ann_date: '',
      // start_date: '',
      // end_date: '',
      // trade_type: '',
      // holder_type: '',
      // limit: '',
      // offset: '',
    },
    fields: [
      'ts_code',
      'ann_date',
      'holder_name',
      'holder_type',
      'in_de',
      'change_vol',
      'change_ratio',
      'after_share',
      'after_ratio',
      'avg_price',
      'total_share',
    ],
  },
  /**
   * 接口：broker_recommend
   * 描述：每月初获取券商月度金股
   * 限量：单次最大1000行数据，可循环提取
   * 积分：积分达到2000即可调用，具体请参阅积分获取办法
   */
  broker_recommend: {
    params: {},
    fields: ['month', 'broker', 'ts_code', 'name'],
  },
  /**
   * 指数基本信息
   * 接口:index_basic,可以通过数据工具调试和查看数据。
   * 描述:获取指数基础信息。
   */
  index_basic: {
    params: {
      // ts_code: '',
      // market: '',
      // publisher: '',
      // category: '',
      // name: '',
      // limit: '',
      // offset: '',
    },
    fields: ['ts_code', 'name', 'market', 'publisher', 'category', 'base_date', 'base_point', 'list_date'],
  },
  /**
   * 指数日线行情
   * 接口:index_daily,可以通过数据工具调试和查看数据。
   * 描述:获取指数每日行情,还可以通过bar接口获取。由于服务器压力,目前规则是单次调取最多取8000行记录,可以设置start和end日期补全。指数行情也可以通过通用行情接口获取数据．
   * 权限:常规指数需累积200积分可低频调取,5000积分以上频次相对较高。本接口不包括申万行情数据,申万等行业指数行情请在QQ群联系群主,具体请参阅积分获取办法
   */
  index_daily: {
    params: {
      // ts_code: 's',
      // trade_date: '',
      // start_date: '',
      // end_date: '',
      // limit: '',
      // offset: '',
    },
    fields: ['ts_code', 'trade_date', 'close', 'open', 'high', 'low', 'pre_close', 'change', 'pct_chg', 'vol'],
  },
  /**
   * 指数周线行情
   * 接口:index_weekly
   * 描述:获取指数周线行情
   * 限量:单次最大1000行记录,可分批获取,总量不限制
   * 积分:用户需要至少600积分才可以调取,积分越多频次越高,具体请参阅积分获取办法
   */
  index_weekly: {
    params: {},
    fields: [
      'ts_code',
      'trade_date',
      'close',
      'open',
      'high',
      'low',
      'pre_close',
      'change',
      'pct_chg',
      'vol',
      'amount',
    ],
  },
  /**
   * 指数月线行情
   * 接口:index_monthly
   * 描述:获取指数月线行情,每月更新一次
   * 限量:单次最大1000行记录,可多次获取,总量不限制
   * 积分:用户需要至少600积分才可以调取,积分越多频次越高,具体请参阅积分获取办法
   */
  index_monthly: {
    params: {},
    fields: [
      'ts_code',
      'trade_date',
      'close',
      'open',
      'high',
      'low',
      'pre_close',
      'change',
      'pct_chg',
      'vol',
      'amount',
    ],
  },
  /**
   * 指数成分和权重
   * 接口:index_weight
   * 描述:获取各类指数成分和权重,月度数据 。
   * 来源:指数公司网站公开数据
   * 积分:用户需要至少400积分才可以调取,具体请参阅积分获取办法
   */
  index_weight: {
    params: {},
    fields: ['index_code', 'con_code', 'trade_date', 'weight'],
  },
  /**
   * 大盘指数每日指标
   * 接口:index_dailybasic,可以通过数据工具调试和查看数据。
   * 描述:目前只提供上证综指,深证成指,上证50,中证500,中小板指,创业板指的每日指标数据
   * 数据来源:Tushare社区统计计算
   * 数据历史:从2004年1月开始提供
   * 数据权限:用户需要至少400积分才可以调取,具体请参阅积分获取办法
   */
  index_dailybasic: {
    params: {},
    fields: [
      'ts_code',
      'trade_date',
      'total_mv',
      'float_mv',
      'total_share',
      'float_share',
      'free_share',
      'turnover_rate',
      'turnover_rate_f',
      'pe',
      'pe_ttm',
      'pb',
    ],
  },
  /**
   * 申万行业分类
   * 接口:index_classify
   * 描述:获取申万行业分类,包括申万28个一级分类,104个二级分类,227个三级分类的列表信息
   * 权限:用户需2000积分可以调取,具体请参阅积分获取办法
   */
  index_classify: {
    params: {},
    fields: ['index_code', 'industry_name', 'level', 'industry_code', 'is_pub', 'parent_code'],
  },
  /**
   * 申万行业成分构成
   * 接口:index_member
   * 描述:申万行业成分
   * 限量:单次最大2000行,总量不限制
   * 权限:用户需2000积分可调取,积分获取方法请参阅积分获取办法
   */
  index_member: {
    params: {},
    fields: ['index_code', 'con_code', 'in_date', 'out_date', 'is_new'],
  },
  /**
   * 市场交易统计
   * 接口:daily_info
   * 描述:获取交易所股票交易统计,包括各板块明细
   * 限量:单次最大4000,可循环获取,总量不限制
   * 权限:用户积600积分可调取, 频次有限制,积分越高每分钟调取频次越高,5000积分以上频次相对较高,积分获取方法请参阅积分获取办法
   */
  daily_info: {
    params: {},
    fields: [
      'trade_date',
      'ts_code',
      'ts_name',
      'com_count',
      'total_share',
      'float_share',
      'total_mv',
      'float_mv',
      'amount',
      'vol',
      'trans_count',
      'pe',
      'tr',
      'exchange',
    ],
  },
  /**
   * 深圳市场每日交易概况
   * 接口:sz_daily_info
   * 描述:获取深圳市场每日交易概况
   * 限量:单次最大2000,可循环获取,总量不限制
   * 权限:用户积2000积分可调取, 频次有限制,积分越高每分钟调取频次越高,5000积分以上频次相对较高,积分获取方法请参阅积分获取办法
   */
  sz_daily_info: {
    params: {},
    fields: ['trade_date', 'ts_code', 'count', 'amount', 'vol', 'total_share', 'total_mv', 'float_share', 'float_mv'],
  },
  /**
   * 同花顺概念和行业指数
   * 接口:ths_index
   * 描述:获取同花顺板块指数。注:数据版权归属同花顺,如做商业用途,请主动联系同花顺,如需帮助请联系微信migedata 。
   * 限量:本接口需获得600积分,单次最大5000,一次可提取全部数据,请勿循环提取。
   */
  ths_index: {
    params: {},
    fields: ['ts_code', 'name', 'count', 'exchange', 'list_date', 'type'],
  },
  /**
   * 同花顺板块指数行情
   * 接口:ths_daily
   * 描述:获取同花顺板块指数行情。注:数据版权归属同花顺,如做商业用途,请主动联系同花顺,如需帮助请联系微信migedata 。
   * 限量:单次最大3000行数据,可根据指数代码、日期参数循环提取。
   */
  ths_daily: {
    params: {},
    fields: [
      'ts_code',
      'trade_date',
      'close',
      'open',
      'high',
      'low',
      'pre_close',
      'avg_price',
      'change',
      'pct_change',
      'vol',
      'turnover_rate',
    ],
  },
  /**
   * 同花顺概念板块成分
   * 接口:ths_member
   * 描述:获取同花顺概念板块成分列表注:数据版权归属同花顺,如做商业用途,请主动联系同花顺。
   * 限量:用户积累5000积分可调取,可按概念板块代码循环提取所有成分
   */
  ths_member: {
    params: {},
    fields: ['ts_code', 'code', 'name'],
  },
  /**
   * 国际指数
   * 接口:index_global,可以通过数据工具调试和查看数据。
   * 描述:获取国际主要指数日线行情
   * 限量:单次最大提取4000行情数据,可循环获取,总量不限制
   * 积分:用户积6000积分可调取,积分越高频次越高,请自行提高积分,具体请参阅积分获取办法
   */
  index_global: {
    params: {},
    fields: ['ts_code', 'trade_date', 'open', 'close', 'high', 'low', 'pre_close', 'change', 'pct_chg', 'swing', 'vol'],
  },
  /**
   * 公募基金列表
   * 接口:fund_basic,可以通过数据工具调试和查看数据。
   * 描述:获取公募基金数据列表,包括场内和场外基金
   * 积分:用户需要2000积分才可以调取,单次最大可以提取15000条数据,5000积分以上权限更高,具体请参阅积分获取办法
   */
  fund_basic: {
    params: {
      // ts_code: '',
      // market: '',
      // update_flag: '',
      // offset: '',
      // limit: '',
      // status: '',
      // name: '',
    },
    fields: [
      'ts_code',
      'name',
      'management',
      'custodian',
      'fund_type',
      'found_date',
      'due_date',
      'list_date',
      'issue_date',
      'delist_date',
      'issue_amount',
      'm_fee',
      'c_fee',
      'duration_year',
      'p_value',
      'min_amount',
      'exp_return',
      'benchmark',
      'status',
      'invest_type',
      'type',
      'trustee',
      'purc_startdate',
      'redm_startdate',
      'market',
    ],
  },
  /**
   * 公募基金公司
   * 接口:fund_company
   * 描述:获取公募基金管理人列表
   * 积分:用户需要1500积分才可以调取,一次可以提取全部数据。具体请参阅积分获取办法
   */
  fund_company: {
    params: {},
    fields: [
      'name',
      'shortname',
      'province',
      'city',
      'address',
      'phone',
      'office',
      'website',
      'chairman',
      'manager',
      'reg_capital',
      'setup_date',
      'end_date',
      'employees',
      'main_business',
      'org_code',
      'credit_code',
    ],
  },
  /**
   * 基金经理
   * 接口:fund_manager
   * 描述:获取公募基金经理数据,包括基金经理简历等数据
   * 限量:单次最大5000,支持分页提取数据
   * 积分:用户有500积分可获取数据,2000积分以上可以提高访问频次
   */
  fund_manager: {
    params: {},
    fields: [
      'ts_code',
      'ann_date',
      'name',
      'gender',
      'birth_year',
      'edu',
      'nationality',
      'begin_date',
      'end_date',
      'resume',
    ],
  },
  /**
   * 基金规模数据
   * 接口:fund_share,可以通过数据工具调试和查看数据。
   * 描述:获取基金规模数据,包含上海和深圳ETF基金
   * 限量:单次最大提取2000行数据
   * 积分:用户需要至少2000积分可以调取,5000积分以上正常调取无频次限制,具体请参阅积分获取办法
   */
  fund_share: {
    params: {},
    fields: ['ts_code', 'trade_date', 'fd_share', 'fund_type', 'market'],
  },
  /**
   * 公募基金净值
   * 接口:fund_nav,可以通过数据工具调试和查看数据。
   * 描述:获取公募基金净值数据
   * 积分:用户需要至少2000积分才可以调取,具体请参阅积分获取办法
   */
  fund_nav: {
    params: {},
    fields: [
      'ts_code',
      'ann_date',
      'nav_date',
      'unit_nav',
      'accum_nav',
      'accum_div',
      'net_asset',
      'total_netasset',
      'adj_nav',
      'update_flag',
    ],
  },
  /**
   * 公募基金分红
   * 接口:fund_div
   * 描述:获取公募基金分红数据
   * 积分:用户需要至少400积分才可以调取,具体请参阅积分获取办法
   */
  fund_div: {
    params: {},
    fields: [
      'ts_code',
      'ann_date',
      'imp_anndate',
      'base_date',
      'div_proc',
      'record_date',
      'ex_date',
      'pay_date',
      'earpay_date',
      'net_ex_date',
      'div_cash',
      'base_unit',
      'ear_distr',
      'ear_amount',
      'account_date',
      'base_year',
    ],
  },
  /**
   * 公募基金持仓数据
   * 接口:fund_portfolio
   * 描述:获取公募基金持仓数据,季度更新
   * 积分:用户需要至少2000积分才可以调取,5000积分以上频次会比较高,具体请参阅积分获取办法
   */
  fund_portfolio: {
    params: {},
    fields: ['ts_code', 'ann_date', 'end_date', 'symbol', 'mkv', 'amount', 'stk_mkv_ratio', 'stk_float_ratio'],
  },
  /**
   * 场内基金日线行情
   * 接口:fund_daily
   * 描述:获取场内基金日线行情,类似股票日行情
   * 更新:每日收盘后2小时内
   * 限量:单次最大800行记录,总量不限制
   * 积分:用户需要至少500积分才可以调取,具体请参阅积分获取办法
   * 复权行情实现参考:
   * 后复权 = 当日最新价 × 当日复权因子
   * 前复权 = 当日复权价 ÷ 最新复权因子
   */
  fund_daily: {
    params: {},
    fields: [
      'ts_code',
      'trade_date',
      'pre_close',
      'open',
      'high',
      'low',
      'close',
      'change',
      'pct_chg',
      'vol',
      'amount',
    ],
  },
  /**
   * 基金复权因子
   * 接口:fund_adj
   * 描述:获取基金复权因子,用于计算基金复权行情
   * 限量:单次最大提取2000行记录,可循环提取,数据总量不限制
   * 积分:用户积600积分可调取,超过5000积分以上频次相对较高。具体请参阅积分获取办法
   * 复权行情实现参考:
   * 后复权 = 当日最新价 × 当日复权因子
   * 前复权 = 当日复权价 ÷ 最新复权因子
   */
  fund_adj: {
    params: {},
    fields: ['ts_code', 'trade_date', 'adj_factor'],
  },
  /**
   * 接口：coin_bar
   * 描述：获取数字货币数据，包括1分钟、5分、15、30、60分钟、日线等K线数据
   * 限量：单次最大8000条数据
   * 权限：120具备每分钟2次试用，开通正式权限请参考以下方式。
   */
  coin_bar: {
    params: {
      ts_code: '',
      symbol: '',
      exchange: '',
      freq: '',
      start_date: '',
      end_date: '',
      is_contract: '',
      limit: '',
      offset: '',
    },
    fields: [
      'exchange',
      'ts_code',
      'symbol',
      'freq',
      'trade_time',
      'open',
      'close',
      'high',
      'low',
      'vol',
      'is_contract',
    ],
  },
  /**
   * 接口：fut_daily，可以通过数据工具调试和查看数据。
   * 描述：期货日线行情数据
   * 限量：单次最大2000条，总量不限制
   * 积分：用户需要至少2000积分才可以调取，未来可能调整积分，请尽量多的积累积分。具体请参阅积分获取办法
   */
  fut_daily: {
    params: {
      trade_date: '',
      ts_code: '',
      exchange: '',
      start_date: '',
      end_date: '',
      limit: '',
      offset: '',
    },
    fields: [
      'ts_code',
      'trade_date',
      'pre_close',
      'pre_settle',
      'open',
      'high',
      'low',
      'close',
      'settle',
      'change1',
      'change2',
      'vol',
      'amount',
      'oi',
      'oi_chg',
    ],
  },
  /**
   * 接口：opt_daily
   * 描述：获取期权日线行情
   * 限量：单次最大1000，总量不限制
   * 积分：用户需要至少2000积分才可以调取，但有流量控制，请自行提高积分，积分越多权限越大，具体请参阅积分获取办法
   */
  opt_daily: {
    params: {
      ts_code: '',
      trade_date: '',
      start_date: '',
      end_date: '',
      exchange: '',
      limit: '',
      offset: '',
    },
    fields: [
      'ts_code',
      'trade_date',
      'exchange',
      'pre_settle',
      'pre_close',
      'open',
      'high',
      'low',
      'close',
      'settle',
      'vol',
      'amount',
      'oi',
    ],
  },
  stk_mins: {
    params: {},
    fields: [],
  },
  // @TODO: 期货
  // @TODO: 期权
  // @TODO: 债券
  // @TODO: 外汇
  // @TODO: 港股
  // @TODO: 美股
  // @TODO: 宏观经济
  // @TODO: 另类数据
  // @TODO: 财富管理
};

export const globalIndexList = [
  { code: 'XIN9', name: '富时中国A50指数 (富时A50)' },
  { code: 'HSI', name: '恒生指数' },
  { code: 'DJI', name: '道琼斯工业指数' },
  { code: 'SPX', name: '标普500指数' },
  { code: 'IXIC', name: '纳斯达克指数' },
  { code: 'FTSE', name: '富时100指数' },
  { code: 'FCHI', name: '法国CAC40指数' },
  { code: 'GDAXI', name: '德国DAX指数' },
  { code: 'N225', name: '日经225指数' },
  { code: 'KS11', name: '韩国综合指数' },
  { code: 'AS51', name: '澳大利亚标普200指数' },
  { code: 'SENSEX', name: '印度孟买SENSEX指数' },
  { code: 'IBOVESPA', name: '巴西IBOVESPA指数' },
  { code: 'RTS', name: '俄罗斯RTS指数' },
  { code: 'TWII', name: '台湾加权指数' },
  { code: 'SPTSX', name: '加拿大S&P/TSX指数' },
];
export const indexMarketList = [
  // {code: "MSCI", name: "MSCI指数"},
  { code: 'CSI', name: '中证指数' },
  { code: 'SSE', name: '上交所指数' },
  { code: 'SZSE', name: '深交所指数' },
  // {code: "CICC", name: "中金指数"},
  // {code: "SW", name: "申万指数"},
  // {code: "OTH", name: "其他指数"},
];
export const exchangeList = [
  { code: 'SSE', name: '上交所' },
  { code: 'SZSE', name: '深交所' },

  // { code: "CFFEX", name: "中金所" },
  // { code: "SHFE", name: "上期所" },
  // { code: "CZCE", name: "郑商所" },
  // { code: "DCE", name: "大商所" },
  // { code: "INE", name: "上能源" },
  // { code: "IB", name: "银行间" },
  // { code: "XHKG", name: "港交所" },
];
