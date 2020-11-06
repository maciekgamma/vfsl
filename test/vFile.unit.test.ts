import { vFile } from '../src';

test('creating file and naming it', () => {
  const file1 = vFile('somename');

  expect(file1.name).toEqual('somename');
});
