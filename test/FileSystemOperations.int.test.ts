import { vFile, vFolder, vFileSystem } from '../src';

test('get element from full path', () => {
  const fs = vFileSystem();
  const file1 = vFile('file1.txt');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  fs.homeFolder.insert(folder1);
  const element = fs.getElementFromPath('~/somefolder/file1.txt');
  expect(element?.name).toEqual('file1.txt');
});

test('get element from full path, folder', () => {
  const fs = vFileSystem();
  const file1 = vFile('file1.txt');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  fs.homeFolder.insert(folder1);
  const element = fs.getElementFromPath('~/somefolder/');
  expect(element?.name).toEqual('somefolder');
});

test('get element from full path, home folder', () => {
  const fs = vFileSystem();
  const file1 = vFile('file1.txt');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  fs.homeFolder.insert(folder1);
  const element = fs.getElementFromPath('~');
  expect(element?.name).toEqual('~');
});

test('get elements in current directory', () => {
  const fs = vFileSystem();
  const file1 = vFile('file1.txt');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  fs.homeFolder.insert(folder1);
  fs.goToDirectory('~/somefolder');
  const list = fs.listElementsInCurrentDirectory();
  expect(list).toEqual(folder1.getAllNodes().keys());
});

test('go to directory', () => {
  const fs = vFileSystem();
  const file1 = vFile('file1.txt');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  fs.homeFolder.insert(folder1);
  fs.goToDirectory('~/somefolder');
  expect(fs.getCurrentDirectory()).toEqual('~/somefolder');
});
