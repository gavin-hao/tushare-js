import { arrOp, sum as _arraySum, sd } from './arrayUtil';

/**
 * sample standard deviation
 */
export const STD = (data: number[], n: number = 0) => {
  const result: number[] = [];
  for (let i = 0, s: number, l = data.length; i < l; i++) {
    s = i < n ? 0 : i - n + 1;
    result.push(sd(data.slice(s, i + 1)));
  }
  return result;
};

/**
 * N周期内X最低值
 * @param arr
 * @param n 滑动窗口
 * @returns
 */
export function LLV(arr: number[], n: number): number[] {
  const result: number[] = [];
  const min: number = Math.min(...arr);
  for (let i = 0, l = arr.length, s: number; i < l; i++) {
    if (n) {
      s = i < n ? 0 : i - n + 1;
      result.push(Math.min(...arr.slice(s, i + 1)));
    } else {
      result.push(min);
    }
  }
  return result;
}
/**
 * N周期内X最高值
 * @param arr
 * @param n
 * @returns
 */
export function HHV(arr: number[], n: number): number[] {
  const result: number[] = [];
  const max: number = Math.max(...arr);
  for (let i = 0, l = arr.length, s: number; i < l; i++) {
    if (n) {
      s = i < n ? 0 : i - n + 1;
      result.push(Math.max(...arr.slice(s, i + 1)));
    } else {
      result.push(max);
    }
  }
  return result;
}
/**
 * N周期内X总和
 * @param arr
 * @param n
 * @returns
 */
export function SUM(arr: number[], n: number): number[] {
  const result: number[] = [];
  if (n) {
    for (let i = 0, s: number, l = arr.length; i < l; i++) {
      s = i < n ? 0 : i - n + 1;
      result.push(_arraySum(arr.slice(s, i + 1)));
    }
  } else {
    let last = 0;
    for (let i = 0, l = arr.length; i < l; i++) {
      last += arr[i];
      result.push(last);
    }
  }
  return result;
}

/**
 * Exponential moving average
 * alpha = 2 / (N + 1)
 * EMA = array[i] * K + EMA(previous) * (1 – K)
 * @param data
 * @param n
 * @returns {number[]}
 *
 * @example
 * ```
 * const ema3=EMA([1,2,3,5,7],3)
 * ```
 */
export const EMA = (data: Array<number>, n: number) => {
  if (n <= 1) {
    return data;
  }
  const ema = [];
  const k = 2 / (n + 1);
  // first item is just the same as the first item in the input
  ema.push(data[0]);
  // for the rest of the items, they are computed with the previous one
  for (let i = 1; i < data.length; i++) {
    ema.push(data[i] * k + ema[i - 1] * (1 - k));
  }
  return ema;
};
/**
 * 算术移动平均线
 * Y=(M*X+(N-M)*Y')/N
 * @param data datas
 * @param n days
 * @param m weight
 * @returns
 */
export const SMA = (data: number[], n: number, m: number) => {
  const sma: number[] = [data[0]];
  for (let i = 1, len = data.length; i < len; i++) {
    sma.push((m * data[i] + (n - m) * sma[i - 1]) / n);
  }
  return sma;
};
/**
 * 计算移动平均线指标, ma的周期为days
 * MA=(P1+… +Pn)÷ n，其中Pn为每天价格，n为日数
 * @param data
 * @param n
 * @returns
 */
export const MA = (data: number[], n: number) => {
  if (n <= 1 || !data || data.length < 1) {
    return data;
  }
  const ma = [];
  let avg = data[0];
  ma.push(avg);
  for (let i = 1, len = data.length; i < len; i++) {
    if (i < n) {
      let sum = data[0];
      for (let j = 1; j <= i; j++) {
        sum += data[j];
      }
      avg = sum / (i + 1);
    } else {
      avg += (data[i] - data[i - n]) / n;
    }
    ma.push(avg);
  }
  return ma;
};

/**
 * MACD：参数快线移动平均、慢线移动平均、移动平均，
 * @param data - number[]
 * @param fast  12 - number
 * @param slow 26 - number
 * @param mid  9 - number
 * @returns { diff: number[]; dea: number[]; macd: number[] }
 */
export const MACD = (
  data: number[],
  fast: number = 12,
  slow: number = 26,
  mid: number = 9
): { diff: number[]; dea: number[]; macd: number[] } => {
  const len = data.length;
  const diff: number[] = [];
  const macd: number[] = [];
  let dea: number[] = [];
  if (len === 0) {
    return { diff, dea, macd };
  }
  const ema_f = EMA(data, fast);
  const ema_s = EMA(data, slow);
  for (let i = 0; i < len; i++) {
    diff.push(ema_f[i] - ema_s[i]);
  }

  dea = EMA(diff, mid);
  for (let i = 0; i < len; i++) {
    macd.push((diff[i] - dea[i]) * 2);
  }
  return { diff, dea, macd };
};
/**
 * KDJ指标计算方式
 * @description
 * * KDJ指标计算方式
 * 当日K值=2/3×前一日K值+1/3×当日RSV
 * 当日D值=2/3×前一日D值+1/3×当日K值
 * 若无前一日K 值与D值，则可分别用50来代替。
 * J值=3*当日K值-2*当日D值
 * ```
  RSV = (CLOSE - LLV(LOW, P1)) / (HHV(HIGH, P1) - LLV(LOW, P1)) * 100
  K = SMA(RSV, P2, 1)
  D = SMA(K, P3, 1)
  J = 3 * K - 2 * D
  ```
  * @returns {k:number[];d:number[];j:number[]}
 */
export const KDJ = (close: number[], high: number[], low: number[], p1: number = 9, p2: number = 3, p3: number = 3) => {
  // RSV = (CLOSE - LLV(LOW, P1)) / (HHV(HIGH, P1) - LLV(LOW, P1)) * 100:
  const rsv: number[] = arrOp(
    arrOp(arrOp(close, LLV(low, p1), '-'), arrOp(HHV(high, p1), LLV(low, p1), '-'), '/'),
    100,
    '*'
  );
  const k = SMA(rsv, p2, 1);
  const d = SMA(rsv, p3, 1);
  const j = arrOp(arrOp(k, 3, '*'), arrOp(d, 2, '*'), '-');
  return { k, d, j };
};
/**
 * 布林线
 * @param data 
 * @param n 
 * @param m TIMES [2]
 * @returns {*} {boll,upper,lower}
 * @description
 * ```
    MID  = MA(CLOSE, PERIOD)
    UPPER= MID + TIMES * STD(CLOSE, PERIOD)
    LOWER= MID - TIMES * STD(CLOSE, PERIOD)
 * ```
 */
export const BOLL = (data: number[], n: number, m: number = 2) => {
  const boll = MA(data, n);
  const std: number[] = arrOp(STD(data, n), m, '*');
  const upper: number[] = arrOp(boll, std, '+');
  const lower: number[] = arrOp(boll, std, '-');
  return { boll, upper, lower };
};
/**
 * 多空布林线
 * @param data 收盘价数组
 * @param n
 * @param m
 * @returns
 * @example
 * ```
    BBIBOLL = (MA(CLOSE, 3) + MA(CLOSE, 6) + MA(CLOSE, 12) + MA(CLOSE, 24)) / 4
    UPR = BBIBOLL + M * STD(BBIBOLL, N)
    DWN = BBIBOLL - M * STD(BBIBOLL, N)
 * ```
 */
export const BBIBOLL = (data: number[], n: number, m: number) => {
  // BBIBOLL:(MA(CLOSE,3)+MA(CLOSE,6)+MA(CLOSE,12)+MA(CLOSE,24))/4:
  const bbi: number[] = arrOp(
    arrOp(arrOp(arrOp(MA(data, 3), MA(data, 6), '+'), MA(data, 12), '+'), MA(data, 24), '+'),
    4,
    '/'
  );

  // UPR:BBIBOLL+M*STD(BBIBOLL,N):
  const upr: number[] = arrOp(bbi, arrOp(STD(bbi, n), m, '*'), '+');

  // DWN:BBIBOLL-M*STD(BBIBOLL,N):
  const dwn: number[] = arrOp(bbi, arrOp(STD(bbi, n), m, '*'), '-');
  return {
    bbiboll: bbi,
    upr,
    dwn,
  };
};
