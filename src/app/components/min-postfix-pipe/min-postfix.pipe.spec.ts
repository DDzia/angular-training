import { MinPostfixPipe } from './min-postfix.pipe';

describe('MinPostfixPipe', () => {
  const sut = new MinPostfixPipe();

  it('added "min" postfix to Number value', () => {
    // arrange
    const valueNum = 1992;
    const expectedResult = `${valueNum}min`;

    // act
    const result = sut.transform(valueNum);

    // assert
    expect(result).toBe(expectedResult);
  });

  it('DO not added postfix to not "NUMBER" type values', () => {
    // arrange
    const valueUndefined = undefined;
    const valueString = 'alex';
    const valueNull = null;
    const valueObject = {};
    const valueFunction = () => {};
    const valueSymbol = Symbol('denis');
    const valueNan = NaN;

    // act
    const resultUndefined = sut.transform(valueUndefined);
    const resultString = sut.transform(valueString);
    const resultNull = sut.transform(valueNull);
    const resultObject = sut.transform(valueObject);
    const resultFunction = sut.transform(valueFunction);
    const resultSymbol = sut.transform(valueSymbol);
    const resultNan = sut.transform(valueNan);

    // assert
    expect(resultUndefined).toBe(valueUndefined);
    expect(resultString).toBe(valueString);
    expect(resultNull).toBe(valueNull);
    expect(resultObject).toBe(valueObject as any);
    expect(resultFunction).toBe(valueFunction as any);
    expect(resultSymbol).toBe(valueSymbol as any);
    expect(resultNan).toEqual(valueNan);
  });
});
