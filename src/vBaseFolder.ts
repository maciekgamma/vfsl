import { vNode, vFile, vFolder } from './index';
import { vHomeFolder } from './vHomeFolder';

export interface vBaseFolder {
  name: string;
  getAllNodes: () => Set<vFolder | vFile>;
  insertNode: (node: vNode) => void;
  insert: (obj: vFile | vFolder) => void;
  deleteObj: (obj: vFile | vFolder) => void;
  setParent: (obj: vFolder | vHomeFolder) => void;
}

export const vBaseFolder = (parent: vFolder | vHomeFolder) => {
  const nodes: Set<vFolder | vFile> = new Set();

  const getAllNodes = () => {
    return nodes;
  };

  const insert = (obj: vFolder | vFile) => {
    obj.setParent(parent);
    nodes.add(obj);
  };

  const deleteObj = (obj: vFile | vFolder) => {
    console.log(nodes.has(obj));
  };

  const setParent = (obj: vFolder | vHomeFolder) => {
    parent = obj;
  };

  let inf: any = {
    name,
    getAllNodes,
    insert,
    deleteObj,
    setParent,
  };

  return inf;
};
