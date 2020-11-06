import { vFile, vFolder } from '../src';

test('folder creating and movign in', () => {
  const file1 = vFile('cos');
  const folder1 = vFolder('somefolder');
  folder1.insert(file1);
  let nodes = folder1.getAllNodes();
  expect(nodes[0].obj.name).toEqual('cos');
});

test('full path', () => {
  const folder1 = vFolder('somefolder');
  expect(folder1.node.getFullPath()).toEqual('~/somefolder');
});
