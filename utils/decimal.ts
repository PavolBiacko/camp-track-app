import { Decimal } from 'decimal.js';

export const multiplyDecimals = (value1: number, value2: number): number => {
  const decimalValue1 = new Decimal(value1);
  const decimalValue2 = new Decimal(value2);

  const result = decimalValue1.times(decimalValue2);
  return result.toNumber();
};

export const addDecimals = (value1: number, value2: number): number => {
  const decimalValue1 = new Decimal(value1);
  const decimalValue2 = new Decimal(value2);

  const result = decimalValue1.add(decimalValue2);
  return result.toNumber();
};