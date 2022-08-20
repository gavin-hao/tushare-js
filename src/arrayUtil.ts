function _op(operator: '+' | '-' | '*' | '/', first: number, second: number): number {
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return second ? first / second : NaN;
  }
  //return NaN
}
export function arrOp(array: number[], second: number | number[], operator: '+' | '-' | '*' | '/'): number[] {
  const result: number[] = [];
  if (typeof second === 'number') {
    return array.map((value) => _op(operator, value, second));
  } else {
    return array.map((v, i) => _op(operator, v, second[i]));
  }
}

export function sum(data: number[]) {
  return data.reduce((a, c) => a + c, 0);
}
/**
 * avg
 * @param arr
 * @returns
 */
export function avg(arr: number[]): number {
  return sum(arr) / arr.length;
}

/**
 * standard deviation
 * @param arr - Array<number>
 * @returns - number
 */
export function sd(arr: number[], usePopulation: boolean = false): number {
  const mean = avg(arr);
  const _sum = arr.reduce((a, c) => a + Math.pow(c - mean, 2), 0);
  const l = arr.length;
  return Math.sqrt(_sum / (usePopulation ? l : l - 1));
}

/**
 * absolute deviation
 * @param arr
 * @returns
 */
export function ad(arr: number[]): number {
  const _avg: number = avg(arr);
  const l = arr.length;
  const _sum: number = arr.reduce((a, c) => a + Math.abs(c - _avg), 0);
  return _sum / l;
}

/**
 * maximum of series and other
 * @param first
 * @param second
 * @returns
 */
export function max(first: number | number[], second: number | number[]): number | number[] {
  if (typeof first !== 'number') {
    //number[]
    if (typeof second !== 'number') {
      //number[]
      return first.map((v, i) => Math.max(v, second[i]));
    } else {
      return first.map((v) => Math.max(v, second));
    }
  } else {
    if (typeof second !== 'number') {
      //number[]
      return second.map((v) => Math.max(first, v));
    } else {
      return Math.max(first, second);
    }
  }
}
