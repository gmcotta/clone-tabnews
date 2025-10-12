const { somar } = require("../models/calculadora");

test("espero que 1 seja 1", () => {
  expect(1).toBe(1);
});

test('espero que ao somar 1 com 1, retorne 2', () => {
  const resultado = somar(1, 1);
  expect(resultado).toBe(2);
});

test('espero que ao somar 5 com 100, retorne 105', () => {
  const resultado = somar(5, 100);
  expect(resultado).toBe(105);
});

test('espero que ao somar "banana" com 100, retorne "Erro"', () => {
  const resultado = somar('banana', 100);
  expect(resultado).toBe('Erro');
});

test('espero que ao somar 100 com "abacaxi", retorne "Erro"', () => {
  const resultado = somar(100, 'abacaxi');
  expect(resultado).toBe('Erro');
});
