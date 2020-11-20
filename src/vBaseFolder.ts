import { vFile, vFolder } from './index';
import { vHomeFolder } from './vHomeFolder';
import events from 'events';

export interface vBaseFolder {
  name: string;
  getAllNodes: () => Set<vFolder | vFile>;
  insert: (obj: vFile | vFolder) => void;
  deleteObj: (obj: vFile | vFolder) => void;
  setParent: (obj: vFolder | vHomeFolder) => void;
  totalFiles: () => number;
  totalFolders: () => number;
  getElementByName: (elementName: string) => vFile | vFolder | undefined;
  eventEmitter: events.EventEmitter;
}

const eventNames = {
  contentHasChanged: 'contentHasChanged',
  nodeAdded: 'nodeAdded',
  nodeRemoved: 'nodeRemoved',
};

export const vBaseFolder = (parent: vFolder | vHomeFolder) => {
  const nodes: Set<vFolder | vFile> = new Set();
  const objEventEmitter = new events.EventEmitter();

  const getAllNodes = () => {
    return nodes;
  };

  const insert = (obj: vFolder | vFile) => {
    obj.setParent(parent);

    if (!nodes.has(obj)) {
      nodes.add(obj);
      objEventEmitter.emit(eventNames.contentHasChanged);
      objEventEmitter.emit(eventNames.nodeAdded);
    }
  };

  const deleteObj = (obj: vFile | vFolder) => {
    nodes.delete(obj);
    objEventEmitter.emit(eventNames.contentHasChanged);
    objEventEmitter.emit(eventNames.nodeRemoved);
  };

  const setParent = (obj: vFolder | vHomeFolder) => {
    parent = obj;
  };

  const totalFiles = () => {
    let total = 0;
    for (const node of nodes) {
      if ('totalFiles' in node) {
        total += node.totalFiles();
      } else {
        total += 1;
      }
    }
    return total;
  };

  const getElementByName = (elementName: string) => {
    for (const tmpNode of nodes) {
      if (tmpNode.name === elementName) {
        return tmpNode;
      }
    }
    return undefined;
  };

  const totalFolders = () => {
    let total = 0;
    for (const node of nodes) {
      if ('totalFolders' in node) {
        total += 1;
      }
    }
    return total;
  };

  let inf: any = {
    getAllNodes,
    insert,
    deleteObj,
    setParent,
    totalFiles,
    totalFolders,
    getElementByName,
    eventEmitter: objEventEmitter,
  };

  return inf;
};
