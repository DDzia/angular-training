import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipePipe', () => {
  const pipe = new OrderByPipe();

  it('should order numbers', () => {
    // arrange
    const rawData = [1, 5, 3];
    const expected = [1, 3, 5];

    // act
    const ordered = pipe.transform(rawData);

    expect(expected).toEqual(ordered);
  });


  it('should order strings', () => {
    // arrange
    const rawData = ['a', 'A', 'b'];
    const expected = ['A', 'a', 'b'];

    // act
    const ordered = pipe.transform(rawData);

    expect(expected).toEqual(ordered);
  });

  it('should order Dates', () => {
    // arrange
    const now = new Date();
    const oldYear = new Date(now.getFullYear() - 1);

    const rawData = [
      now,
      oldYear
    ];
    const expected = [oldYear, now];

    // act
    const ordered = pipe.transform(rawData);

    expect(expected).toEqual(ordered);
  });
});
