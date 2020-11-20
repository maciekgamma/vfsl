import { vFile, vHomeFolder } from './index';
import { vBaseFolder } from './vBaseFolder';
import events from 'events';

export interface vFolder {
  name: string;
  getAllNodes: () => Set<vFolder | vFile>;
  insert: (obj: vFile | vFolder) => void;
  getFullPath: () => string;
  deleteIt: () => void;
  deleteObj: (obj: vFile | vFolder) => void;
  setParent: (newParent: vFolder | vHomeFolder) => void;
  totalFiles: () => number;
  totalFolders: () => number;
  getParent: () => vFolder | vHomeFolder;
  getHomeFolder: () => vHomeFolder;
  getElementByName: (elementName: string) => vFile | vFolder | undefined;
  on: (eventNam: string | symbol, listener: Function) => events.EventEmitter;
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

  const getParent = () => {
    return parent;
  };

  const getHomeFolder = () => {
    return parent.getHomeFolder();
  };

  inf = {
    name,
    getAllNodes: baseFolder.getAllNodes,
    insert: baseFolder.insert,
    getFullPath,
    setParent,
    deleteObj: baseFolder.deleteObj,
    totalFiles: baseFolder.totalFiles,
    totalFolders: baseFolder.totalFolders,
    getElementByName: baseFolder.getElementByName,
    deleteIt,
    getParent,
    getHomeFolder,
    on: (...args: any) => {
      baseFolder.eventEmitter.on(...args);
    },
  };
  //inf.on('contentHasChanged', () => console.log('aaa'));
  //baseFolder.eventEmitter.on('contentHasChanged', () => console.log('bbb'));
  baseFolder.setParent(inf);
  return inf;
};
