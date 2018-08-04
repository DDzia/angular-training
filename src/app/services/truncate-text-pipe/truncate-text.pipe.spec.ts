import { TruncateTextPipe } from './truncate-text.pipe';

describe('TruncateTextPipe', () => {
  const sut = new TruncateTextPipe();
  const maxWords = 2;

  it('dot not truncate not string-s', () => {
    // arrange
    const valueUndefined = undefined;
    const valueNumber = 1992;
    const valueNull = null;
    const valueObject = {};
    const valueFunction = () => {};
    const valueSymbol = Symbol('denis');
    const valueNan = NaN;

    // act
    const resultUndefined = sut.transform(valueUndefined, maxWords);
    const resultNumber = sut.transform(valueNumber, maxWords);
    const resultNull = sut.transform(valueNull, maxWords);
    const resultObject = sut.transform(valueObject, maxWords);
    const resultFunction = sut.transform(valueFunction, maxWords);
    const resultSymbol = sut.transform(valueSymbol, maxWords);
    const resultNan = sut.transform(valueNan, maxWords);

    // assert
    expect(resultUndefined).toBe(valueUndefined);
    expect(resultNumber).toBe(valueNumber);
    expect(resultNull).toBe(valueNull);
    expect(resultObject).toBe(valueObject as any);
    expect(resultFunction).toBe(valueFunction as any);
    expect(resultSymbol).toBe(valueSymbol as any);
    expect(resultNan).toEqual(valueNan);
  });

  describe('string truncating', () => {
    it('do not turuncate empty string', () => {
      // arrange
      const empty = '';

      // act
      const result = sut.transform(empty, maxWords);

      // assert
      expect(result).toBe(empty);
    });

    it('do not turuncate text of many worlds', () => {
      // arrange
      const twoWorlds = 'denis';

      // act
      const result = sut.transform(twoWorlds, maxWords);

      // assert
      expect(result).toBe(twoWorlds);
    });

    it('do turuncate text of three worlds', () => {
      // arrange
      const manyWords = 'denis the man is';

      // act
      const result: string = sut.transform(manyWords, maxWords);

      // assert
      expect(result.split(' ').length).toBe(maxWords + 1); // maxWords + '...'
      const reversedResult = result.split('').reverse().join('');
      expect(reversedResult.indexOf('...')).toBe(0);
    });
  });
});
