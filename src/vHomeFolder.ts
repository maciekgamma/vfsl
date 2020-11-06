import { vBaseFolder } from './vBaseFolder';
import { vFile } from './vFile';
import { vFolder } from './vFolder';

export interface vHomeFolder {
  getFullPath: () => string;
  deleteObj: (obj: vFile | vFolder) => void;
  insert: (obj: vFile | vFolder) => void;
  getAllNodes: () => Set<vFolder | vFile>;
}

export const vHomeFolder = () => {
  let inf: any = {};
  const baseFolder = vBaseFolder(inf);

  const getFullPath = () => {
    return '~';
  };

  inf = {
    deleteObj: baseFolder.deleteObj,
    getFullPath,
    getAllNodes: baseFolder.getAllNodes,
    insert: baseFolder.insert,
  };
  baseFolder.setParent(inf);
  return inf;
};
