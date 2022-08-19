export interface QueryResult {
  isSuccess: boolean;
  msg?: string;
  code?: number;
  data?: Record<string, any>[];
  hasMore?: boolean;
}
export type ResultData = {
  fields: string[];
  items: any[];
};
export interface QueryParam {
  api_name: string;
  params?: Record<string, any>;
  fields?: string[];
}

/**
 * asset 资产类别：E股票 I沪深指数 C数字货币 FT期货 FD基金 O期权，默认E
 */
export type AssetType = 'E' | 'I' | 'C' | 'FT' | 'FD' | 'O';
export interface ProBarQueryParam {
  /**
   * 证券代码
   */
  ts_code: string;
  /**
   * 开始日期 (格式：YYYYMMDD)
   */
  start_date?: string;
  /**
   * 结束日期 (格式：YYYYMMDD)
   */
  end_date?: string;
  /**
   * 数据频度 ：1MIN表示1分钟（1/5/15/30/60分钟） D日线 ，默认D
   * @example 支持1/5/15/30/60分钟,周/月/季/年
   */
  freq?: string;
  /**
   * 资产类别：E股票 I沪深指数 C数字货币 FT期货 FD基金 O期权，默认E
   * @default 'E'
   */
  asset?: AssetType;
  /**
   * 市场代码，用户数字货币行情
   */
  exchange?: string;
  /**
   * 复权类型(只针对股票)：undefined未复权 qfq前复权 hfq后复权 , 默认 undefined
   */
  adj?: 'qfq' | 'hfq';
  /**
   * 均线，支持任意周期的均价和均量，输入任意合理int数值,
   * @example 支持自定义均线频度 ma5/ma10/ma20/ma60/maN
   */
  ma?: number[];
  /**
   * factors因子数据，目前支持以下两种：
        vr:量比,默认不返回，返回需指定：factor=['vr']
        tor:换手率，默认不返回，返回需指定：factor=['tor']
                    以上两种都需要：factor=['vr', 'tor']
   */
  factors?: string[];
  contract_type?: string;
}
export interface IDataApi {
  // token: string;
  // setToken(token: string): void;
  query(param: QueryParam): Promise<QueryResult>;
  pro_bar(param: ProBarQueryParam): Promise<QueryResult>;
}
