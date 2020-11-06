import { vNode, vFile, vHomeFolder } from './index';
import { vBaseFolder } from './vBaseFolder';

export interface vFolder {
  name: string;
  getAllNodes: () => Set<vNode>;
  insertNode: (node: vNode) => void;
  insert: (obj: vFile | vFolder) => void;
  getFullPath: () => string;
  deleteIt: () => void;
  deleteObj: (obj: vFile | vFolder) => void;
  setParent: (newParent: vFolder | vHomeFolder) => void;
}

export const vFolder = (
  name: string,
  parent: vFolder | vHomeFolder = vHomeFolder()
) => {
  let inf: any = {};
  const baseFolder = vBaseFolder(inf);

  const getFullPath = () => {
    return parent.getFullPath() + '/' + name;
  };

  const deleteIt = () => {
    parent.deleteObj(inf);
  };

  const setParent = (newParent: vFolder | vHomeFolder) => {
    parent = newParent;
  };

  inf = {
    name,
    getAllNodes: baseFolder.getAllNodes,
    insert: baseFolder.insert,
    getFullPath,
    setParent,
    deleteObj: baseFolder.deleteObj,
    deleteIt,
  };
  baseFolder.setParent(inf);
  return inf;
};
