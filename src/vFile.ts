import { vNode, vHomeFolder, vFolder } from './index';

export interface vFile {
  name: string;
  node: vNode;
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
    parent = newParent;
  };

  const deleteIt = () => {
    parent.deleteObj(inf);
  };

  const inf: any = {
    name,
    setParent,
    getFullPath,
    deleteIt,
  };
  return inf;
};
