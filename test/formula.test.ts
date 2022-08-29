import { Series, DataFrame } from 'danfojs-node';
import { MA } from '../src/formula';
describe('Formula testing', () => {
  it('ttt', () => {
    const json_data = [
      { A: 0.4612, B: 4.28283, C: -1.509, D: -1.1352 },
      { A: 0.5112, B: -0.22863, C: -3.39059, D: 1.1632 },
      { A: 0.6911, B: -0.82863, C: -1.5059, D: 2.1352 },
      { A: 0.4692, B: -1.28863, C: 4.5059, D: 4.1632 },
    ];
    let data: DataFrame = new DataFrame([]);
    const df = new DataFrame(json_data);
    // console.log(df['A'].values);
    data = df;
    df['C'] = (df['A'] as Series).map((x) => x * 2);
    const E = (df['A'] as Series).add(df['B']);
    // console.log(E);
    df.addColumn('E', E, { inplace: true });
    // df['E'].print();
    console.log(data.toJSON());
    // df.print();
    data.print();
    const aa = df.column('A').append(new Series([NaN]), [-1]);
    aa.resetIndex({ inplace: true });
    aa.print();
  });
  it('test ma', () => {
    const data1 = [1, 2, 3, 4, 5, 6, 7];
    const ma = MA(data1, 3);

    const data2 = [1, 1.5, 2, 3, 4, 5, 6]; //[NaN, NaN, 2, 3, 4, 5, 6];
    expect(ma).toStrictEqual(data2);
  });
});
