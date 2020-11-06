import { vFolder, vFile, vMasterNode } from './index';

export interface vNode {
  obj: vFolder | vFile;
  getFullPath: () => string;
}

export const vNode = (obj: vFolder | vFile, parent: vNode | vMasterNode) => {
  const getFullPath = () => {
    return parent.getFullPath() + '/' + obj.name;
  };
  const inf: vNode = { obj, getFullPath };
  return inf;
};
