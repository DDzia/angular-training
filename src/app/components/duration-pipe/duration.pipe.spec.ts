import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const sut = new DurationPipe();

  it('added "min" and "h" postfixes to Number value', () => {
    // arrange
    const valueNum = 80;
    const expectedResult = `${Math.floor(valueNum / 60)}h ${valueNum % 60}min`;

    // act
    const result = sut.transform(valueNum);

    // assert
    expect(result).toBe(expectedResult);
  });

  it('DO not added postfix to not "NUMBER" type values', () => {
    // arrange
    const valueUndefined = undefined;
    const valueString = 'alex';
    const valueObject = {};
    const valueFunction = () => {};
    const valueSymbol = Symbol('denis');
    const valueNan = NaN;

    // act
    const resultUndefined = sut.transform(valueUndefined);
    const resultNan = sut.transform(valueNan);

    // assert
    expect(resultUndefined).toBe(valueUndefined);
    expect(resultNan).toEqual(valueNan);
  });
});
