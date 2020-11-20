import { vFile, vFolder, vHomeFolder } from '../src';

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

test('removing file from a folder', () => {
  const folder1 = vFolder('somefolder');
  const file1 = vFile('file.txt');
  folder1.insert(file1);
  expect(folder1.totalFiles()).toEqual(1);
  file1.deleteIt();
  expect(folder1.totalFiles()).toEqual(0);
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

test('get home folder', () => {
  const folder1 = vFolder('somefolder');
  const folder2 = vFolder('otherfolder');
  const file1 = vFile('file.txt');
  const file2 = vFile('file2.txt');
  folder1.insert(folder2);
  folder2.insert(file1);
  folder1.insert(file2);
  const homeFolder = folder1.getParent();
  expect(file1.getHomeFolder()).toEqual(homeFolder);
  expect(file2.getHomeFolder()).toEqual(homeFolder);
  expect(folder2.getHomeFolder()).toEqual(homeFolder);
});

test('get parent folder', () => {
  const folder1 = vFolder('somefolder');
  const folder2 = vFolder('otherfolder');
  const file1 = vFile('file.txt');
  const file2 = vFile('file2.txt');
  folder1.insert(folder2);
  folder2.insert(file1);
  folder1.insert(file2);
  expect(file1.getParent()).toEqual(folder2);
  expect(file2.getParent()).toEqual(folder1);
  expect(folder2.getParent()).toEqual(folder1);
});

test('get element by name', () => {
  const folder1 = vFolder('somefolder');
  const folder2 = vFolder('otherfolder');
  const file1 = vFile('file.txt');
  const file2 = vFile('file2.txt');
  folder1.insert(folder2);
  folder2.insert(file1);
  folder1.insert(file2);
  expect(folder1.getElementByName('file2.txt')).toEqual(file2);
  expect(folder1.getElementByName('otherfolder')).toEqual(folder2);
  expect(folder2.getElementByName('file.txt')).toEqual(file1);
});

test('events contentHasChanged, nodeAdded, nodeAdded', () => {
  const homeFolder = vHomeFolder();
  const folder1 = vFolder('somefolder');
  const file1 = vFile('file.txt');
  const contetHasChangedHandler = jest.fn();
  const nodeAddedHandler = jest.fn();
  const nodeRemovedHandler = jest.fn();

  homeFolder.on('contentHasChanged', contetHasChangedHandler);
  homeFolder.on('nodeAdded', nodeAddedHandler);
  homeFolder.on('nodeRemoved', nodeRemovedHandler);
  homeFolder.insert(folder1);
  homeFolder.insert(file1);
  expect(contetHasChangedHandler).toBeCalledTimes(2);
  expect(nodeAddedHandler).toBeCalledTimes(2);
  expect(nodeRemovedHandler).toBeCalledTimes(0);
  homeFolder.deleteObj(folder1);
  homeFolder.deleteObj(file1);
  expect(contetHasChangedHandler).toBeCalledTimes(4);
  expect(nodeAddedHandler).toBeCalledTimes(2);
  expect(nodeRemovedHandler).toBeCalledTimes(2);

  homeFolder.off('contentHasChanged', contetHasChangedHandler);
  homeFolder.off('nodeAdded', nodeAddedHandler);
  homeFolder.off('nodeRemoved', nodeRemovedHandler);
  homeFolder.insert(folder1);
  homeFolder.insert(file1);
  expect(contetHasChangedHandler).toBeCalledTimes(4);
  expect(nodeAddedHandler).toBeCalledTimes(2);
  expect(nodeRemovedHandler).toBeCalledTimes(2);
  homeFolder.deleteObj(folder1);
  homeFolder.deleteObj(file1);
  expect(contetHasChangedHandler).toBeCalledTimes(4);
  expect(nodeAddedHandler).toBeCalledTimes(2);
  expect(nodeRemovedHandler).toBeCalledTimes(2);

  homeFolder.addListener('contentHasChanged', contetHasChangedHandler);
  homeFolder.addListener('nodeAdded', nodeAddedHandler);
  homeFolder.addListener('nodeRemoved', nodeRemovedHandler);
  homeFolder.insert(folder1);
  homeFolder.insert(file1);
  expect(contetHasChangedHandler).toBeCalledTimes(6);
  expect(nodeAddedHandler).toBeCalledTimes(4);
  expect(nodeRemovedHandler).toBeCalledTimes(2);
  homeFolder.deleteObj(folder1);
  homeFolder.deleteObj(file1);
  expect(contetHasChangedHandler).toBeCalledTimes(8);
  expect(nodeAddedHandler).toBeCalledTimes(4);
  expect(nodeRemovedHandler).toBeCalledTimes(4);

  homeFolder.removeListener('contentHasChanged', contetHasChangedHandler);
  homeFolder.removeListener('nodeAdded', nodeAddedHandler);
  homeFolder.removeListener('nodeRemoved', nodeRemovedHandler);
  homeFolder.insert(folder1);
  homeFolder.insert(file1);
  expect(contetHasChangedHandler).toBeCalledTimes(8);
  expect(nodeAddedHandler).toBeCalledTimes(4);
  expect(nodeRemovedHandler).toBeCalledTimes(4);
  homeFolder.deleteObj(folder1);
  homeFolder.deleteObj(file1);
  expect(contetHasChangedHandler).toBeCalledTimes(8);
  expect(nodeAddedHandler).toBeCalledTimes(4);
  expect(nodeRemovedHandler).toBeCalledTimes(4);
});
