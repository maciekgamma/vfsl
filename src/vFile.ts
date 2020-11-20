import { vHomeFolder, vFolder } from './index';

export interface vFile {
  name: string;
  extension: string;
  getFullPath: () => string;
  setParent: (newParent: vFolder | vHomeFolder) => void;
  deleteIt: () => void;
  getParent: () => vFolder | vHomeFolder;
  getHomeFolder: () => vHomeFolder;
}

export const vFile = (
  name: string,
  parent: vFolder | vHomeFolder = vHomeFolder()
) => {
  const getFullPath = () => {
    return parent.getFullPath() + '/' + name;
  };

  let extension = '';

  const setParent = (newParent: vFolder | vHomeFolder) => {
    if (newParent === parent) return; // Avoid infitie loop
    parent.deleteObj?.(inf);
    parent = newParent;
    parent.insert(inf);
  };

  const deleteIt = () => {
    parent.deleteObj(inf);
    parent = vHomeFolder();
  };

  const getParent = () => {
    return parent;
  };

  const getHomeFolder = () => {
    return parent.getHomeFolder();
  };

  const inf: any = {
    extension,
    name,
    setParent,
    getFullPath,
    deleteIt,
    getParent,
    getHomeFolder,
  };
  return inf;
};
