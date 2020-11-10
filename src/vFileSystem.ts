import { vFolder } from './index';
import { vFile } from './vFile';
import { vHomeFolder } from './vHomeFolder';

export interface vFileSystem {
  homeFolder: vHomeFolder;
  getElementFromPath: () => vFile | vFolder;
  //goToDirectory: (newDirectory: string) => void;
  translateDirectory: (newDirectory: string) => string;
}

export const vFileSystem = () => {
  const homeFolder = vHomeFolder();

  const curentDirectory = '~';

  //const goToDirectory = (newDirectory: string) => {};

  //const getElementsInCurrentDirectory = () => {};

  const translateDirectory = (newDirectory: string) => {
    newDirectory.startsWith('~');
    if (!newDirectory.startsWith('~')) {
      newDirectory = curentDirectory + '/' + newDirectory;
    }
    return newDirectory;
  };
  //const validateDirectory = (newDirectory: string) => {};

  const getElementFromPath = (newDirectory: string) => {
    const newDirectoryAsArray = newDirectory.split('/');
    newDirectoryAsArray.shift(); // Home directory
    let tmpFolder: vHomeFolder | vFolder = homeFolder;
    let tmpElement;
    let tmpFolderName = newDirectoryAsArray.shift();
    do {
      if (!tmpFolderName) return undefined;
      tmpElement = tmpFolder.getElementByName(tmpFolderName);
      if (!tmpElement) return;
      if ('getElementByName' in tmpElement) {
        tmpFolder = tmpElement;
      }
      tmpFolderName = newDirectoryAsArray.shift();
    } while (tmpFolderName);
    return tmpElement;
  };

  const inf = { homeFolder, getElementFromPath, translateDirectory };
  return inf;
};
