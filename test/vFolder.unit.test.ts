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

test('adding and removing folder to a folder', () => {
  const folder1 = vFolder('f1');
  const folder2 = vFolder('f2');
  folder1.insert(folder2);
  expect(folder2.getFullPath()).toEqual('~/f1/f2');
});

test('events contentHasChanged, nodeAdded, nodeAdded', () => {
  const folder1 = vFolder('f1');
  const folder2 = vFolder('f2');
  const contetHasChangedHandler = jest.fn();
  const nodeAddedHandler = jest.fn();
  const nodeRemovedHandler = jest.fn();

  folder1.on('contentHasChanged', contetHasChangedHandler);
  folder1.on('nodeAdded', nodeAddedHandler);
  folder1.on('nodeRemoved', nodeRemovedHandler);
  folder1.insert(folder2);
  expect(contetHasChangedHandler).toBeCalledTimes(1);
  expect(nodeAddedHandler).toBeCalledTimes(1);
  expect(nodeRemovedHandler).toBeCalledTimes(0);
  folder1.deleteObj(folder2);
  expect(contetHasChangedHandler).toBeCalledTimes(2);
  expect(nodeAddedHandler).toBeCalledTimes(1);
  expect(nodeRemovedHandler).toBeCalledTimes(1);
  folder1.off('contentHasChanged', contetHasChangedHandler);
  folder1.off('nodeAdded', nodeAddedHandler);
  folder1.off('nodeRemoved', nodeRemovedHandler);
  folder1.insert(folder2);
  expect(contetHasChangedHandler).toBeCalledTimes(2);
  expect(nodeAddedHandler).toBeCalledTimes(1);
  expect(nodeRemovedHandler).toBeCalledTimes(1);
  folder1.deleteObj(folder2);
  expect(contetHasChangedHandler).toBeCalledTimes(2);
  expect(nodeAddedHandler).toBeCalledTimes(1);
  expect(nodeRemovedHandler).toBeCalledTimes(1);

  folder1.addListener('contentHasChanged', contetHasChangedHandler);
  folder1.addListener('nodeAdded', nodeAddedHandler);
  folder1.addListener('nodeRemoved', nodeRemovedHandler);
  folder1.insert(folder2);
  expect(contetHasChangedHandler).toBeCalledTimes(3);
  expect(nodeAddedHandler).toBeCalledTimes(2);
  expect(nodeRemovedHandler).toBeCalledTimes(1);
  folder1.deleteObj(folder2);
  expect(contetHasChangedHandler).toBeCalledTimes(4);
  expect(nodeAddedHandler).toBeCalledTimes(2);
  expect(nodeRemovedHandler).toBeCalledTimes(2);
  folder1.removeListener('contentHasChanged', contetHasChangedHandler);
  folder1.removeListener('nodeAdded', nodeAddedHandler);
  folder1.removeListener('nodeRemoved', nodeRemovedHandler);
  folder1.insert(folder2);
  expect(contetHasChangedHandler).toBeCalledTimes(4);
  expect(nodeAddedHandler).toBeCalledTimes(2);
  expect(nodeRemovedHandler).toBeCalledTimes(2);
  folder1.deleteObj(folder2);
  expect(contetHasChangedHandler).toBeCalledTimes(4);
  expect(nodeAddedHandler).toBeCalledTimes(2);
  expect(nodeRemovedHandler).toBeCalledTimes(2);
});
