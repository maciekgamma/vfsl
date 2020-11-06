import { vFile, vFolder } from '../src';

test('folder creating and movign in', () => {
  const file1 = vFile('file.txt');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  let nodes = folder1.getAllNodes();
  nodes = Array.from(nodes);
  expect(nodes[0].name).toEqual('file.txt');
});

test('full path', () => {
  const folder1 = vFolder('somefolder');
  expect(folder1.getFullPath()).toEqual('~/somefolder');
});

test('file in folder to get a full path', () => {
  const file1 = vFile('file.txt');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  let nodes = folder1.getAllNodes();
  nodes = Array.from(nodes);
  expect(nodes[0].getFullPath()).toEqual('~/somefolder/file.txt');
});
