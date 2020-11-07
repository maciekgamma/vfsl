import { vHomeFolder, vFolder } from './index';

export interface vFile {
  name: string;
  getFullPath: () => string;
  setParent: (newParent: vFolder | vHomeFolder) => void;
  deleteIt: () => void;
}

export const vFile = (
  name: string,
  parent: vFolder | vHomeFolder = vHomeFolder()
) => {
  const getFullPath = () => {
    return parent.getFullPath() + '/' + name;
  };

  const setParent = (newParent: vFolder | vHomeFolder) => {
    if (newParent == parent) return; // Avoid infitie loop
    parent.deleteObj?.(inf);
    parent = newParent;
    parent.insert(inf);
  };

  const deleteIt = () => {
    mustHaveParrent();
    parent.deleteObj(inf);
    parent = vHomeFolder();
  };

  const mustHaveParrent = () => {
    // console.log(vHomeFolder());
    if (parent == vHomeFolder()) {
    }
  };

  const inf: any = {
    name,
    setParent,
    getFullPath,
    deleteIt,
  };
  return inf;
};
