import { Series, DataFrame } from 'danfojs-node';

/**
 * EMA = array[i] * K + EMA(previous) * (1 – K)
 * @param data
 * @param n
 * @returns {number[]}
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
 * 计算移动平均线指标, ma的周期为days
 * @param data
 * @param n
 * @returns
 */
export const MA = (data: number[], n: number) => {
  if (n <= 1) {
    return data;
  }
  const ma = [];
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < n - 1) {
      ma.push(NaN);
      continue;
    }
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += +data[i - j];
    }
    ma.push(parseFloat((sum / n).toFixed(2)));
  }
  return ma;
};
