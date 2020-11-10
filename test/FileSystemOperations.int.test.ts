import { vFile, vFolder, vFileSystem } from '../src';

test('get element from full path', () => {
  const fs = vFileSystem();
  const file1 = vFile('file1.txt');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  fs.homeFolder.insert(folder1);
  const elemet = fs.getElementFromPath('~/somefolder/file1.txt');
  expect(elemet?.name).toEqual('file1.txt');
});
