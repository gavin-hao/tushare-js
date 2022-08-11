import { ResultData } from './interface';
/**
 *
 * @param data -原始数据
 * @returns Array<Object> -转换后的数组
 */
function formatData(data: ResultData): { [key: string]: any }[] {
  if (!data.fields || !data || !data.items || data.items.length == 0) return [];
  const { fields, items } = data;
  const result: { [key: string]: any }[] = items.reduce((pre, item) => {
    const current: { [key: string]: any } = fields.reduce((obj, attr, idx) => {
      return { ...obj, [attr]: item[idx] };
    }, {});
    return [...pre, current];
  }, []);

  return result;
}
export default formatData;
