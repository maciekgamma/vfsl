import { vFolder } from './index';
import { vFile } from './vFile';
import { vHomeFolder } from './vHomeFolder';

export interface vFileSystem {
  homeFolder: vHomeFolder;
  getElementFromPath: () => vFile | vFolder;
  goToDirectory: (newDirectory: string) => boolean;
  translateDirectory: (newDirectory: string) => string;
  listElementsInCurrentDirectory: () => Array<vFile | vFolder>;
  getCurrentDirectory: () => string;
}

export const vFileSystem = () => {
  const homeFolder = vHomeFolder();

  let curentDirectory = '~';

  const goToDirectory = (newDirectory: string) => {
    newDirectory = translateDirectory(newDirectory);
    const tmpElement = getElementFromPath(newDirectory);
    if (!tmpElement) return false;
    if ('getElementByName' in tmpElement) {
      curentDirectory = newDirectory;
      return true; //succes
    }
    return false;
  };

  const listElementsInCurrentDirectory = () => {
    const tmpFolder = getElementFromPath(getCurrentDirectory());
    if (!tmpFolder) return undefined;
    if ('getAllNodes' in tmpFolder) {
      return tmpFolder.getAllNodes().keys();
    }
    return undefined;
  };

  const translateDirectory = (newDirectory: string) => {
    newDirectory.startsWith('~');
    if (!newDirectory.startsWith('~')) {
      newDirectory = curentDirectory + '/' + newDirectory;
    }
    return newDirectory;
  };

  const getElementFromPath = (newDirectory: string) => {
    const newDirectoryAsArray = newDirectory.split('/');
    let tmpElementName = newDirectoryAsArray.shift();
    let tmpFolder = homeFolder;
    if (!newDirectoryAsArray[0]) return homeFolder;
    while (newDirectoryAsArray) {
      tmpElementName = newDirectoryAsArray.shift();
      let tmpElement = tmpFolder.getElementByName(tmpElementName);
      if (!tmpElement) return;
      if (!newDirectoryAsArray[0]) return tmpElement;
      if ('getElementByName' in tmpElement) {
        tmpFolder = tmpElement;
      } else {
        return tmpElement;
      }
    }
  };

  const getCurrentDirectory = () => {
    return curentDirectory;
  };

  const inf = {
    homeFolder,
    getElementFromPath,
    translateDirectory,
    listElementsInCurrentDirectory,
    goToDirectory,
    getCurrentDirectory,
  };
  return inf;
};
