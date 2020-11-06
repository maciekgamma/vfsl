import { vNode, vFile, vMasterNode } from './index';

export interface vFolder {
  name: string;
  getAllNodes: () => Array<vNode>;
  insertNode: (node: vNode) => void;
  insert: (obj: vFile | vFolder) => void;
  setNode: (node: vNode) => void;
  node: vNode;
}

export const vFolder = (
  name: string,
  parent: vNode | vMasterNode = vMasterNode()
) => {
  const nodes: Array<vNode> = [];

  const getAllNodes = () => {
    return nodes;
  };

  const insertNode = (node: vNode) => {
    nodes.push(node);
  };

  const insert = (obj: vFolder | vFile) => {
    insertNode(obj.node);
  };
  let inf: any = { name, getAllNodes, insert, insertNode };

  inf.node = vNode(inf, parent);
  return inf;
};
