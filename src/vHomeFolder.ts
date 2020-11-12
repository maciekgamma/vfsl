import { vBaseFolder } from './vBaseFolder';
import { vFile } from './vFile';
import { vFolder } from './vFolder';

export interface vHomeFolder {
  name: string;
  getFullPath: () => string;
  deleteObj: (obj: vFile | vFolder) => void;
  insert: (obj: vFile | vFolder) => void;
  getAllNodes: () => Set<vFolder | vFile>;
  totalFiles: () => number;
  totalFolders: () => number;
  getHomeFolder: () => vHomeFolder;
  getElementByName: (elementName: string) => vFile | vFolder | undefined;
}

export const vHomeFolder = () => {
  let inf: any = {};
  const name = '~';
  const baseFolder = vBaseFolder(inf);

  const getFullPath = () => {
    return '~';
  };

  const getHomeFolder = () => {
    return inf;
  };

  inf = {
    deleteObj: baseFolder.deleteObj,
    getFullPath,
    name,
    getAllNodes: baseFolder.getAllNodes,
    insert: baseFolder.insert,
    totalFiles: baseFolder.totalFiles,
    totalFolders: baseFolder.totalFolders,
    getElementByName: baseFolder.getElementByName,
    getHomeFolder,
  };

  baseFolder.setParent(inf);
  return inf;
};
