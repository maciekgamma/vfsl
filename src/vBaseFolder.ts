import { vFile, vFolder } from './index';
import { vHomeFolder } from './vHomeFolder';

export interface vBaseFolder {
  name: string;
  getAllNodes: () => Set<vFolder | vFile>;
  insert: (obj: vFile | vFolder) => void;
  deleteObj: (obj: vFile | vFolder) => void;
  setParent: (obj: vFolder | vHomeFolder) => void;
  totalFiles: () => number;
  totalFolders: () => number;
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
    nodes.delete(obj);
  };

  const setParent = (obj: vFolder | vHomeFolder) => {
    parent = obj;
  };

  const totalFiles = () => {
    let total = 0;
    for (const node of nodes) {
      if ('totalFiles' in node) {
        total += node.totalFiles();
      } else {
        total += 1;
      }
    }
    return total;
  };

  const totalFolders = () => {
    let total = 0;
    for (const node of nodes) {
      if ('totalFolders' in node) {
        total += 1;
      }
    }
    return total;
  };

  let inf: any = {
    getAllNodes,
    insert,
    deleteObj,
    setParent,
    totalFiles,
    totalFolders,
  };

  return inf;
};
