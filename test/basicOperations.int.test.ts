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

test('add and remove file in folder', () => {
  const file1 = vFile('file.txt');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  file1.deleteIt();
  let nodes = folder1.getAllNodes();
  nodes = Array.from(nodes);
  expect(nodes).toEqual([]);
});

test('moving files using setParents', () => {
  const file1 = vFile('file.txt');
  const folder1 = vFolder('somefolder');
  const folder2 = vFolder('otherfolder');
  folder1.insert(file1);
  let nodes1 = folder1.getAllNodes();
  nodes1 = Array.from(nodes1);
  expect(nodes1.length).toEqual(1);
  expect(file1.getFullPath()).toEqual('~/somefolder/file.txt');
  file1.setParent(folder2);
  nodes1 = folder1.getAllNodes();
  nodes1 = Array.from(nodes1);
  expect(nodes1.length).toEqual(0);
  let nodes2 = folder2.getAllNodes();
  nodes2 = Array.from(nodes2);
  expect(nodes2.length).toEqual(1);
  expect(file1.getFullPath()).toEqual('~/otherfolder/file.txt');
});

test('removing empty folder', () => {
  const folder1 = vFolder('somefolder');
  const folder2 = vFolder('otherfolder');
  folder1.insert(folder2);
  let nodes = folder1.getAllNodes();
  nodes = Array.from(nodes);
  expect(nodes.length).toEqual(1);
  folder2.deleteIt();
  nodes = folder1.getAllNodes();
  nodes = Array.from(nodes);
  expect(nodes.length).toEqual(0);
});

test('removing file that is not in any folder', () => {
  const file1 = vFile('file.txt');
  file1.deleteIt();
  expect('xs').toEqual('xs');
});

test('toltal number of elements in folder', () => {
  const folder1 = vFolder('somefolder');
  const folder2 = vFolder('otherfolder');
  const file1 = vFile('file.txt');
  const file2 = vFile('file2.txt');
  folder1.insert(folder2);
  folder2.insert(file1);
  folder1.insert(file2);
  expect(folder1.totalFiles()).toEqual(2);
  expect(folder1.totalFolders()).toEqual(1);
});
