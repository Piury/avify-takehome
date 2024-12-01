import { valueFormatter } from './Utilities';
import { expect } from '@jest/globals';

test('valueFormatter formatea correctamente un valor', () => {
  expect(valueFormatter({ value: 10 })).toBe('10%');
});

test('valueFormatter maneja valores negativos', () => {
  expect(valueFormatter({ value: -5 })).toBe('-5%');
});

test('valueFormatter devuelve 0% para valores nulos o indefinidos', () => {
  expect(valueFormatter(null)).toBe('0%');
  expect(valueFormatter(undefined)).toBe('0%');
});