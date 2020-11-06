import { vNode, vMasterNode } from './index';

export interface vFile {
  name: string;
  node: vNode;
  setNode: (node: vNode) => void;
}

export const vFile = (
  name: string,
  parent: vNode | vMasterNode = vMasterNode()
) => {
  const inf: any = {
    name,
  };

  inf.node = vNode(inf, parent);
  return inf;
};
