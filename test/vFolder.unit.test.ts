import { vFolder } from '../src';

test('naming folders', () => {
  const folder1 = vFolder('somename');

  expect(folder1.name).toEqual('somename');
});

test('structuring folders', () => {
  const folder1 = vFolder('f1');
  const folder2 = vFolder('f2');
  folder1.insert(folder2);
  expect(folder2.getFullPath()).toEqual('~/f1/f2');
});
